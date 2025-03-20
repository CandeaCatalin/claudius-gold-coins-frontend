import { BaseModel } from "./BaseModel";

export interface EventsModel extends BaseModel {
    title?: string;
    content?:string;
    imagePath?:string;
    links?:string;
}
