import type { Classification, Ministry, Status } from '@/common';
import { AvailabilityType, AvailabilityTypeName } from '@/common';
import {
  ExperienceName,
  FunctionName,
  Region,
  WorkLocation,
  Experience,
} from '@/common';
import type { DateRange } from 'react-day-picker';

export enum DashboardFilterNames {
  REGION = 'region',
  LOCATION = 'location',
  NAME = 'name',
  SHOW_INACTIVE = 'showInactive',
  FUNCTION = 'function',
  EXPERIENCE = 'experience',
  AVAILABILITY_TYPE = 'availabilityType',
}

export enum DashboardColumns {
  FUNCTION = 'Function / Experience',
  AVAILABILITY = 'Availability',
  REMOTE = 'Remote Only',
  UNION_MEMBERSHIP = 'Union Membership',
  REGION = 'Region',
  LOCATION = 'Work Location',
  TRAVEL = 'Willingness To Travel',
  MINISTRY = 'Ministry',
  NAME = 'Name',
  STATUS = 'Status',
}

export interface DashboardFields {
  availabilityType: {
    name: string;
    options: { label: AvailabilityTypeName; value: AvailabilityType }[];
  };
  availabilityDates: {
    name: string;
    label: string;
    value: DateRange;
  };
  function: {
    name: string;
    options: FunctionName[];
  };
  location: {
    name: string;
    groupedOptions: {
      label: string;
      options: WorkLocation[];
    }[];
  };
  name: {
    name: string;
  };
  region: {
    name: string;
    options: { label: Region; value: WorkLocation[] }[];
  };
  experience: {
    name: string;
    options: { label: ExperienceName; value: Experience | Experience[] | '' }[];
  };
}

const regionsAndLocations = [
  {
    region: Region.VIC,
    locations: [
      WorkLocation.CAMPBELL_RIVER,
      WorkLocation.COURTENAY,
      WorkLocation.CUMBERLAND,
      WorkLocation.NANAIMO,
      WorkLocation.PORT_ALBERNI,
      WorkLocation.QUALICUM_BEACH,
      WorkLocation.UCLUELET,
    ],
  },
  {
    region: Region.CTL,
    locations: [
      WorkLocation.ENDERBY,
      WorkLocation.KAMLOOPS,
      WorkLocation.KELOWNA,
      WorkLocation.MERRITT,
      WorkLocation.SALMON_ARM,
      WorkLocation.SORRENTO,
      WorkLocation.VERNON,
    ],
  },
  {
    region: Region.HQ,
    locations: [
      WorkLocation.BRENTWOOD_BAY,
      WorkLocation.LANGFORD,
      WorkLocation.ESQUIMALT,
      WorkLocation.SAANICH,
      WorkLocation.SAANICHTON,
      WorkLocation.SIDNEY,
      WorkLocation.VICTORIA,
    ],
  },
  {
    region: Region.NEA,
    locations: [
      WorkLocation.HUNDRED_MILE_HOUSE,
      WorkLocation.HUNDRED_FIFTY_MILE_HOUSE,
      WorkLocation.DAWSON_CREEK,
      WorkLocation.FORT_NELSON,
      WorkLocation.FORT_ST_JOHN,
      WorkLocation.MACKENZIE,
      WorkLocation.PRINCE_GEORGE,
      WorkLocation.QUESNEL,
      WorkLocation.WILLIAMS_LAKE,
    ],
  },
  {
    region: Region.SWE,
    locations: [
      WorkLocation.ABBOTSFORD,
      WorkLocation.BONNINGTON_FALLS,
      WorkLocation.BURNABY,
      WorkLocation.COQUITLAM,
      WorkLocation.LANGLEY,
      WorkLocation.LILLOOET,
      WorkLocation.MAPLE_RIDGE,
      WorkLocation.NEW_WESTMINSTER,
      WorkLocation.NORTH_VANCOUVER,
      WorkLocation.RICHMOND,
      WorkLocation.SURREY,
      WorkLocation.VANCOUVER,
      WorkLocation.WHISTLER,
    ],
  },
  {
    region: Region.NWE,
    locations: [
      WorkLocation.BURNS_LAKE,
      WorkLocation.SMITHERS,
      WorkLocation.TERRACE,
    ],
  },
  {
    region: Region.SEA,
    locations: [
      WorkLocation.CASTLEGAR,
      WorkLocation.CRANBROOK,
      WorkLocation.ELKFORD,
      WorkLocation.KIMBERLY,
      WorkLocation.NELSON,
      WorkLocation.REVELSTOKE,
    ],
  },
];
export const dashboardFilterFields: DashboardFields = {
  name: {
    name: DashboardFilterNames.NAME,
  },
  availabilityType: {
    name: DashboardFilterNames.AVAILABILITY_TYPE,
    options: [
      {
        label: AvailabilityTypeName.AVAILABLE,
        value: AvailabilityType.AVAILABLE,
      },
      {
        label: AvailabilityTypeName.UNAVAILABLE,
        value: AvailabilityType.UNAVAILABLE,
      },
      {
        label: AvailabilityTypeName.DEPLOYED,
        value: AvailabilityType.DEPLOYED,
      },
    ],
  },
  region: {
    name: DashboardFilterNames.REGION,
    options: regionsAndLocations.map((itm) => ({
      label: itm.region,
      value: itm.locations,
    })),
  },
  location: {
    name: DashboardFilterNames.LOCATION,
    groupedOptions: regionsAndLocations.map((itm) => ({
      label: itm.region,
      options: itm.locations,
    })),
  },
  function: {
    name: DashboardFilterNames.FUNCTION,

    options: [
      FunctionName.OPERATIONS,
      FunctionName.EMERGENCY_SUPPORT_SERVICES,
      FunctionName.FIRST_NATIONS,
      FunctionName.FINANCE,
      FunctionName.LIAISON,
      FunctionName.LOGISTICS,
      FunctionName.PLANS,
      FunctionName.ADVANCED_PLANNING_UNIT,
      FunctionName.RECOVERY,
      FunctionName.DIRECTOR,
      FunctionName.GIS,
    ],
  },
  experience: {
    name: DashboardFilterNames.EXPERIENCE,
    options: [
      {
        label: ExperienceName.ALL,
        value: '',
      },
      {
        label: ExperienceName.INTERESTED,
        value: Experience.INTERESTED,
      },
      { label: ExperienceName.EXPERIENCED, value: Experience.EXPERIENCED },
      {
        label: ExperienceName.CHIEF_EXPERIENCED,
        value: Experience.CHIEF_EXPERIENCED,
      },
      {
        label: ExperienceName.OUTSIDE_EXPERIENCED,
        value: Experience.OUTSIDE_EXPERIENCED,
      },
    ],
  },
  availabilityDates: {
    name: 'availabilityDates',
    label: 'Availability Date Range',
    value: { from: new Date(), to: new Date() },
  },
};

export const dashboardToggle = {
  name: DashboardFilterNames.SHOW_INACTIVE,
  label: 'Show Inactive',
};

export interface ExperienceInterface {
  experienceType: Experience;
  functionName: FunctionName;
}
export interface AvailabilityInterface {
  availabilityType: AvailabilityType;
  date: string;
  deploymentCode?: string;
}

export interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  region: string;
  workLocation: string;
  experiences: ExperienceInterface[];
  availability: AvailabilityInterface[];
  status: Status;
  willingToTravel: boolean;
  remoteOnly: boolean;
  classification: string;
  ministry: string;
  applicationDate: Date;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  supervisor: string;
  reviewed: boolean;
  coordinatorNotes?: string;
  logisticsNotes?: string;
}

export interface Availability {
  date: string;
  availabilityType: AvailabilityType;
  deploymentCode?: string;
  id?: string;
}

export interface AvailabilityRange {
  from: string;
  to: string;
  type: AvailabilityType;
  deploymentCode?: string;
}

export interface SchedulerRowItem {
  dayOfMonth: number;
  status: AvailabilityType;
  start?: boolean;
  numDays?: number;
}

export interface DashboardRow {
  [DashboardColumns.NAME]: string;
  [DashboardColumns.REGION]: Region;
  [DashboardColumns.LOCATION]: WorkLocation;
  [DashboardColumns.FUNCTION]: FunctionName;
  [DashboardColumns.AVAILABILITY]: AvailabilityType;
  [DashboardColumns.TRAVEL]: boolean;
  [DashboardColumns.REMOTE]: boolean;
  [DashboardColumns.UNION_MEMBERSHIP]: Classification;
  [DashboardColumns.MINISTRY]: Ministry;
}
export interface DashboardFilters {
  rowsPerPage: number;
  currentPage: number;
  showInactive?: boolean;
  name?: string;
  region?: Region[];
  location?: WorkLocation[];
  function?: FunctionName;
  experience?: Experience;
  availabilityType?: AvailabilityTypeName;
  availabilityDates: DateRange;
}
