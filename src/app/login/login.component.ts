import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private _http: HttpClient, private route:Router) {}
  loginForm !: FormGroup;
  showPassword:boolean = false

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['', Validators.required]
    })    
  }

  onToggle() {
    this.showPassword = !this.showPassword
  }

  onLogin() {
    this._http.get<any>("http://localhost:3000/signup_users").subscribe((data) => {
      const users = data.find((element: any) => {
        return (element.name === this.loginForm.value.username && element.password === this.loginForm.value.password)                
      });
      if(users) {
        this.route.navigate(['/dashboard'])
      }
      else {
        alert('No users found')
      }
      this.loginForm.reset()
    })
  }

}
