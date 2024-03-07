import { ArrayMinSize, IsArray, IsNumberString, IsString } from "class-validator"
import { Dish, Meal } from "@modules/dish/model/dish.model"

export class DishDto {
    constructor (dish: Dish, categories: Meal[], tutorial: string) {
        this.id = dish.id
        this.kind = dish.kind
        this.name = dish.name
        this.picture = dish.picture
        this.proteins = dish.proteins
        this.fats = dish.fats
        this.carbohydrates = dish.carbohydrates
        this.recipe = dish.recipe;
        this.tutorial = tutorial;
        this.categories = categories.map(meal => meal.toLocaleString())
        this.calories = dish.fats * 9 + (dish.carbohydrates + dish.proteins) * 4
        this.cookerId = dish.cookerId
    }
    id: number
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
    cookerId: number
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