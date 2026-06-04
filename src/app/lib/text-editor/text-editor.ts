import {
  Component,
  effect,
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
} from 'ngx-editor';

// Documentation of ngx-editor: https://sibiraj-s.github.io/ngx-editor/

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.html',
  standalone: true,
  imports: [NgxEditorComponent, NgxEditorMenuComponent, FormsModule],
})
export class TextEditor implements OnInit, OnDestroy {
  editor!: Editor;
  toolbar: Toolbar = [
    // default value
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['undo', 'redo'],
  ];

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
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
