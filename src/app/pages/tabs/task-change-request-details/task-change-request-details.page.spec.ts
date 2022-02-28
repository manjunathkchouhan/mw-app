import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskChangeRequestDetailsPage } from './task-change-request-details.page';

describe('TaskChangeRequestDetailsPage', () => {
  let component: TaskChangeRequestDetailsPage;
  let fixture: ComponentFixture<TaskChangeRequestDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskChangeRequestDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskChangeRequestDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
