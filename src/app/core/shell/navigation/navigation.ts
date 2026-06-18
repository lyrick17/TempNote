import { Component, inject } from '@angular/core';
import { HomeTabState } from '../../../features/home/services/home-tab-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  homeTab = inject(HomeTabState);

  setHomeTab(tab: 'scratchpad' | 'stash') {
    this.homeTab.setTab(tab);
  }
}
