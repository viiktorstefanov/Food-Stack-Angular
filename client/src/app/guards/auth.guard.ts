import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLogged) {
    return true;
  }
  const router = inject(Router);
  const toastr = inject(ToastrService);
  toastr.error('Please sign in to access this page.', '');
  return router.navigate(['/home']);
};
