import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { NoteItem, noteItemTemp } from './sidebar.model';
import { ToastrService } from 'ngx-toastr';
import { stripHtml } from '../../../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  latestId = 0; // for tracking of the id per each note item

  toastr = inject(ToastrService);
  currentNoteRef = { ...noteItemTemp }; // for tracking the previous state of currentNote
  currentNote = signal<NoteItem>({ ...noteItemTemp });
  notes = signal<Record<number, NoteItem>>({});
  arrayNotes = computed(() => Object.values(this.notes()));
  constructor() {
    this.initializeEffect();
  }

  initializeEffect() {
    effect(() => {
      const text = stripHtml(this.currentNote().content).trim();
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
    this.notes.update((n) => ({
      ...n,
      [id]: { id, text, content, title, type },
    }));
    this.currentNoteRef = { id, text, content, title, type };
  }

  createNewNote(shouldNotify: boolean = true) {
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
}
