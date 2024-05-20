import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Wizard from './wizards.entity';
import { Question } from './questions.entity';

@Entity()
class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  stepNumber: number;

  @ManyToOne(() => Wizard, (wizard) => wizard.steps)
  wizard: Wizard;

  @OneToMany(() => Question, (question) => question.step, { cascade: true })
  questions: Question[];
}

export default Step;