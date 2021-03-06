import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanAddGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.auth.user$.pipe(
      take(1),
      map(user => user && (user.roles.admin || user.roles.moderator) ? true : false),
      tap(canAdd => {
        if (!canAdd) {
          alert('Access denied - Admins or Moderators only');
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
        }
      })
    )
  }
}
