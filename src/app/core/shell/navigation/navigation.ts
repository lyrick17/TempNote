import { Component, inject } from '@angular/core';
import { HomeTabState } from '../../../features/home/services/home-tab-state';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private router = inject(Router);
  homeTab = inject(HomeTabState);

  setHomeTab(tab: 'scratchpad' | 'stash') {
    this.homeTab.setTab(tab);
  }

  currentUrl(): string {
    return this.router.url;
  }

  isHome(): boolean {
    return this.router.isActive('/', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
