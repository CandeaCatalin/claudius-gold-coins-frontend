import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class NavigateService{
    constructor(private router: Router) {}

    navigateAndRefresh(path:string) {
      this.router.navigate([`/${path}`]).then(() => {
        window.location.reload();
      });
    }
    navigate(path:string) {
        this.router.navigate([`/${path}`]);
      }
}