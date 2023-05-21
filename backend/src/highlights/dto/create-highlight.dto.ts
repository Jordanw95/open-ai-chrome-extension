import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateHighlightDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1500)
  content: string;
}
