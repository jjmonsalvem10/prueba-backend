import { IsString, IsNumber, IsPositive, MinLength, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsInt()
  @IsPositive()
  stock: number;
}