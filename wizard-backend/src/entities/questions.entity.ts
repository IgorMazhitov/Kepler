export enum QuestionType {
  INPUT = 'input',
  MULTI_CHOICE = 'multi-choice',
  SINGLE_CHOICE = 'single-choice',
  NUMERIC = 'numeric',
}

import Step from 'src/entities/steps.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column('text', { array: true, nullable: true })
  options: string[];

  @ManyToOne(() => Step, (step) => step.questions)
  step: Step;
}
