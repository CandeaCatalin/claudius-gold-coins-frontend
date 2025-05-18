import {CategoryModel} from "../../shared/models/CategoryModel";
export const CAPTCHA_KEY: string = "6LfUtvoqAAAAAL1n5WeCUx9yr95-Iq1FrqiUKO7H";
export const GOOGLE_CLIENT_ID: string = "103857224071-99vqknp6rnrftkumvp32fkgtvl7pefr6.apps.googleusercontent.com";
export const SessionStorage = {
    jwt_token: "jwt_token",
}

export enum CATEGORY_TYPE{
    MonedaAur = "monede-aur",
    MonedaArgint = "monede-argint",
    MonedaCupru = "monede-cupru",
    BijuterieAur = "bijuterii-aur",
    BijuterieArgint = "bijuterii-aur"
};

export const CATEGORIES: CategoryModel[] = [
    {
        id:1,
        displayTitle: "Monedă de aur",
        type:CATEGORY_TYPE.MonedaAur
    },
    {
        id:2,
        displayTitle: "Monedă de argint",
        type:CATEGORY_TYPE.MonedaArgint
    },
    {
        id:3,
        displayTitle: "Monedă de cupru", 
        type:CATEGORY_TYPE.MonedaCupru
    },
    {
        id:4,
        displayTitle: "Bijuterie de aur",
        type:CATEGORY_TYPE.BijuterieAur
    },
    {
        id:5,
        displayTitle: "Bijuterie de argint",
        type:CATEGORY_TYPE.BijuterieArgint
    }
];