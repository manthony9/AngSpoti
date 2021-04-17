import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  warning: string;
  loading: boolean;
  sub;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    if (f.value.userName !== ' ' && f.value.password !== ' ') {
      this.loading = true;
      (this.sub = this.auth.login(f.value).subscribe((obj) => {
        this.loading = false;
        localStorage.setItem('access_token', obj.token);
        this.router.navigate(['/newReleases']);
      })),
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        };
    }
  }
}
