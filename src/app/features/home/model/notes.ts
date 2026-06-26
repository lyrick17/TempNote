import { Signal, WritableSignal } from '@angular/core';
import { NoteItem } from './note-item';

export interface Notes {
  currentNoteRef: NoteItem;
  currentNote: WritableSignal<NoteItem>;
  notes: WritableSignal<Record<number, NoteItem>>;
  arrayNotes: Signal<NoteItem[]>;
  currentNoteLength?: Signal<number>;
  noteUsagePercent?: Signal<number>;
  createNewNote(shouldNotify?: boolean): void;
  deleteNote(itemId?: number | null, isAutomatic?: boolean): void;
  hasNotes(): boolean;
  updateNote(
    id: number,
    text: string,
    content: string,
    title: string,
    type: '' | 'combined' | 'text' | 'image',
  ): void;
}
