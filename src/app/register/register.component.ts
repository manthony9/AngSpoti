import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = new RegisterUser();
  warning: string;
  success: boolean;
  loading: boolean;
  sub;
  constructor(private auth: AuthService, private router: ActivatedRoute) {}

  ngOnInit() {}

  onSubmit(f: NgForm): void {
    console.log(f.value);
    if (f.value.userName !== ' ' && f.value.password == f.value.password2) {
      this.loading = true;

      (this.sub = this.auth.register(f.value).subscribe((obj) => {
        console.log(obj);

        this.success = true;
        this.warning = null;
        this.loading = false;
      })),
        (err) => {
          this.success = false;
          this.warning = null;
          this.loading = false;
        };
    }
  }
}
