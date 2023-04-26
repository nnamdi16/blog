import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleService } from '../article.service';
import { ApiTags } from '@nestjs/swagger';
import { ArticleDto, UpdateArticleDto } from '../article.dto';

@ApiTags('article')
@Controller('v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createUserDto: ArticleDto) {
    return await this.articleService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateArticleDto,
  ) {
    return await this.articleService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articleService.delete(id);
  }
}
