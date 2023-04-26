import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TagEntity from './tag.entity';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(payload: TagDto) {
    try {
      const isExistingTag = await this.findByName(payload);
      if (isExistingTag) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Tag already exist',
        });
      }
      const tag = this.tagRepository.create({ ...payload });
      return await this.tagRepository.save(tag);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.getResponse(), error.getStatus());
      }

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByName(payload: TagDto) {
    return await this.tagRepository.findOne({ where: { ...payload } });
  }

  async findAll() {
    return await this.tagRepository.find({});
  }

  async findOne(id: string) {
    return await this.tagRepository.findOne({ where: { id: Number(id) } });
  }

  async update(id: string, payload: TagDto) {
    const { name } = payload;
    const data = await this.tagRepository
      .createQueryBuilder()
      .update(TagEntity)
      .set({ name })
      .where('id = :id', { id })
      .execute();
    return {
      data,
      message: 'Tag updated successfully',
    };
  }

  async delete(id: string) {
    await this.tagRepository
      .createQueryBuilder('tag')
      .delete()
      .from(TagEntity)
      .where('id = :id', { id })
      .execute();

    return {
      data: null,
      message: 'Tag deleted successfully',
    };
  }
}
