import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  checkoutForm: any;

  courses: any;
  courseId: any;

  dataForm = {
    name: '',
    start_date: ''
  }

  constructor(private formBuilder: FormBuilder,
              private courseService: CoursesService,
              public datepipe: DatePipe,
              private route: ActivatedRoute
              ) {
              this.courseId = this.route.snapshot.paramMap.get("id");
              }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      start_date: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      // active: ['', [Validators.minLength(1), Validators.maxLength(2)]],
    });


    this.courseService.getById(this.courseId, 'courses').subscribe(data => {
      this.dataForm.name = data.name,
      this.dataForm.start_date = data.start_date
    })
  }

  onSubmit() {
    const date = this.datepipe.transform(this.checkoutForm.value.start_date, 'yyyy-MM-dd');

    let formatData = {name: this.checkoutForm.value.name, start_date: date}

    this.courseService.update(formatData, this.courseId, 'courses').subscribe(
      data => {
        alert(data.success)
      },
      error => {
        alert(error.error)
      }
    );
  }
}
