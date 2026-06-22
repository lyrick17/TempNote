import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/shell/header/header';
import { Divider } from './core/shell/divider/divider';
import { Footer } from './core/shell/footer/footer';
import { Navigation } from './core/shell/navigation/navigation';
import { ScratchpadNotes } from './features/home/services/scratchpad-notes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Divider, Footer, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tempnote');
  private notes = inject(ScratchpadNotes);

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    if (this.notes.hasNotes()) {
      $event.preventDefault();
      // $event.returnValue = ''; // Chrome requires a string
    }
  }
}
