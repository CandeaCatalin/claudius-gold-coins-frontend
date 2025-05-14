import { BaseModel } from './BaseModel';

export interface EventsModel extends BaseModel {
  id?: string;
  title?: string;
  description?: string;
  image: string;
  links?: string;
}
