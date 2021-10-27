import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  checkoutForm: any;

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentsService,
              public datepipe: DatePipe
              ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.minLength(5), Validators.maxLength(30), Validators.required]],
      email: ['', [Validators.minLength(5), Validators.maxLength(30), Validators.required]],
      password: ['', [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
    });
  }

  onSubmit() {
    this.studentService.save(this.checkoutForm.value, 'students').subscribe(
      data => {
        alert(data.success)
        window.location.reload();
      },
      error => {
      }
    );
  }


}
