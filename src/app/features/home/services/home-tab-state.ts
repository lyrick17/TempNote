import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeTabState {
  // default to scratchpad
  tabState = signal<'scratchpad' | 'stash'>('scratchpad');

  setTab(tab: 'scratchpad' | 'stash') {
    this.tabState.update(() => tab);
  }
}
