import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmissionController } from './form.controller';
import { Form } from '../database/entities/form.entity';
import { FormService } from './form.service';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [PersonnelModule, TypeOrmModule.forFeature([Form])],
  providers: [FormService],
  controllers: [FormSubmissionController],
  exports: [TypeOrmModule],
})
export class FormModule {}
