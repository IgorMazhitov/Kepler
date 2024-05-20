import { Module } from '@nestjs/common';
import { WizardService } from './wizards.service';
import { WizardController } from './wizards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Wizard from 'src/entities/wizards.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wizard]),
  ],
  providers: [WizardService],
  controllers: [WizardController]
})
export class WizardModule {}
