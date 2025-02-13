import { BaseModel } from "./BaseModel";

export interface MenuItemModel extends BaseModel {
    link: string;
    name: string;
    orderIndex: number;
    isInternal: boolean;
    childs: MenuItemModel[];
}
