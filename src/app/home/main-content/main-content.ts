import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../sidebar/sidebar.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main-content',
  imports: [FormsModule],
  templateUrl: './main-content.html',
  styleUrls: ['./main-content.css', '../../lib/shared/styles.css']
})
export class MainContent {

  notes = inject(SidebarService);
  toastr = inject(ToastrService);

  onTextInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.notes.currentNote.update(n => ({
      ...n,
      text: value
    }));
  }

  createNewNote() {
    if (!this.notes.currentNote().text) {
      // Do not create a new note if there is no text on the current note
      return;
    }
    this.notes.createNewNote();
  }

  downloadNoteAsTextFile() {
    if (!this.notes.currentNote().text) {
      this.toastr.error('Unable to download an empty note.');
      return;
    }
    const blob = new Blob([this.notes.currentNote().text], {type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tempnote.txt';
    a.click();

    // clean the used recourses
    a.remove();
    window.URL.revokeObjectURL(url);
  }
} 
