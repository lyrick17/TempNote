import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { NoteItem, noteItemTemp } from './sidebar.model';
import { ToastrService } from 'ngx-toastr';
import { stripHtml } from '../../lib/shared/utils';

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
      const text = stripHtml(this.currentNote().content);
      const content = text ? this.currentNote().content : '';

      if (!this.currentNote().id && content) {
        // Current Note is newly created, and has content
        const newId = this.incrementAndReturnId();
        this.currentNote.update((n) => ({
          ...n,
          id: newId,
          text,
          content,
        }));
        this.updateNote(newId, text, content);
      } else if (this.currentNote().id) {
        // Note is being updated
        // Find the note then update its text, unless its empty, delete it instead
        if (text && content) {
          this.updateNote(this.currentNote().id!, text, content);
        } else if (this.currentNoteRef.text && this.currentNoteRef.content) {
          this.deleteNote({ id: this.currentNote().id, text, content }, true);
        }
      }
    });
  }

  incrementAndReturnId() {
    this.latestId++;
    return this.latestId;
  }

  updateNote(id: number, text: string, content: string) {
    this.notes.update((n) => ({
      ...n,
      [id]: { id, text, content },
    }));
    this.currentNoteRef = { id, text, content };
  }

  createNewNote(shouldNotify: boolean = true) {
    this.currentNote.set({ ...noteItemTemp });

    if (shouldNotify) {
      this.toastr.success('New Notepad created.');
    }
    this.currentNoteRef = { ...noteItemTemp };
  }

  deleteNote(item: NoteItem, isAutomatic: boolean = false) {
    if (!item.id) {
      this.toastr.info('An error occured.');
      return;
    }

    // If the note to be deleted is current one, remove it
    if (this.currentNote().id == item.id) {
      this.createNewNote(false);
    }

    // remove the note from the map
    let newNotes = { ...this.notes() };
    delete newNotes[item.id];
    this.notes.update((n) => ({
      ...newNotes,
    }));
    if (isAutomatic) {
      this.toastr.info('Note removed.');
    } else {
      this.toastr.info('Note deleted.');
    }
  }

  hasNotes(): boolean {
    // stop the user on leaving the page immediately if they have entered ntoes
    let numOfNotes = Object.keys(this.notes()).length;
    return numOfNotes > 0;
  }
}
