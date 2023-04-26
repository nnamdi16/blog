import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsDate,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the article',
    example: 'Venus of Merchandise',
    required: true,
    title: 'title',
  })
  @Transform(({ value }) => String(value).toLowerCase().trim())
  title: string;

  @IsDate()
  @ApiProperty({
    description: 'Date of publishing',
    example: '2020-12-20',
    required: true,
    title: 'publishedAt',
  })
  @Transform(({ value }) => new Date(value))
  publishedAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'Article expiration date',
    example: '2020-12-20',
    default: null,
    title: 'expiredAt',
  })
  @Transform(({ value }) => new Date(value))
  expiredAt: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  @ApiProperty({
    description: 'Body of the article',
    example: 'The venus of merchandise started in Germany in a old old tree...',
    required: true,
    title: 'body',
  })
  body: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'List of article authors',
    example: 'Alfred Max',
    required: true,
    title: 'author',
  })
  @Transform(({ value }) => String(value).toLowerCase().trim())
  author: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'List of tags attached to article',
    example: ['Food', 'Clothing', 'Lifestyle'],
    required: true,
    title: 'tags',
  })
  tags: [string];
}

export class UpdateArticleDto extends PickType(ArticleDto, [
  'body',
  'title',
] as const) {}
