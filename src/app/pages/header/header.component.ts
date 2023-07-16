import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {}

  public logout() {
    this.login.logout();
    this.router.navigate(['/login']);
  }
}
