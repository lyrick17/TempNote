import { Component, inject } from '@angular/core';
import { ThemeToggleService } from './theme-toggle.service';
import { Theme } from './theme-toggle.model';
import { Icons } from '../icons';

@Component({
  selector: 'app-theme-toggle',
  imports: [...Icons],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  themeToggleService = inject(ThemeToggleService);
  themes = Theme;

  toggle() {
    this.themeToggleService.toggleTheme();
  }
}
