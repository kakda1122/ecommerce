import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task { 
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed?: boolean;

  @Column({ type: 'datetime', nullable: true })
  completedAt?: Date | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Temporarily remove user relationship to fix database issues
  // @Column({ nullable: true })
  // userId: number;

  // @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE', nullable: true })
  // user: User;
}