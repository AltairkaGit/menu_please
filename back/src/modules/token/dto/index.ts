import { IsNumber, IsString } from "class-validator";

export class CreateTokenDto {
    @IsNumber()
    userId: number

    @IsString()
    role: string    
}