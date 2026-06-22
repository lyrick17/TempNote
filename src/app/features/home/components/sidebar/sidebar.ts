import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteItem } from '../../model/note-item';
import { Icons } from '../../../../shared/components/icons';
import { ScratchpadNotes } from '../../services/scratchpad-notes';
import { HomeTabState } from '../../services/home-tab-state';
import { StashNotes } from '../../services/stash-notes';
import { Notes } from '../../model/notes';

const EMPTY_LIST_TEXTS = {
  scratchpad: '🌟All Your Scratch Notes will be displayed here.🌟',
  stash: '📁All Your Stashed Notes will be stored and displayed here.📁',
};

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ...Icons],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  scratchpadNotes = inject(ScratchpadNotes);
  stashNotes = inject(StashNotes);
  homeTab = inject(HomeTabState);
  activeNotes = computed<Notes>(() =>
    this.homeTab.tabState() === 'scratchpad'
      ? this.scratchpadNotes
      : this.stashNotes,
  );
  emptyListText = computed(() =>
    this.homeTab.tabState() === 'scratchpad'
      ? EMPTY_LIST_TEXTS.scratchpad
      : EMPTY_LIST_TEXTS.stash,
  );

  onClickNote(item: NoteItem) {
    const id = item.id;
    if (!id) return;
    if (id == this.activeNotes().currentNote().id) {
      // Do not do anything if they are clicking the already selected note
      return;
    }
    this.activeNotes().currentNote.set(this.activeNotes().notes()[id]);
  }

  onDeleteNote(item: NoteItem, event: Event) {
    event.stopPropagation();
    this.activeNotes().deleteNote(item.id);
  }
}
