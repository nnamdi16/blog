import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from '../tag.service';
import { TagDto } from '../tag.dto';

@ApiTags('tag')
@Controller('v1/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() payload: TagDto) {
    return await this.tagService.create(payload);
  }

  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: TagDto) {
    return await this.tagService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
