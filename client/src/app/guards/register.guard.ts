import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export const registerGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLogged === false) {
    return true;
  }
  const router = inject(Router);
  const toastr = inject(ToastrService);
  toastr.error(`You are already logged in`, 'Error');
  return router.navigate(['/home']);
};
