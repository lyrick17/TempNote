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
import { StashNotes } from '../../services/stash-notes';
import { Notes } from '../../model/notes';

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
  toastr = inject(ToastrService);
  themeService = inject(ThemeService);
  homeTab = inject(HomeTabState);
  themes = Theme;

  scratchpadNotes = inject(ScratchpadNotes);
  stashNotes = inject(StashNotes);
  activeNotes = computed<Notes>(() =>
    this.homeTab.tabState() === 'scratchpad'
      ? this.scratchpadNotes
      : this.stashNotes,
  );
  bottomEditorText = computed(() =>
    this.homeTab.tabState() === 'scratchpad'
      ? BOTTOM_EDITOR_TEXTS.scratchpad
      : BOTTOM_EDITOR_TEXTS.stash,
  );

  onTextInput(value: string) {
    const text = stripHtml(value);
    if (
      this.homeTab.tabState() === 'stash' &&
      text.length > this.stashNotes.MAX_CHARACTER_LIMIT
    ) {
      return;
    }
    this.activeNotes().currentNote.update((n) => ({
      ...n,
      content: value,
      text: stripHtml(value),
    }));
  }

  onTitleInput(value: string) {
    this.activeNotes().currentNote.update((n) => ({
      ...n,
      title: value,
    }));
  }

  createNewNote() {
    if (
      !this.activeNotes().currentNote().content &&
      !this.activeNotes().currentNote().title
    ) {
      // Do not create a new note if there is no text on the current note
      return;
    }

    this.activeNotes().createNewNote();
  }

  copyNote() {
    if (
      this.activeNotes().currentNote().content.length <= 0 ||
      this.activeNotes().currentNote().text.length <= 0
    ) {
      return;
    }

    try {
      const htmlBlob = new Blob([this.activeNotes().currentNote().content], {
        type: 'text/html',
      });
      const textBlob = new Blob([this.activeNotes().currentNote().text], {
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
    if (!this.activeNotes().currentNote().text) {
      this.toastr.error('Unable to download an empty note.');
      return;
    }
    const blob = new Blob([stripHtml(this.activeNotes().currentNote().text)], {
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
