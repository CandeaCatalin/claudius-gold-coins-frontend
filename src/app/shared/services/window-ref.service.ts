import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  private screenWidthSubject = new BehaviorSubject<number>(0);
  screenWidth$ = this.screenWidthSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateScreenWidth();
      fromEvent(window, 'resize')
        .pipe(throttleTime(200)) // Avoid too many updates
        .subscribe(() => this.updateScreenWidth());
    }
  }

  private updateScreenWidth() {
    this.screenWidthSubject.next(window.innerWidth);
  }
}
