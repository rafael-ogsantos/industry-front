import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  courseId: any;

  constructor(private studentService: StudentsService, private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.studentService.get('students').subscribe(data => this.students = data)
  }

  destroy(id: any) {
    this.studentService.delete(id, 'students').subscribe(
      data => {
        window.location.reload();
      }
    );
  }
}
