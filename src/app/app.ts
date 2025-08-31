import { Component, HostListener, inject, signal } from '@angular/core';
import { Home } from "./home/home";
import { SidebarService } from './home/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
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
