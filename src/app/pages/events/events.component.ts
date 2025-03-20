import { Component } from '@angular/core';
import { EventsModel } from '../../shared/models/EventsModel';
import { MOCKED_EVENTS } from '../../data/MOCKS/MockedEvents';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})


export class EventsComponent {
  eventsList: EventsModel[] = MOCKED_EVENTS;
  selectedEvent?: EventsModel = undefined;

  public imageAltBuild(item:EventsModel,index: number){
    var imageAlt = "image-alt-";
  
    if(item.title != null && item.title != undefined){
      imageAlt = imageAlt.concat(item.title.toLowerCase().replace(/\s+/g, "-"));
    }
    else{
      imageAlt = imageAlt.concat("-");  
      imageAlt = imageAlt + index;  
    }

    return imageAlt;
  }

  public eventClicked(event: EventsModel):void{
    this.selectedEvent = event;
    console.log(event);
  }

  public generateWatchLink(link?: string): string{
    if(link?.includes("facebook")){
      return "https://www.facebook.com/plugins/video.php?href=" + link;
    }
    else{
      return "";
    }
    console.log(link);
  }
}
