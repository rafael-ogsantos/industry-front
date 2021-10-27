import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  checkoutForm: any;


  constructor(private formBuilder: FormBuilder,
              private courseService: CoursesService,
              public datepipe: DatePipe
              ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      start_date: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      // active: ['', [Validators.minLength(1), Validators.maxLength(2)]],
    });
  }

  onSubmit() {
    const date = this.datepipe.transform(this.checkoutForm.value.start_date, 'yyyy-MM-dd');

    let formatData = {name: this.checkoutForm.value.name, start_date: date}

    this.courseService.save(formatData, 'courses').subscribe(
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
