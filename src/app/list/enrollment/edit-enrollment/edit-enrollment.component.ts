import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { CoursesService } from 'src/app/service/courses.service';
import { EnrollmentService } from 'src/app/service/enrollment.service';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-edit-enrollment',
  templateUrl: './edit-enrollment.component.html',
  styleUrls: ['./edit-enrollment.component.css']
})
export class EditEnrollmentComponent implements OnInit {

  checkoutForm: any;
  studentId: any;

  students: Student[] = [];
  courses: Course[] = [];

  dataForm = {
    student: 0,
    course: 0,
    active: 0
  }

  constructor(private formBuilder: FormBuilder,
              private enrollmentService: EnrollmentService,
              private studentsService: StudentsService,
              private coursesService: CoursesService,
              private route: ActivatedRoute
              ) {
              this.studentId = this.route.snapshot.paramMap.get("id");
              }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      student_id: ['', [Validators.required]],
      course_id: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });

    this.studentsService.get('students').subscribe(data => this.students = data);
    this.coursesService.get('courses').subscribe(data => this.courses = data);

    this.enrollmentService.getById(this.studentId, 'enrollments').subscribe(data => {
      this.dataForm.student = data[0].student_id,
      this.dataForm.course = data[0].course_id
      this.dataForm.active = data[0].active
    })
  }

  onSubmit() {
    this.enrollmentService.update(this.checkoutForm.value, this.studentId, 'enrollments').subscribe(
      data => {
        alert(data.success)
      },
      error => {
        alert(error.error)
      }
    );
  }
}
