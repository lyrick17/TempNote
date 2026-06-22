import { Component, inject } from '@angular/core';
import { Scratchpad } from './sections/scratchpad/scratchpad';
import { HomeTabState } from './services/home-tab-state';
import { Stash } from './sections/stash/stash';

@Component({
  selector: 'app-home',
  imports: [Scratchpad, Stash],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  homeTab = inject(HomeTabState);
}
