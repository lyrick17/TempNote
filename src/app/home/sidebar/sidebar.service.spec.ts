import { TestBed } from '@angular/core/testing';
import { SidebarService } from './sidebar.service';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('Sidebar Service', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService, provideToastr(), provideAnimations()], // or mock toastr
    });
    service = TestBed.inject(SidebarService);
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
  it('determines note type as image correctly', () => {
    service.createNewNote();

    service.currentNote.update((n) => ({
      ...n,
      content: '<img src="https://example.com/" alt="example />',
      title: 'Image with title',
    }));

    TestBed.tick();
    expect(service.currentNote().type).toBe('image');
  });
  it('determines note type as combined correctly', () => {
    service.createNewNote();

    service.currentNote.update((n) => ({
      ...n,
      content:
        '<p>Hello World.</p><img src="https://example.com/" alt="example />',
    }));
    TestBed.tick();
    expect(service.currentNote().type).toBe('combined');
  });
});
