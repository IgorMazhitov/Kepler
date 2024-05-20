import Step from 'src/entities/steps.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export default class Wizard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Step, (step) => step.wizard, { cascade: true })
  steps: Step[];
}