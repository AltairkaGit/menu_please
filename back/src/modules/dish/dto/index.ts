import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsNumberString, IsString } from "class-validator"
import { Meal } from "@modules/dish/model/dish.model"

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
    
    // @IsArray()
    // @IsString({ each: true })
    // @ArrayMinSize(1)
    // tutorials: string[]

    // @IsEnum(Meal)
    // @IsString({ each: true })
    // @ArrayMinSize(1)
    // categories: Meal[]
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

export class DeleteDish {
    @IsNumber()
    id: number
}