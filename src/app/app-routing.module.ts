import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './list/courses/add/add.component';
import { CoursesComponent } from './list/courses/courses.component';
import { EditComponent } from './list/courses/edit/edit.component';
import { AddEnrollmentComponent } from './list/enrollment/add-enrollment/add-enrollment.component';
import { EditEnrollmentComponent } from './list/enrollment/edit-enrollment/edit-enrollment.component';
import { EnrollmentComponent } from './list/enrollment/enrollment.component';
import { AddStudentComponent } from './list/students/add-student/add-student.component';
import { EditStudentComponent } from './list/students/edit-student/edit-student.component';
import { StudentsComponent } from './list/students/students.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent},
  { path: 'add-course', component: AddComponent },
  { path: 'edit-course/:id', component: EditComponent },

  { path: 'students', component: StudentsComponent},
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },

  { path: 'enrollments', component: EnrollmentComponent},
  { path: 'add-enrollment', component: AddEnrollmentComponent },
  { path: 'edit-enrollment/:id', component: EditEnrollmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
