import { Component, inject, signal } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { CommonModule } from '@angular/common';
import { NoteItem } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css', '../../lib/shared/styles.css']
})
export class Sidebar {
  
  notes = inject(SidebarService);

  onClickNote(item: NoteItem) {
    console.log("tf");
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
    this.notes.deleteNote(item);
  }
}
