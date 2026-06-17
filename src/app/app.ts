import { Component, HostListener, inject, signal } from '@angular/core';
import { Home } from './features/home/home';
import { SidebarService } from './features/home/components/sidebar/sidebar.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tempnote');
  private notes = inject(SidebarService);

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    if (this.notes.hasNotes()) {
      $event.preventDefault();
      // $event.returnValue = ''; // Chrome requires a string
    }
  }
}
