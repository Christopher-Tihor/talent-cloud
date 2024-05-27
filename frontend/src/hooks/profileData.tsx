import { Status } from '@/common';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { Tools } from '@/common/enums/tools.enum';
import { ToolsName, ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { Personnel } from '@/pages/dashboard';
import { datePST, formatPhone } from '@/utils';
import { FireCentreName } from '../common/enums/firecentre.enum';
import type { DriverLicense } from '../common/enums/driver-license.enum';
import { DriverLicenseName } from '../common/enums/driver-license.enum';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export const emcrData = (personnel?: Personnel) => {
  return {
    generalInformation: [
      {
        title: 'Work Location, Region',
        content: personnel?.workLocation?.locationName
          ? `${personnel?.workLocation?.locationName}, ${personnel?.workLocation?.region}`
          : 'Not Listed',
      },
      {
        title: 'Remote Only',
        content: `${personnel?.remoteOnly === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Home Location, Region',
        content: `${personnel?.homeLocation.locationName}, ${personnel?.homeLocation.region}`,
      },
      {
        title: 'Willingness to Travel',
        content: `${personnel?.willingToTravel === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Application Date',
        content: personnel?.dateApplied
          ? datePST(personnel?.dateApplied as Date)
          : '-',
      },
      personnel?.status === Status.PENDING
        ? {
            title: 'ICS Training',
            content: personnel?.icsTraining === true ? 'Completed' : 'Incomplete',
          }
        : {
            title: 'Reviewed Date',
            content: personnel?.dateApproved
              ? datePST(personnel?.dateApproved as Date)
              : '-',
          },
    ],
    contact: [
      {
        title: 'Primary Number',
        content: formatPhone(personnel?.primaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Secondary Number',
        content: formatPhone(personnel?.secondaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Work Phone',
        content: formatPhone(personnel?.workPhone) ?? 'Not Listed',
      },
      { title: 'Email Address', content: personnel?.email },
    ],
    organizational: [
      { title: 'Supervisor First Name', content: personnel?.supervisorFirstName },
      { title: 'Supervisor Last Name', content: personnel?.supervisorLastName },
      { title: 'Supervisor Email', content: personnel?.supervisorEmail ?? '-' },
      { title: 'Ministry', content: personnel?.ministry },
      { title: 'Union Membership', content: personnel?.unionMembership },
      {
        title: 'Supervisor Approval',
        content:
          personnel?.approvedBySupervisor === true ? 'Received' : 'Not Recieved',
      },
    ],
    skills: [],
  };
};

export const bcwsData = (personnel?: Personnel) => {
  const formatDriversLicenses = (driverLicenses: string[]): string => {
    const licensesFormatted = driverLicenses.map(
      (l) => DriverLicenseName[l as keyof typeof DriverLicense],
    );
    return licensesFormatted.join(', ');
  };

  return {
    intakeRequirements:
      personnel?.status === Status.PENDING
        ? [
            {
              title: 'Willingness Statement',
              content:
                personnel?.willingnessStatement === true ? (
                  <span className="flex flex-row items-center space-x-2 text-success">
                    <CheckCircleIcon className="w-6 h-6" /> <span>Received</span>
                  </span>
                ) : (
                  <span className="flex flex-row items-center space-x-2 text-error">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <span>Not yet received</span>
                  </span>
                ),
            },
            {
              title: 'ParQ',
              content:
                personnel?.parQ === true ? (
                  <span className="flex flex-row items-center space-x-2 text-success">
                    <CheckCircleIcon className="w-6 h-6" /> <span>Received</span>
                  </span>
                ) : (
                  <span className="flex flex-row items-center space-x-2 text-error">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <span>Not yet received</span>
                  </span>
                ),
            },
            {
              title: 'TEAMS Orientation',
              content:
                personnel?.orientation === true ? (
                  <span className="flex flex-row items-center space-x-2 text-success">
                    <CheckCircleIcon className="w-6 h-6" /> <span>Completed</span>
                  </span>
                ) : (
                  <span className="flex flex-row items-center space-x-2 text-error">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <span>Incomplete</span>
                  </span>
                ),
            },
          ]
        : undefined,
    generalInformation: [
      {
        title: 'Date Applied',
        content: personnel?.dateApplied
          ? datePST(personnel?.dateApplied as Date, true)
          : '-',
      },
      {
        title: 'Home Location, Fire Centre',
        content: personnel?.homeLocation
          ? `${personnel.homeLocation.locationName}, ${FireCentreName[personnel.homeLocation.fireCentre]}`
          : 'Not Listed',
      },
      {
        title: 'Work Location, Fire Centre',
        content: personnel?.workLocation
          ? `${personnel.workLocation.locationName}, ${FireCentreName[personnel.workLocation.fireCentre]}`
          : 'Not Listed',
      },
      {
        title: 'Remote Only',
        content: `${personnel?.remoteOnly === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Willingness to Travel',
        content: `${personnel?.willingToTravel === true ? 'Yes' : 'No'}`,
      },
      {
        title: 'Purchase Card Holder',
        content:
          personnel?.purchaseCardHolder === true ? (
            <span className="text-success">Yes</span>
          ) : (
            <span className="text-errorRed">No</span>
          ),
      },
      {
        title: "Driver's License",
        content: `${personnel?.driverLicense ? formatDriversLicenses(personnel.driverLicense) : '-'}`,
      },
    ],
    contact: [
      {
        title: 'Primary Number',
        content: formatPhone(personnel?.primaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Secondary Number',
        content: formatPhone(personnel?.secondaryPhone) ?? 'Not Listed',
      },
      {
        title: 'Work Number',
        content: formatPhone(personnel?.workPhone) ?? 'Not Listed',
      },
      { title: 'Govt Email', content: personnel?.email },
      {
        title: 'Emergency Contactee',
        content: `${personnel?.emergencyContactFirstName} ${personnel?.emergencyContactLastName}`,
      },
      {
        title: 'Emergency Phone Number',
        content: formatPhone(personnel?.emergencyContactPhoneNumber) ?? 'Not Listed',
      },
    ],
    organizational: [
      { title: 'Supervisor First Name', content: personnel?.supervisorFirstName },
      { title: 'Supervisor Last Name', content: personnel?.supervisorLastName },
      { title: 'Supervisor Email', content: personnel?.supervisorEmail ?? '-' },
      {
        title: 'Supervisor Approval',
        content:
          personnel?.approvedBySupervisor === true ? (
            <span className="text-success">Received</span>
          ) : (
            <span className="text-errorRed">Not yet Received</span>
          ),
      },
      {
        title: 'Ministry/Division',
        content: `${personnel?.division?.ministry} / ${personnel?.division?.divisionName}`,
      },
      { title: 'Union Membership', content: personnel?.unionMembership },
      { title: 'Paylist', content: personnel?.paylistId },
      {},
      { title: 'Liason First Name', content: personnel?.liaisonFirstName },
      { title: 'Liason Last Name', content: personnel?.liaisonLastName },
      {
        title: 'Liason Phone Number',
        content: formatPhone(personnel?.liaisonPhoneNumber) ?? 'Not Listed',
      },
      { title: 'Liason Email', content: personnel?.liaisonEmail ?? '-' },
    ],
    skills: [
      {
        title: 'Languages',
        header: 'Language',
        subheader: 'Proficiency Level',
        itms: personnel?.languages?.map((l) => ({
          label: l.language,
          value: LanguageProficiencyName[l.level],
        })),
      },
      {
        title: 'Tools',
        header: 'Skill',
        subheader: 'Proficiency Level',
        itms: personnel?.tools?.map((t) => ({
          label: ToolsName[t.tool as keyof typeof Tools],
          value: ToolsProficiencyName[t.proficiencyLevel],
        })),
      },
      {
        title: 'Certifications',
        header: 'Name',
        subheader: 'Expiry Date',
        itms: personnel?.certifications?.map((c) => ({
          label: c.name,
          value: c.expiry,
        })),
      },
    ],
  };
};
