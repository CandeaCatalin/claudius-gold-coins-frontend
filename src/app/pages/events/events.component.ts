import { NavigateService } from './../../services/navigate.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsModel } from '../../shared/models/EventsModel';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../../services/http-requests.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-events',
  imports: [LoadingSpinnerComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit, OnDestroy {
  eventsList: EventsModel[] = [];
  selectedEvent?: EventsModel = undefined;
  subscriptions: Subscription[] = [];
  isLoading: boolean = true;
  constructor(
    private adminService: AdminService,
    private navigateService: NavigateService,
    private httpRequestsService: HttpRequestsService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.httpRequestsService.get('events/getEvents').subscribe({
        next: (response: any) => {
          this.eventsList = response;
          console.log(response);
          this.eventsList.forEach(
            (x) => (x.image = this.convertImageBytesToImage(x.image))
          );
          console.log(this.eventsList);
          this.isLoading = false;
        },
        error: (err) => console.error('Get events failed', err),
      })
    );
  }

  public imageAltBuild(item: EventsModel, index: number) {
    var imageAlt = 'image-alt-';

    if (item.title != null && item.title != undefined) {
      imageAlt = imageAlt.concat(item.title.toLowerCase().replace(/\s+/g, '-'));
    } else {
      imageAlt = imageAlt.concat('-');
      imageAlt = imageAlt + index;
    }

    return imageAlt;
  }

  public eventClicked(event: EventsModel): void {
    this.selectedEvent = event;
    window.scrollTo(0, 0);
  }

  public generateWatchLink(link?: string): string {
    if (link?.includes('facebook')) {
      return 'https://www.facebook.com/plugins/video.php?href=' + link;
    } else {
      return '';
    }
  }
  public isAdmin() {
    return this.adminService.isAdmin();
  }
  public navigateToAddEvent() {
    this.navigateService.navigate('create-event');
  }

  convertImageBytesToImage(imageBytes: any) {
    // Step 1: Convert the array of bytes into a Uint8Array
    const byteArray = new Uint8Array(imageBytes.data);

    // Step 2: Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type as per your image format (e.g., 'image/png')

    // Step 3: Create an object URL for the Blob
    return URL.createObjectURL(blob); // This URL can be used as an img src
  }

  deleteEvent() {
    const deletedId = this.selectedEvent?.id;
    this.subscriptions.push(
      this.httpRequestsService
        .delete(`events/delete/${deletedId}`, true)
        .subscribe({
          next: () => {
            this.selectedEvent = undefined;
            this.eventsList = this.eventsList.filter((x) => x.id != deletedId);
          },
          error: (err) => console.log(err),
        })
    );
  }
}
