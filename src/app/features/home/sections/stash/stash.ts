import { Component, inject } from '@angular/core';
import { MainContent } from '../../components/main-content/main-content';
import { Sidebar } from '../../components/sidebar/sidebar';
import { StashNotes } from '../../services/stash-notes';

@Component({
  selector: 'app-stash',
  imports: [MainContent, Sidebar],
  templateUrl: './stash.html',
  styleUrl: './stash.css',
})
export class Stash {
  stashNotes = inject(StashNotes);
}
