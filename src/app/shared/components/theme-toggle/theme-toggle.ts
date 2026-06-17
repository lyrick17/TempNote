import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { Theme } from '../../../core/types/theme-toggle.type';
import { Icons } from '../icons';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [...Icons],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  themeService = inject(ThemeService);
  themes = Theme;

  toggle() {
    this.themeService.toggleTheme();
  }
}
