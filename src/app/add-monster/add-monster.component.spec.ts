import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonsterComponent } from './add-monster.component';

describe('AddMonsterComponent', () => {
  let component: AddMonsterComponent;
  let fixture: ComponentFixture<AddMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
