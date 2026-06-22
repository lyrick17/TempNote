import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NoteItem, noteItemTemp, StashedNoteItem } from '../model/note-item';
import { stripHtml } from '../../../utils/utils';
import { Notes } from '../model/notes';

@Injectable({
  providedIn: 'root',
})
export class StashNotes implements Notes {
  latestId = 0; // for tracking of the id per each note item
  // stash variables
  MAX_STASHED = 30;
  MAX_CHARACTER_LIMIT = 1500;
  private timeout?: ReturnType<typeof setTimeout>;

  toastr = inject(ToastrService);
  currentNoteRef = { ...noteItemTemp }; // for tracking the previous state of currentNote
  currentNote = signal<NoteItem>({ ...noteItemTemp });
  notes = signal<Record<number, NoteItem>>({});
  arrayNotes = computed(() => Object.values(this.notes()));
  currentNoteLength = computed(() => {
    return this.currentNote().text.length;
  });

  constructor() {
    this.initializeEffect();
    this.initializeNotes();
  }

  private initializeNotes() {
    let allStashedNotes: Record<number, NoteItem> = {};
    let latestId = this.latestId;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('stash:')) {
        const item = localStorage.getItem(key);
        try {
          const parsedItem: StashedNoteItem = JSON.parse(item ?? '');
          const id = Number(key.split('stash:')[1]);
          const text = stripHtml(parsedItem.content);
          const content = parsedItem.content;
          const title = parsedItem.title;
          const type = parsedItem.type;
          let note = { id, text, content, title, type };
          allStashedNotes[Number(id)] = note;
          if (id == 1) {
            if (!this.currentNote().id && (content || title)) {
              // set first stashed note as current note
              this.currentNote.update((n) => ({
                ...n,
                id,
                text,
                content,
                title,
                type,
              }));
            }
          }
          if (latestId < id) {
            latestId = id;
          }
        } catch (e) {
          console.error('Cannot retrieve stashed note: ', e);
        }
      }
    }
    this.notes.update((n) => ({
      ...allStashedNotes,
    }));
    this.latestId = latestId;
  }

  private initializeEffect() {
    effect(() => {
      const text = stripHtml(this.currentNote().content);
      const isValidContent =
        !!text ||
        this.currentNote().content.includes('</ol>') ||
        this.currentNote().content.includes('</ul>') ||
        this.currentNote().content.includes('<img src=');
      const content = isValidContent ? this.currentNote().content : '';
      const title = this.currentNote().title ?? '';
      const type = this.determineNoteType({ text, content, title });

      if (!this.currentNote().id && (content || title)) {
        // Current Note is newly created, and has content
        const newId = this.incrementAndReturnId();
        this.currentNote.update((n) => ({
          ...n,
          id: newId,
          text,
          content,
          title,
          type,
        }));
        this.updateNote(newId, text, content, title, type);
      } else if (this.currentNote().id) {
        // Note is being updated
        // Find the note then update its text, unless its empty, delete it instead
        if (content || title) {
          this.updateNote(this.currentNote().id!, text, content, title, type);
        } else if (
          (this.currentNoteRef.text && this.currentNoteRef.content) ||
          this.currentNoteRef.title
        ) {
          this.deleteNote(this.currentNote().id, true);
        }
      }
    });
  }

  incrementAndReturnId() {
    this.latestId++;
    return this.latestId;
  }

  determineNoteType({
    title,
    content,
    text,
  }: {
    title: string;
    content: string;
    text: string;
  }) {
    // Determine Note Type after getting the note contents;
    if (text.length > 0 && content.length > 0 && content.includes('img src')) {
      return 'combined';
    } else if (text.length > 0) {
      return 'text';
    } else if (content.length > 0 && content.includes('img src')) {
      return 'image';
    } else if (title) {
      return 'text';
    }
    return '';
  }

  updateNote(
    id: number,
    text: string,
    content: string,
    title: string,
    type: '' | 'combined' | 'text' | 'image',
  ) {
    let note = { id, text, content, title, type };
    if (note.text.length > this.MAX_CHARACTER_LIMIT) {
      return;
    }
    this.notes.update((n) => ({
      ...n,
      [id]: note,
    }));
    this.currentNoteRef = note;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.persistToLocalStorage(note);
    }, 500);
  }

  createNewNote(shouldNotify: boolean = true) {
    // Only limit to max stashed amount
    if (this.arrayNotes().length >= this.MAX_STASHED) {
      return;
    }

    // create note
    this.currentNote.set({ ...noteItemTemp });

    if (shouldNotify) {
      this.toastr.success('New Notepad created.');
    }
    this.currentNoteRef = { ...noteItemTemp };
  }

  deleteNote(itemId?: number | null, isAutomatic: boolean = false) {
    if (!itemId) {
      this.toastr.info('An error occured.');
      return;
    }

    // If the note to be deleted is current one, remove it
    if (this.currentNote().id == itemId) {
      this.createNewNote(false);
    }

    // remove the note from the map
    let newNotes = { ...this.notes() };
    delete newNotes[itemId];
    this.notes.update((n) => ({
      ...newNotes,
    }));
    // delete from localStorage
    localStorage.removeItem(`stash:${itemId}`);

    if (!isAutomatic) {
      this.toastr.info('Note deleted.');
    }
    // else {
    //   this.toastr.info('Note removed.');
    // }
  }

  hasNotes(): boolean {
    // stop the user on leaving the page immediately if they have entered ntoes
    let numOfNotes = Object.keys(this.notes()).length;
    return numOfNotes > 0;
  }

  private persistToLocalStorage(note: NoteItem) {
    localStorage.setItem(
      `stash:${note.id}`,
      JSON.stringify({
        id: note.id,
        title: note?.title ?? '',
        content: note.content,
        type: note.type,
      }),
    );
  }
}
