import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmtsComponent } from './umts.component';

describe('UmtsComponent', () => {
  let component: UmtsComponent;
  let fixture: ComponentFixture<UmtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
