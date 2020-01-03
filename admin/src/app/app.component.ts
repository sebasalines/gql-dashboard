import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getViewer, ViewerPayload } from './shared/graphql/query/auth';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    public auth: AuthService,
  ) { }

  title = 'testangular';
  user: User;

  ngOnInit() {
    this.auth.setup();
    this.auth.currentUser.subscribe(
      user => { this.user = user; },
    );
  }

  logout() {
    this.auth.logout();
  }
}
