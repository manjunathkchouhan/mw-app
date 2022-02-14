import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubtaskChangeRequestPage } from './subtask-change-request.page';

describe('SubtaskChangeRequestPage', () => {
  let component: SubtaskChangeRequestPage;
  let fixture: ComponentFixture<SubtaskChangeRequestPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskChangeRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtaskChangeRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
