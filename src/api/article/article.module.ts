import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArticleEntity from './article.entity';
import { ArticleController } from './v1/article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
