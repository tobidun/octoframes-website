import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("blog_posts")
export class BlogPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ type: "text", nullable: true })
  excerpt!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  coverImage!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  author!: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  readTime!: string;

  @Column({ type: "boolean", default: true })
  published!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
