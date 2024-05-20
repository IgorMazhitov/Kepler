import { MigrationInterface, QueryRunner } from "typeorm";

export class createWizardStepsQuestions1654873843571 implements MigrationInterface {
  name = 'createWizardStepsQuestions1654873843571'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "wizard" ("title") VALUES ('Sample Wizard')
    `);

    await queryRunner.query(`
      INSERT INTO "step" ("title", "stepNumber", "wizardId") VALUES 
      ('Personal Information', 1, (SELECT id FROM "wizard" WHERE "title" = 'Sample Wizard')),
      ('Preferences', 2, (SELECT id FROM "wizard" WHERE "title" = 'Sample Wizard')),
      ('Feedback', 3, (SELECT id FROM "wizard" WHERE "title" = 'Sample Wizard')),
      ('Confirmation', 4, (SELECT id FROM "wizard" WHERE "title" = 'Sample Wizard'))
    `);

    await queryRunner.query(`
      INSERT INTO "question" ("question", "type", "options", "stepId") VALUES
      ('What is your name?', 'input', NULL, (SELECT id FROM "step" WHERE "title" = 'Personal Information')),
      ('How old are you?', 'numeric', NULL, (SELECT id FROM "step" WHERE "title" = 'Personal Information')),
      ('What is your favorite color?', 'single-choice', ARRAY['Red','Blue','Green','Yellow'], (SELECT id FROM "step" WHERE "title" = 'Preferences')),
      ('Select your hobbies', 'multi-choice', ARRAY['Reading','Traveling','Cooking','Swimming'], (SELECT id FROM "step" WHERE "title" = 'Preferences')),
      ('How satisfied are you with our service?', 'numeric', NULL, (SELECT id FROM "step" WHERE "title" = 'Feedback')),
      ('Would you recommend us to a friend?', 'single-choice', ARRAY['Yes','No'], (SELECT id FROM "step" WHERE "title" = 'Feedback')),
      ('Please confirm your details', 'input', NULL, (SELECT id FROM "step" WHERE "title" = 'Confirmation'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "step"`);
    await queryRunner.query(`DROP TABLE "wizard"`);
  }
}
