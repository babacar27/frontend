import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from './core/services/auth-service.service';
import { CanActivateFn, Router } from '@angular/router';


export const AuthGuard : CanActivateFn= (route,state)=> {

 const authservice = inject (AuthServiceService);
 const router = inject (Router);


 if(authservice.isAuth()){
  return true;
 }
 router.navigate([authservice.redirctUrl]);
 return false;
  };

