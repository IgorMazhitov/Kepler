// src/wizard/wizard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Wizard from '../../entities/wizards.entity';

@Injectable()
export class WizardService {
  constructor(
    @InjectRepository(Wizard)
    private wizardRepository: Repository<Wizard>,
  ) {}

  async findAll(): Promise<Wizard[]> {
    const wizards = await this.wizardRepository.find({
      relations: ['steps', 'steps.questions'],
    });
    return wizards;
  }

  async findOne(id: number): Promise<Wizard> {
    const wizard = await this.wizardRepository.findOne({
      where: { id },
      relations: ['steps', 'steps.questions'],
    });
    return wizard;
  }

  async create(wizard: Wizard): Promise<Wizard> {
    return this.wizardRepository.save(wizard);
  }

  async remove(id: number): Promise<void> {
    await this.wizardRepository.delete(id);
  }
}
