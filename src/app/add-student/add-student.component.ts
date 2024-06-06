import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  studentForm !:  FormGroup;
  buttonValue : string = 'Save'

  constructor(private fb:FormBuilder, private _http: HttpClient, private route:Router, @Inject (MAT_DIALOG_DATA) public editData: any, public dialog: MatDialogRef<AddStudentComponent>) {}

  courses = ['Frontend-Developer', 'Fullstack-Developer', 'Backend-Developer', 'Tester', 'RPA-Developer']

  onSubmit() {
    // editdata will give the row data from dashboard
    if(!this.editData){
      //on add student detail
      this._http.post("http://localhost:3000/student_list", this.studentForm.value).subscribe( d=> {
        this.studentForm.reset();
        this.dialog.close('save');
      })
    } else {
      //on edit student detail
      this._http.put("http://localhost:3000/student_list/"+this.editData.elementData.id , this.studentForm.value).subscribe(data => {
        this.dialog.close('update')
      })
    }
    
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      courses: ['',Validators.required]
    }) 
    if(this.editData) {
      this.buttonValue = 'Update'
      this.studentForm.controls['fname'].setValue(this.editData.elementData.fname)
      this.studentForm.controls['lname'].setValue(this.editData.elementData.lname)
      this.studentForm.controls['email'].setValue(this.editData.elementData.email)
      this.studentForm.controls['mobile'].setValue(this.editData.elementData.mobile)
      this.studentForm.controls['courses'].setValue(this.editData.elementData.courses)
    }
  }

}
