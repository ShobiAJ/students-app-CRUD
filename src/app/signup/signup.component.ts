import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private _http: HttpClient, private route: Router) {}
  public signupForm !: FormGroup;

  showPassword:boolean = false

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      password: ['',Validators.required]
    })    
  }

  onToggle() {
    this.showPassword = !this.showPassword
  }

  onClickSignUp() {
    this._http.post("http://localhost:3000/signup_users", this.signupForm.value).subscribe(d => {
      alert("sign is successfull");
      this.signupForm.reset();
      this.route.navigate(['/login'])
    })
  }

}
