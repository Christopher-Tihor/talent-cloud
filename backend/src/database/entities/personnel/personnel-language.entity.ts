import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PersonnelEntity } from './personnel.entity';
import {
  LanguageLevelType,
  LanguageProficiency,
} from '../../../common/enums/bcws/language.enum';
import { PersonnelLanguagesRO } from '../../../personnel/ro/personnel-languages.ro';

@Entity('personnel_language')
export class LanguageEntity {
  @ManyToOne(() => PersonnelEntity, (p) => p.id, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'personnel_id', referencedColumnName: 'id' })
  personnel: PersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id', type: 'uuid' })
  personnelId: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'language', type: 'varchar', length: 50 })
  language: string;

  @Column({
    name: 'level',
    type: 'enum',
    enum: LanguageProficiency,
    enumName: 'language-proficiency',
  })
  level: LanguageProficiency;

  @Column({
    name: 'level_type',
    type: 'enum',
    enum: LanguageLevelType,
    enumName: 'language-fluency-type',
  })
  type: LanguageLevelType;

  toResponseObject(): PersonnelLanguagesRO {
    return {
      language: this.language,
      level: this.level,
      type: this.type,
    };
  }
  constructor(data?: Partial<LanguageEntity>) {
    Object.assign(this, data);
  }
}
