import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentService } from 'src/app/service/enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  enrollments: Enrollment[] = [];
  enrollmentId: any;

  constructor(private enrollmentService: EnrollmentService, private route: ActivatedRoute) {
    this.enrollmentId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.enrollmentService.get('enrollments').subscribe(data => this.enrollments = data)
  }

  destroy(id: any) {
    this.enrollmentService.delete(id, 'enrollments').subscribe(
      data => {
        window.location.reload();
      }
    );
  }
}
