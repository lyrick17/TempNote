import { Component, inject } from '@angular/core';
import { MainContent } from '../../components/main-content/main-content';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ScratchpadNotes } from '../../services/scratchpad-notes';
import { NoteItem } from '../../model/note-item';

@Component({
  selector: 'app-scratchpad',
  imports: [MainContent, Sidebar],
  templateUrl: './scratchpad.html',
  styleUrl: './scratchpad.css',
})
export class Scratchpad {
  notes = inject(ScratchpadNotes);

  onClickNote(item: NoteItem) {
    const id = item.id;
    if (!id) return;
    if (id == this.notes.currentNote().id) {
      // Do not do anything if they are clicking the already selected note
      return;
    }
    this.notes.currentNote.set(this.notes.notes()[id]);
  }

  onDeleteNote(item: NoteItem, event: Event) {
    event.stopPropagation();
    this.notes.deleteNote(item.id);
  }
}
