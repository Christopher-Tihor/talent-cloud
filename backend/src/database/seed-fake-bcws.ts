import { datasource } from './datasource';
import { BcwsPersonnelEntity } from './entities/bcws';
import { handler as dataHandler } from '../common/bcws-seed';
import { PersonnelEntity } from './entities/personnel/personnel.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locations = await datasource.query('SELECT * FROM location');
  const tools = await datasource.query('SELECT * FROM tool');
  const certs = await datasource.query('SELECT * FROM certification');
  const roles = await datasource.query('SELECT * FROM bcws_role');
  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);

  try {
    const { personnelData, bcwsData } = dataHandler(
      locations,
      roles,
      tools,
      certs,
    );

    const person = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'bcws-coordinator@gov.bc.ca',
          supervisorEmail: 'supervisor@gov.bc.ca',
        }),
      ),
    );

    bcwsData.personnelId = person.id;
    await bcwsPersonnelRepo.save(
      bcwsPersonnelRepo.create(
        new BcwsPersonnelEntity({ ...bcwsData, personnelId: person.id }),
      ),
    );

    for (let i = 0; i < 50; i++) {
      const { personnelData, bcwsData } = dataHandler(
        locations,
        roles,
        tools,
        certs,
      );

      const person = await personnelRepo.save(
        personnelRepo.create(new PersonnelEntity(personnelData)),
      );

      bcwsData.personnelId = person.id;
      await bcwsPersonnelRepo.save(
        bcwsPersonnelRepo.create(new BcwsPersonnelEntity(bcwsData)),
      );
    }

    console.log('...complete...');

    await datasource.destroy();
    return 'success';
  } catch (e) {
    console.log(e);
    console.log('Seeder failed.');
    return 'failure';
  }
};

handler();
