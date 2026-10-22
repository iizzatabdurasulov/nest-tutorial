import { IsDecimal, IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class ProductDto {

    @IsString()
    @MinLength(2)
    title: string

    @IsNumber()
    @IsPositive()
    price: number
}