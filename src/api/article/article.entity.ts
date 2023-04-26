import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import TagEntity from '../tag/tag.entity';

@Entity({ name: 'article' })
class ArticleEntity extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public author: string;

  @Column({ name: 'author_age' })
  public authorAge: string;

  @Column({ type: 'datetime', name: 'published_at' })
  public publishedAt: Date;

  @Column({ type: 'datetime', name: 'expired_at', default: null })
  public expiredAt: Date;

  @Column({ length: 5000 })
  public body: string;

  @ManyToMany(() => TagEntity, (tags: TagEntity) => tags.articles, {
    eager: true,
  })
  @JoinTable({
    name: 'article_tags',
    joinColumns: [{ name: 'article_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'tag_id', referencedColumnName: 'id' }],
  })
  public tags: TagEntity[];
}
export default ArticleEntity;
