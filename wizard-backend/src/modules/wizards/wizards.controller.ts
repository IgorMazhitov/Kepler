// src/wizard/wizard.controller.ts
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import Wizard from '../../entities/wizards.entity';
import { WizardService } from './wizards.service';

@Controller('wizard')
export class WizardController {
  constructor(private readonly wizardService: WizardService) {}

  @Get()
  findAll(): Promise<Wizard[]> {
    return this.wizardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wizard> {
    return this.wizardService.findOne(Number(id));
  }

  @Post()
  create(@Body() wizard: Wizard): Promise<Wizard> {
    return this.wizardService.create(wizard);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.wizardService.remove(Number(id));
  }
}
