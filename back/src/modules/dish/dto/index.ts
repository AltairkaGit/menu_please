import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsNumberString, IsString } from "class-validator"
import { Dish, Meal } from "@modules/dish/model/dish.model"

export class DishDto {
    constructor (dish: Dish, categories: Meal[], tutorials?: string[]) {
        this.id = dish.id
        this.name = dish.name
        this.picture = dish.picture
        this.proteins = dish.proteins
        this.fats = dish.fats
        this.carbohydrates = dish.carbohydrates
        this.recipe = dish.recipe;
        this.tutorials = tutorials;
        this.categories = categories.map(meal => meal.toLocaleString())
        this.calories = dish.fats * 9 + (dish.carbohydrates + dish.proteins) * 4
    }
    id: number
    name: string
    picture: string
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    recipe: string
    tutorials: string[] | undefined
    categories: string[]
}

export class CreateDishFormDto {
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
    
    tutorials?: string[]

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    categories: Meal[]
}

export class UpdateDishGeneralDto {
    @IsNumber()
    id: number

    @IsString()
    picture: string

    @IsString()
    name: string

    @IsNumber()
    proteins: number

    @IsNumber()
    fats: number

    @IsNumber()
    carbohydrates: number
}

export class UpdateDishRecipeDto {
    @IsNumber()
    id: number

    @IsString()
    recipe: string
}

export class AddDishTutorialDto {
    @IsNumber()
    id: number

    @IsString()
    url: string
}

export class RemoveDishTutorialDto {
    @IsNumber()
    id: number

    @IsString()
    url: string
}

export class AddDishCategoryDto {
    @IsNumber()
    id: number

    @IsString()
    category: Meal
}

export class RemoveDishCategoryDto {
    @IsNumber()
    id: number

    @IsString()
    category: Meal
}

export class DeleteDishDto {
    @IsNumber()
    id: number
}