import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.page.html',
  styleUrls: ['./change-request.page.scss'],
})
export class ChangeRequestPage implements OnInit {
  changeRequest: FormGroup;
  taskId;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
    ) {
      this.taskId = this.activatedRoute.snapshot.paramMap.get('task_id');
      console.log(this.taskId);
    this.changeRequest = this.formBuilder.group({
      changeRequest: ['', Validators.required],
      addUsers: [''],
      removeUsers: [''],
      description: [''],
    });
   }
  ngOnInit() {
  }
  changeRequestForm(){
    console.log(this.changeRequest.value);
  }

}
