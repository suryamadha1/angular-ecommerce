import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeOperatorsComponent } from './practice-operators.component';

describe('PracticeOperatorsComponent', () => {
  let component: PracticeOperatorsComponent;
  let fixture: ComponentFixture<PracticeOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
