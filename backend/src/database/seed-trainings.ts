import { datasource } from './datasource';
import { insertPersonnelTrainingSql, insertTrainingSql } from './queries';


const seedFunction = async () => {
  await datasource.initialize();
  const functions = await datasource.query(`SELECT * FROM public."training"`);
  if (functions.length === 0) {
    await datasource.query(insertTrainingSql);
    return await datasource.query(insertPersonnelTrainingSql);
  }
  return 'Already seeded';
};

seedFunction();
