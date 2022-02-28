import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubtaskChangeRequestListPage } from './subtask-change-request-list.page';

describe('SubtaskChangeRequestListPage', () => {
  let component: SubtaskChangeRequestListPage;
  let fixture: ComponentFixture<SubtaskChangeRequestListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskChangeRequestListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtaskChangeRequestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
