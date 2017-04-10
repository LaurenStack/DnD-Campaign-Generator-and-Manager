import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstersViewComponent } from './monsters-view.component';

describe('MonstersViewComponent', () => {
  let component: MonstersViewComponent;
  let fixture: ComponentFixture<MonstersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonstersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
