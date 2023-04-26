import { BaseEntity } from '../shared/base.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import ArticleEntity from '../article/article.entity';

@Entity({ name: 'tag' })
class TagEntity extends BaseEntity {
  @Column()
  public name: string;

  @ManyToMany(() => ArticleEntity, (articles: ArticleEntity) => articles.tags)
  public articles: ArticleEntity[];
}
export default TagEntity;
