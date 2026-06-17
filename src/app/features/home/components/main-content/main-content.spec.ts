import { TestBed } from '@angular/core/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SidebarService } from '../sidebar/sidebar.service';
import { MainContent } from './main-content';

describe('Sidebar Service', () => {
  let notes: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainContent],
      providers: [
        SidebarService,
        ToastrService,
        provideToastr(),
        provideAnimations(),
      ],
    });
    notes = TestBed.inject(SidebarService);
  });

  it('should enable copy to clipboard button when entering text', () => {
    const fixture = TestBed.createComponent(MainContent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    const copyBtn = compiled.querySelector(
      'button[name="copy-note"]',
    ) as HTMLButtonElement;
    expect(copyBtn!.disabled).toBe(true);

    app.onTextInput('<p>Hello world.</p>');
    fixture.detectChanges();

    expect(copyBtn!.disabled).toBe(false);
  });
  it('copies to clipboard', () => {
    const fixture = TestBed.createComponent(MainContent);
    const app = fixture.componentInstance;
    spyOn(app, 'copyNote' as never);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const copyBtn = compiled.querySelector(
      'button[name="copy-note"]',
    ) as HTMLButtonElement;
    app.onTextInput('<p>Hello world.</p>');
    fixture.detectChanges();

    expect(copyBtn!.disabled).toBe(false);
    copyBtn.click();

    expect(app.copyNote).toHaveBeenCalledTimes(1);
  });
  it('adds new note', () => {
    const fixture = TestBed.createComponent(MainContent);
    const app = fixture.componentInstance;
    spyOn(notes, 'createNewNote' as never);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const addBtn = compiled.querySelector(
      'button[name="add-note"]',
    ) as HTMLButtonElement;
    app.onTextInput('<p>Hello world.</p>');
    fixture.detectChanges();

    addBtn.click();

    expect(notes.createNewNote).toHaveBeenCalledTimes(1);
  });
  it('does not add new note when empty current note', () => {
    const fixture = TestBed.createComponent(MainContent);
    const app = fixture.componentInstance;
    spyOn(notes, 'createNewNote' as never);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const addBtn = compiled.querySelector(
      'button[name="add-note"]',
    ) as HTMLButtonElement;

    addBtn.click();

    expect(notes.createNewNote).toHaveBeenCalledTimes(0);
  });
});
