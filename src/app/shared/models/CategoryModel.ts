import { CATEGORY_TYPE } from '../../data/Constants/Constants';

export interface CategoryModel {
  id: number;
  displayTitle: string;
  type: CATEGORY_TYPE;
}
