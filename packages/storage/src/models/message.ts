import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    date: Date;

  @Column()
    title: string;

  @Column()
    content: string;
}
