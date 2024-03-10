export enum Meal {
    breakfast = "breakfast",
    lunch = "lunch",
    dinner = "dinner"
}

export interface Cooker {
    id: number
    name: string
}

export interface Dish {
    id: number
    kind: string
    name: string
    picture: string
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    recipe: string
    tutorial?: string
    categories: Meal[]
    cooker: Cooker
}

export interface AmountedDish extends Dish {
    amount: number
}

export interface CreateDishFormData {
    kind: string
    name: string
    proteins: string
    fats: string
    carbohydrates: string
    recipe: string
    tutorial: string
    categories: Meal[]
}