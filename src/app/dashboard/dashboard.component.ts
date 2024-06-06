import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddStudentComponent } from '../add-student/add-student.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  response: any;

  constructor(private route: Router, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.getStudentInfo()
  }

  onLogout() {
    this.route.navigate(['/login'])
  }

  onAddStudent() {
    this.dialog.open(AddStudentComponent, {
      width: '40%',
      height: '70%'
    }).afterClosed().subscribe(data => {
      this.getStudentInfo()
    });
  }
  
  onEdit(item:any) {
    this.dialog.open(AddStudentComponent, {
      width: '40%',
      height: '70%',
      data: {
        elementData: item
      }
    }).afterClosed().subscribe(data => {
      this.getStudentInfo()
    });
  }

  getStudentInfo() {
    this.http.get("http://localhost:3000/student_list").subscribe(d => {
      this.response = d
      console.log('length', this.response.length)
    }, error => {
      console.log(error)
    }
    )
  }

  onDelete(id: number) {
    console.log('index', id)
    let apiUrl = 'http://localhost:3000/student_list';
    this.http.delete(`${apiUrl}/${id}`).subscribe(d=> {
      alert('deleted successfully')
      this.getStudentInfo();
    })
  }

}
