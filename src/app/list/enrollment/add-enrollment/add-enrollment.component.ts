import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { CoursesService } from 'src/app/service/courses.service';
import { EnrollmentService } from 'src/app/service/enrollment.service';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-add-enrollment',
  templateUrl: './add-enrollment.component.html',
  styleUrls: ['./add-enrollment.component.css']
})
export class AddEnrollmentComponent implements OnInit {

  checkoutForm: any;

  students: Student[] = [];
  courses: Course[] = [];

  constructor(private formBuilder: FormBuilder,
              private enrollmentService: EnrollmentService,
              private coursesService: CoursesService,
              private studentsService: StudentsService,
              ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      student_id: ['', [Validators.required]],
      course_id: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });

    this.studentsService.get('students').subscribe(data => this.students = data);
    this.coursesService.get('courses').subscribe(data => this.courses = data);
  }

  onSubmit() {
    this.enrollmentService.save(this.checkoutForm.value, 'enrollments').subscribe(
      data => {
        alert(data.success)
        window.location.reload();
      },
      error => {
        alert(error.error)
      }
    );
  }


}
