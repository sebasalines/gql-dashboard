import { Injectable } from '@angular/core';
import { logIn, LoginPayload } from '../graphql/mutation/auth';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { getViewer, ViewerPayload } from '../graphql/query/auth';
import { User } from '../models/user';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey = 'userToken';

  private currentUserSubject = new BehaviorSubject<User>(null);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(
    private apollo: Apollo,
    private router: Router,
  ) {
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  setup() {
    const token = localStorage.getItem(this.storageKey);
    if (token) {
      this.apollo.query<ViewerPayload>({ query: getViewer }).subscribe(
        ({ data }) => {
          if (data && data.viewer) {
            this.currentUserSubject.next(data.viewer);
            this.isAuthenticatedSubject.next(true);
            this.router.navigateByUrl('/dashboard');
          }
        }
      )
    } else {
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      localStorage.removeItem(this.storageKey);
      this.router.navigateByUrl('/auth');
    }
  }

  async login(input: { email: string, password: string }) {
    this.apollo.mutate<LoginPayload>({
      mutation: logIn,
      variables: { input },
    }).subscribe(
      async ({ data, }) => {
        if (data.login.token) {
          localStorage.setItem(this.storageKey, data.login.token);
          const user = await this.apollo.getClient().query<ViewerPayload>({ query: getViewer });
          this.currentUserSubject.next(user.data.viewer);
          this.isAuthenticatedSubject.next(true);
          this.router.navigateByUrl('/dashboard');
        }
      },
      console.warn,
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem(this.storageKey);
    this.router.navigateByUrl('/');
  }
}
