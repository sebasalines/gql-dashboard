import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  user: User = null;
  isAuthenticated = false;

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(
      data => { this.isAuthenticated = data; },
    );
    this.auth.currentUser.subscribe(
      data => { this.user = data; },
    );
  }

  logout() {
    this.auth.logout();
  }
}
