import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TextEditor } from '../text-editor/text-editor';
import { ThemeService } from '../../../../core/services/theme.service';
import { Theme } from '../../../../core/types/theme-toggle.type';
import { stripHtml } from '../../../../utils/utils';
import { Icons } from '../../../../shared/components/icons';
import { ScratchpadNotes } from '../../services/scratchpad-notes';
import { HomeTabState } from '../../services/home-tab-state';

const BOTTOM_EDITOR_TEXTS = {
  scratchpad:
    'Note: All scratch notes written in TempNote will not be saved once you close the site.',
  stash:
    'Note: Clearing your browser cache or site data will delete your stashed notes.',
};

@Component({
  selector: 'app-main-content',
  imports: [FormsModule, TextEditor, ...Icons],
  templateUrl: './main-content.html',
  styleUrls: ['./main-content.css'],
})
export class MainContent {
  notes = inject(ScratchpadNotes);
  toastr = inject(ToastrService);
  themeService = inject(ThemeService);
  homeTab = inject(HomeTabState);
  themes = Theme;
  bottomEditorText = computed(() =>
    this.homeTab.tabState() === 'scratchpad'
      ? BOTTOM_EDITOR_TEXTS.scratchpad
      : BOTTOM_EDITOR_TEXTS.stash,
  );

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
