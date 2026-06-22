import { TestBed } from '@angular/core/testing';

import { StashNotes } from './stash-notes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoteItem } from '../model/note-item';

describe('StashNotes', () => {
  let service: StashNotes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StashNotes, provideToastr(), provideAnimations()], // or mock toastr
    });
    service = TestBed.inject(StashNotes);
  });

  it('should add a note only when entered text', () => {
    service.createNewNote();
    expect(Object.keys(service.notes()).length).toBeLessThanOrEqual(0);

    service.currentNote.update((n) => ({
      ...n,
      content: '<p>Hello World.</p>',
      title: 'First Test Note',
    }));
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(1);
  });
  it('removes note when its empty', () => {
    service.createNewNote();
    service.currentNote.update((n) => ({
      ...n,
      content: '<p>Hello World.</p>',
    }));
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(1);
    service.currentNote.update((n) => ({
      ...n,
      content: '',
    }));
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(0);
  });
  it('adds multiple notes', () => {
    service.createNewNote();
    service.currentNote.update((n) => ({
      ...n,
      content: '<p>Hello World.</p>',
    }));
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(1);
    service.createNewNote();
    service.currentNote.update((n) => ({
      ...n,
      content: '<p>Another Note.</p>',
    }));
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(2);
  });
  it('determines note type as text correctly', () => {
    service.createNewNote();

    service.currentNote.update((n) => ({
      ...n,
      content: '<p>Hello World.</p>',
    }));
    TestBed.tick();
    expect(service.currentNote().type).toBe('text');
  });
  it('limits to 1500 characters only', () => {
    service.createNewNote();

    // 1501 characters
    service.updateNote(
      1,
      '1long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testin',
      '<p>1long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testin</p>',
      '',
      'text',
    );
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(0);

    // 1500 characters
    service.updateNote(
      1,
      'long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testin',
      '<p>long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testing character long item testin</p>',
      '',
      'text',
    );
    TestBed.tick();
    expect(Object.keys(service.notes()).length).toEqual(1);
  });
  it('limits to 30 notes only', () => {
    // Populate first before testing
    const sampleNote = {
      id: 1,
      text: 'a',
      content: '<p>a</p>',
      title: '',
      type: 'text',
    } as NoteItem;
    service.latestId = 29;
    service.notes.update((n) => ({
      1: sampleNote,
      2: sampleNote,
      3: sampleNote,
      4: sampleNote,
      5: sampleNote,
      6: sampleNote,
      7: sampleNote,
      8: sampleNote,
      9: sampleNote,
      10: sampleNote,
      11: sampleNote,
      12: sampleNote,
      13: sampleNote,
      14: sampleNote,
      15: sampleNote,
      16: sampleNote,
      17: sampleNote,
      18: sampleNote,
      19: sampleNote,
      20: sampleNote,
      21: sampleNote,
      22: sampleNote,
      23: sampleNote,
      24: sampleNote,
      25: sampleNote,
      26: sampleNote,
      27: sampleNote,
      28: sampleNote,
      29: sampleNote,
    }));
    TestBed.tick();
    expect(service.arrayNotes().length).toBe(29);

    // --- successfully create a note
    // current note resets when creating new note
    service.createNewNote();
    TestBed.tick();

    service.currentNote.update((n) => ({
      ...n,
      content: '<p>lalala</p>',
    }));
    TestBed.tick();
    expect(service.arrayNotes().length).toBe(30);

    // --- cannot create a new note past 30
    service.createNewNote();
    TestBed.tick();

    // currentNote is not reset to note item template
    expect(service.currentNote().content).toBe('<p>lalala</p>');
    service.currentNote.update((n) => ({
      ...n,
      content: '<p>wawawa</p>',
    }));
    TestBed.tick();
    expect(service.arrayNotes().length).toBe(30); // still 30, not 31
  });
});
