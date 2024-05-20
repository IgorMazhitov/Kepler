import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Step from './entities/steps.entity';
import { Question } from './entities/questions.entity';
import Wizard from './entities/wizards.entity';
import { createWizardStepsQuestions1654873843571 } from './migrations/1654873843571-createWizardStepsQuestions';
import { StepsModule } from './modules/steps/steps.module';
import { WizardModule } from './modules/wizards/wizards.module';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'kepler',
      password: 'kepler',
      database: 'kepler',
      entities: [Wizard, Step, Question],
      autoLoadEntities: true,
      synchronize: true,
      migrations: [createWizardStepsQuestions1654873843571],
    }),
    TypeOrmModule.forFeature([Wizard, Step, Question]),
    StepsModule,
    WizardModule,
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
