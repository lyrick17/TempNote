import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../sidebar/sidebar.service';
import { ToastrService } from 'ngx-toastr';
import { TextEditor } from '../../lib/text-editor/text-editor';
import { ThemeToggleService } from '../../lib/theme-toggle/theme-toggle.service';
import { Theme } from '../../lib/theme-toggle/theme-toggle.model';
import { stripHtml } from '../../lib/shared/utils';
import { Icons } from '../../lib/icons';

@Component({
  selector: 'app-main-content',
  imports: [FormsModule, TextEditor, ...Icons],
  templateUrl: './main-content.html',
  styleUrls: ['./main-content.css', '../../lib/shared/styles.css'],
})
export class MainContent {
  notes = inject(SidebarService);
  toastr = inject(ToastrService);
  themeToggleService = inject(ThemeToggleService);
  themes = Theme;

  onTextInput(value: string) {
    this.notes.currentNote.update((n) => ({
      ...n,
      content: value,
    }));
  }

  onTitleInput(value: string) {
    this.notes.currentNote.update((n) => ({
      ...n,
      title: value,
    }));
  }

  createNewNote() {
    if (!this.notes.currentNote().content && !this.notes.currentNote().title) {
      // Do not create a new note if there is no text on the current note
      return;
    }

    this.notes.createNewNote();
  }

  copyNote() {
    if (
      this.notes.currentNote().content.length <= 0 ||
      this.notes.currentNote().text.length <= 0
    ) {
      return;
    }

    try {
      const htmlBlob = new Blob([this.notes.currentNote().content], {
        type: 'text/html',
      });
      const textBlob = new Blob([this.notes.currentNote().text], {
        type: 'text/plain',
      });

      const data = [
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ];

      navigator.clipboard.write(data);
      this.toastr.success('Copied!');
    } catch (e) {
      this.toastr.error('Unable to copy the note. Please try again.');
    }
  }

  //! Deprecated: Export Feature is removed for now as of v2.2
  downloadNoteAsTextFile() {
    if (!this.notes.currentNote().text) {
      this.toastr.error('Unable to download an empty note.');
      return;
    }
    const blob = new Blob([stripHtml(this.notes.currentNote().text)], {
      type: 'text/plain',
    });
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
