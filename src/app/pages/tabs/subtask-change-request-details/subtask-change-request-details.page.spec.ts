import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubtaskChangeRequestDetailsPage } from './subtask-change-request-details.page';

describe('SubtaskChangeRequestDetailsPage', () => {
  let component: SubtaskChangeRequestDetailsPage;
  let fixture: ComponentFixture<SubtaskChangeRequestDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskChangeRequestDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtaskChangeRequestDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
