import type {
  AvailabilityType,
  AvailabilityTypeName,
  Classification,
  Experience,
  Ministry,
  Region,
  Status,
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

export interface FunctionType {
  name: string;
  id: number;
  abbreviation: string;
}

export const dashboardToggle = {
  name: DashboardFilterNames.SHOW_INACTIVE,
  label: 'Show Inactive',
};
export interface Location {
  id: number;
  locationName: string;
  region: Region;
}

export interface ExperienceInterface {
  experienceType: Experience;
  functionName: string;
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
  workLocation: Location;
  homeLocation: Location;
  experiences?: ExperienceInterface[];
  availability?: AvailabilityInterface[];
  status: Status;
  willingToTravel: boolean;
  remoteOnly: boolean;
  classification: string;
  ministry: string;
  applicationDate?: Date;
  primaryPhone: string;
  secondaryPhone: string;
  workPhone: string;
  email: string;
  supervisor: string;
  reviewed: boolean;
  coordinatorNotes?: string;
  logisticsNotes?: string;
  dateJoined: Date;
}

export interface Availability {
  date: string;
  availabilityType: AvailabilityType;
  deploymentCode?: string;
  id?: string;
  actualStartDate?: string;
  actualEndDate?: string;
}

export interface AvailabilityRange {
  from: string;
  to: string;
  type: AvailabilityType;
  deploymentCode?: string;
  removeFrom?: string;
  removeTo?: string;
}

export interface SchedulerRowItem {
  date: string;
  status: AvailabilityType;
  start?: boolean;
  numDays?: number;
  actualStart?: string;
  actualEnd?: string;
}

export interface DashboardRow {
  [DashboardColumns.NAME]: string;
  [DashboardColumns.REGION]: Region;
  [DashboardColumns.LOCATION]: string;
  [DashboardColumns.FUNCTION]: string;
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
  region?: string[];
  location?: string[];
  function?: string;
  experience?: Experience;
  availabilityType?: AvailabilityTypeName;
  availabilityDates: DateRange;
}
