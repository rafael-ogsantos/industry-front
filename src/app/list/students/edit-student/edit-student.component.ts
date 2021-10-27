import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  checkoutForm: any;

  students: any;
  studentId: any;

  dataForm = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentsService,
              private route: ActivatedRoute
              ) {
              this.studentId = this.route.snapshot.paramMap.get("id");
              }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.minLength(3), Validators.maxLength(30)]]
    });


    this.studentService.getById(this.studentId, 'students').subscribe(data => {
      this.dataForm.name = data.name,
      this.dataForm.email = data.email
      this.dataForm.password = data.password
    })
  }

  onSubmit() {
    this.studentService.update(this.checkoutForm.value, this.studentId, 'students').subscribe(
      data => {
        alert(data.success)
      },
      error => {
        alert(error.error)
      }
    );
  }

}
