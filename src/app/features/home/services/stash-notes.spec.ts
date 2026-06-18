import { TestBed } from '@angular/core/testing';

import { StashNotes } from './stash-notes';

describe('StashNotes', () => {
  let service: StashNotes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StashNotes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
