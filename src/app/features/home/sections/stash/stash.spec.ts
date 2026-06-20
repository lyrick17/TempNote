import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stash } from './stash';

describe('Stash', () => {
  let component: Stash;
  let fixture: ComponentFixture<Stash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
