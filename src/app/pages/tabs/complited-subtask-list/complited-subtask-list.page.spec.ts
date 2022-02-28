import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplitedSubtaskListPage } from './complited-subtask-list.page';

describe('ComplitedSubtaskListPage', () => {
  let component: ComplitedSubtaskListPage;
  let fixture: ComponentFixture<ComplitedSubtaskListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplitedSubtaskListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplitedSubtaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
