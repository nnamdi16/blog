import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the tag',
    example: 'Lifestyle',
    required: true,
    title: 'name',
  })
  @Transform(({ value }) => String(value).toLowerCase().trim())
  name: string;
}
