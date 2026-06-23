import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  price: number;

  @Field(() => ID)
  @Type(() => Number)
  @IsInt()
  categoryId: number;
  
}