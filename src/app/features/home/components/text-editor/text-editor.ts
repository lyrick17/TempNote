import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgxEditorComponent,
  NgxEditorMenuComponent,
  Editor,
  Toolbar,
  toHTML,
} from 'ngx-editor';
import { HomeTabState } from '../../services/home-tab-state';
import {
  stashNotePlugin,
  stashNoteSchema,
} from '../../../../utils/text-editor-options';
import { StashNotes } from '../../services/stash-notes';

// Documentation of ngx-editor: https://sibiraj-s.github.io/ngx-editor/

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.html',
  standalone: true,
  imports: [NgxEditorComponent, NgxEditorMenuComponent, FormsModule],
})
export class TextEditor implements OnInit, OnDestroy {
  editor!: Editor;
  homeTab = inject(HomeTabState);
  stashNote = inject(StashNotes);
  toolbar = computed<Toolbar>(() => [
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    this.homeTab.tabState() === 'scratchpad' ? ['link', 'image'] : ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['undo', 'redo'],
  ]);

  // middleman of value and valueChange
  html = '';

  value = input<string>('');
  valueChange = output<string>();

  constructor() {
    effect(() => {
      this.html = this.value();
    });
  }

  ngOnInit(): void {
    this.editor = new Editor({
      schema:
        this.homeTab.tabState() == 'scratchpad' ? undefined : stashNoteSchema,
      plugins:
        this.homeTab.tabState() == 'scratchpad'
          ? undefined
          : [stashNotePlugin(this.stashNote.MAX_CHARACTER_LIMIT)],
    });
    this.editor.valueChanges.subscribe((doc) => {
      const html = toHTML(doc);
      this.html = html;
      this.valueChange.emit(html);
    });
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor?.destroy();
  }
}
