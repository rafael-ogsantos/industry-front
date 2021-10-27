import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  courseId: any;

  constructor(private courseService: CoursesService, private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.courseService.get('courses').subscribe(data => this.courses = data)
  }

  destroy(id: any) {
    this.courseService.delete(id, 'courses').subscribe(
      data => {
        window.location.reload();
      }
    );
  }
}
