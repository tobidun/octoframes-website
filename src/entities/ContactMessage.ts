import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("contact_messages")
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150 })
  firstName!: string;

  @Column({ type: "varchar", length: 150 })
  lastName!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  country!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  companyType!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "boolean", default: false })
  isRead!: boolean; // Allows admin to mark as read

  @CreateDateColumn()
  createdAt!: Date;
}
