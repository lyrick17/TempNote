import { TestBed } from '@angular/core/testing';

import { HomeTabState } from './home-tab-state';

describe('HomeTabState', () => {
  let service: HomeTabState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeTabState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
