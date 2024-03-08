import { ArrayMinSize, IsArray, IsNumberString, IsString } from "class-validator"
import { Meal } from "@modules/dish/model/dish.model"

export class CookerDto {
    constructor(cooker: {id?: number, username: string}) {
        this.id = cooker.id;
        this.name = cooker.username;
    }
    id?: number
    name: string
}

export class DishDto {
    constructor(
        dish: {id?: number, kind: string, name: string, picture: string, proteins: number, fats: number, carbohydrates: number, recipe: string}, 
        categories: Meal[], 
        tutorial: string, 
        cooker: {id?: number, username: string}
    ) {
        this.id = dish.id;
        this.kind = dish.kind;
        this.name = dish.name;
        this.picture = dish.picture;
        this.proteins = dish.proteins;
        this.fats = dish.fats;
        this.carbohydrates = dish.carbohydrates;
        this.recipe = dish.recipe;
        this.tutorial = tutorial;
        this.categories = categories.map(meal => meal.toLocaleString());
        this.calories = dish.fats * 9 + (dish.carbohydrates + dish.proteins) * 4;
        this.cooker = new CookerDto(cooker);
    }
    id?: number
    kind: string
    name: string
    picture: string
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    recipe: string
    tutorial?: string | undefined
    categories: string[]
    cooker: CookerDto
}

export class AmountedDishDto extends DishDto {
    constructor(
        dish: {id?: number, kind: string, name: string, picture: string, proteins: number, fats: number, carbohydrates: number, recipe: string}, 
        categories: Meal[], 
        tutorial: string, 
        cooker: {id?: number, username: string},
        amount = 1
    ) {
        super(dish, categories, tutorial, cooker);
        this.amount = amount;
    }
    amount: number
}

export class CreateDishFormDto {
    @IsString()
    kind: string

    @IsString()
    name: string

    @IsNumberString()
    proteins: string

    @IsNumberString()
    fats: string

    @IsNumberString()
    carbohydrates: string

    @IsString()
    recipe: string
    
    tutorial: string

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    categories: Meal[]
}