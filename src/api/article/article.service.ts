import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ArticleEntity from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from './article.dto';
import { sendRequestToAPI } from '../shared/util';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(createArticle: ArticleDto) {
    try {
      const { title, publishedAt, expiredAt, body, author, tags } =
        createArticle;
      const isExistingArticle = await this.findByNameAndAuthor({
        author,
        title,
      });
      if (isExistingArticle) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Article already exist',
        });
      }
      const name = author.split(' ').length > 1 ? author.split(' ')[0] : author;
      const { age } = await sendRequestToAPI(
        `https://api.agify.io/?name=${name}`,
        null,
        null,
      );

      const article = this.articleRepository.create({
        title,
        publishedAt,
        expiredAt,
        body,
        author,
        tags: [],
        authorAge: age,
      });
      return await this.articleRepository.save(article);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.getResponse(), error.getStatus());
      }

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByNameAndAuthor(payload: Pick<ArticleDto, 'author' | 'title'>) {
    return await this.articleRepository.findOne({ where: { ...payload } });
  }
  async findAll() {
    return await this.articleRepository.find({});
  }

  async findOne(id: string) {
    return await this.articleRepository.findOne({ where: { id: Number(id) } });
  }

  async update(id: string, payload: Partial<ArticleDto>) {
    const { title, body } = payload;
    const data = await this.articleRepository
      .createQueryBuilder()
      .update(ArticleEntity)
      .set({ title, body })
      .where('id = :id', { id })
      .execute();

    return {
      data,
      message: 'Article updated successfully',
    };
  }

  async delete(id: string) {
    await this.articleRepository
      .createQueryBuilder('users')
      .delete()
      .from(ArticleEntity)
      .where('id = :id', { id })
      .execute();

    return {
      data: null,
      message: 'Article deleted successfully',
    };
  }
}
