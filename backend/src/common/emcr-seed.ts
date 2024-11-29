import { faker } from '@faker-js/faker';
import { divisionsAndMinistries } from './const';
import { CreatePersonnelDTO, LocationDTO } from '../personnel';
import { DriverLicense } from './enums/driver-license.enum';
import { FirstAid, Experience } from './enums/emcr';
import { Ministry } from './enums/ministry.enum';
import { Status } from './enums/status.enum';
import { TravelPreference } from './enums/travel-preference.enum';
import { UnionMembership } from './enums/union-membership.enum';
import {
  createTools,
  createCertifications,
  createLanguages,
  availability,
} from './seed-common';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { CreatePersonnelEmcrDTO } from '../emcr/dto';

export const handler = (
  locations: LocationDTO[],
  functions: EmcrFunctionEntity[],
  seededTrainings: EmcrTrainingEntity[],
  tools: ToolsEntity[],
  certs: CertificationEntity[],
): {
  personnelData: CreatePersonnelDTO;
  emcrData: CreatePersonnelEmcrDTO;
} => {
  const status =
    Status[
      faker.helpers.arrayElement([
        Status.ACTIVE,
        Status.INACTIVE,
        Status.PENDING,
      ])
    ];
  const dateApplied = faker.date.past();
  const homeLocation = faker.helpers.arrayElement(locations);
  const workLocation = faker.helpers.arrayElement(locations);
  const divisionAndMinistry = faker.helpers.arrayElement(
    divisionsAndMinistries,
  );
  const emcrData: CreatePersonnelEmcrDTO = {
    dateApplied: dateApplied,
    logisticsNotes: faker.lorem.paragraph(),
    coordinatorNotes: faker.lorem.sentence(),
    firstAidLevel: faker.helpers.arrayElement(Object.values(FirstAid)),
    firstAidExpiry: faker.date.past(),
    psychologicalFirstAid: faker.datatype.boolean({ probability: 0.2 }),
    firstNationExperienceLiving: faker.datatype.boolean({ probability: 0.2 }),
    firstNationExperienceWorking: faker.datatype.boolean({ probability: 0.2 }),
    peccExperience: faker.datatype.boolean({ probability: 0.4 }),
    preocExperience: faker.datatype.boolean({ probability: 0.4 }),
    emergencyExperience: faker.datatype.boolean({ probability: 0.4 }),
    approvedBySupervisor: faker.datatype.boolean({ probability: 0.8 }),
    trainings: seededTrainings,
    dateApproved:
      status !== Status.PENDING
        ? faker.date.between({
            from: dateApplied,
            to: new Date(),
          })
        : undefined,
    status: status,
    experiences:
      status !== Status.PENDING
        ? (experiences(functions) as EmcrExperienceEntity[])
        : [],
    travelPreference: faker.helpers.arrayElement([
      TravelPreference.REMOTE_ONLY,
      TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
      TravelPreference.WILLING_TO_TRAVEL_REGION,
      TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    ]),
  };

  const personnelData: CreatePersonnelDTO = {
    division: divisionAndMinistry.division,
    ministry: Ministry[divisionAndMinistry.ministry],
    homeLocation: homeLocation,
    workLocation: workLocation,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    primaryPhone: faker.string.numeric('##########'),
    secondaryPhone: faker.string.numeric('##########'),
    workPhone: faker.string.numeric('##########'),
    unionMembership: faker.helpers.arrayElement(Object.values(UnionMembership)),
    jobTitle: faker.company.catchPhrase(),
    supervisorEmail: faker.internet.email(),
    supervisorLastName: faker.person.lastName(),
    supervisorFirstName: faker.person.firstName(),
    tools: createTools(tools),
    certifications: createCertifications(certs),
    languages: Array.from(new Set(createLanguages())),
    emergencyContactFirstName: faker.person.firstName(),
    emergencyContactLastName: faker.person.lastName(),
    emergencyContactPhoneNumber: faker.string.numeric('##########'),
    emergencyContactRelationship: faker.lorem.word(),
    driverLicense: Array.from(
      new Set([
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
      ]),
    ),
    availability:
      status !== Status.PENDING ? (availability() as AvailabilityEntity[]) : [],
  };
  return { personnelData, emcrData };
};

const experiences = (functions: EmcrFunctionEntity[]) => {
  const experiences = [];
  for (let i = 0; i < 5; i++) {
    const functionEntity: { id: number; name: string; abbreviation: string } =
      faker.helpers.arrayElement(functions);

    experiences.push({
      functionId: functionEntity.id,
      function: functionEntity,
      experienceType: faker.helpers.arrayElement(Object.values(Experience)),
    });
  }
  const uniqueFunctions = new Set(experiences.map((exp) => exp.functionId));
  const uniqueFunctionsArray = Array.from(uniqueFunctions);

  return uniqueFunctionsArray.map((uniqueId) =>
    experiences.find((exp) => exp.functionId === uniqueId),
  );
};
