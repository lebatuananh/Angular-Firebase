import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../model/app-user';
import {UserService} from './user.service';
import 'rxjs-compat/add/operator/switchMap';
import 'rxjs-compat/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  private authProvider: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: ActivatedRoute,
    private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/employee';
    localStorage.setItem('returnUrl', returnUrl);
    this.authProvider = this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // this.afAuth.auth.signInWithRedirect(this.authProvider).then(success => {
    //   this.router.navigate(['/employee']); // <-- NEVER REACHED
    // })
    //   .catch(error => console.error('ERROR', error));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();
      return Observable.of(null);
    });
  }
}
