import type { MouseEvent } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Breadcrumbs,
  Dialog,
  DialogHeader,
  Button,
  DialogBody,
} from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import usePersonnel from '@/hooks/usePersonnel';
import useFunctions from '@/hooks/useFunctions';
import useAvailability from '@/hooks/useAvailability';
import { useRole } from '@/hooks';
import Scheduler from './Scheduler';
import SchedulerPopUp from './SchedulerPopUp';
import type {
  AvailabilityRange,
  BcwsCertification,
  BcwsLanguages,
  BcwsPersonnelTool,
  ExperienceInterface,
} from '../dashboard';
import { ProfileEditForm } from './ProfileEditForm/ProfileEditForm';
import { Status, type AvailabilityType, Role } from '@/common';
import ProfileFunctions from './ProfileFunctions';
import ProfileNotes from './ProfileNotes';
import { EditNotes } from './EditNotes';
import { DialogUI } from '@/components';

import { ProfileFunctionEdit } from './ProfileFunctionEdit';
import { Routes } from '@/routes';

import { SectionsAndRoles } from './SectionsAndRoles';
import { SkillsAndCertifications } from './SkillsAndCertifications';
import { Route } from '@/providers';
import { NewApplicantBanner } from './NewApplicantBanner';
import { Toggle } from '@/components/toggle/Toggle';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { ProfileEditSkills } from './ProfileEditSkills';
import { ProfileEditRoles } from './ProfileEditRoles';
import type { Section } from '../../common/enums/sections.enum';
import { ReviewApplicant } from './ReviewApplicant';

const Profile = () => {
  const { role, route } = useRole();

  const { personnelId } = useParams() as { personnelId: string };

  const { personnel, updatePersonnel, profileData } = usePersonnel({
    personnelId,
    route,
  });

  const { generalInformation, contact, organizational, skills, intakeRequirements } =
    profileData;

  const { availability, getAvailability, saveAvailability } = useAvailability({
    personnelId,
  });

  const { functions, bcwsRoles } = useFunctions(route);

  const [openEditNotes, setOpenEditNotes] = useState(false);
  const [openEditCoordinatorNotes, setOpenEditCoordinatorNotes] = useState(false);
  const [openEditProfilePopUp, setOpenEditProfilePopUp] = useState(false);
  const [openEditFunctionsPopUp, setOpenEditFunctionsPopUp] = useState(false);
  const [openEditRolesPopUp, setOpenEditRolesPopUp] = useState(false);
  const [openEditSkillsPopUp, setOpenEditSkillsPopUp] = useState(false);

  const handleOpenEditNotes = () => {
    setOpenEditNotes(!openEditNotes);
  };

  const handleOpenEditCoordinatorNotes = () => {
    setOpenEditCoordinatorNotes(!openEditCoordinatorNotes);
  };

  const handleOpenEditSkills = () => {
    setOpenEditSkillsPopUp(!openEditSkillsPopUp);
  };

  const handleOpenEditRoles = () => {
    setOpenEditRolesPopUp(!openEditRolesPopUp);
  };

  const [availabilityQuery, setAvailabilityQuery] = useState<{
    from: string;
    to: string;
  }>({
    from: dayjs().startOf('month').format('YYYY-MM-DD'),
    to: dayjs().endOf('month').format('YYYY-MM-DD'),
  });
  const [schedulerDialogOpen, setSchedulerDialogOpen] = useState(false);
  const handleSchedulerOpen = () => setSchedulerDialogOpen(!schedulerDialogOpen);
  const [editCell, setEditCell] = useState<{
    from?: string;
    to?: string;
    availabilityType?: AvailabilityType;
    deploymentCode?: string;
  }>();

  const onChangeAvailabilityQuery = (from: string, to: string) => {
    setAvailabilityQuery({ from, to });
    getAvailability(from, to);
  };

  const saveAvailabilityDates = async (dates: AvailabilityRange) => {
    await saveAvailability(dates);
    setSchedulerDialogOpen(false);
    getAvailability(availabilityQuery.from, availabilityQuery.to);
  };

  const savePersonnelExperiences = async (experiences: ExperienceInterface[]) => {
    await updatePersonnel({ experiences });
    setOpenEditFunctionsPopUp(false);
  };

  const handleOpenEditProfilePopUp = (e: MouseEvent<HTMLElement>) => {
    if (openEditProfilePopUp === false) {
      e.stopPropagation();
    }
    setOpenEditProfilePopUp(!openEditProfilePopUp);
  };
  const [openReviewApplicant, setOpenReviewApplicant] = useState(false);
  const handleOpenReviewApplicant = () => {
    setOpenReviewApplicant(!openReviewApplicant);
  };
  const openSchedulerDialog = (
    from?: string,
    to?: string,
    availabilityType?: AvailabilityType,
    deploymentCode?: string,
  ) => {
    if (!schedulerDialogOpen) {
      // Account for parameters
      setEditCell({ from, to, availabilityType, deploymentCode });
    } else {
      setEditCell(undefined);
    }
    setSchedulerDialogOpen(!schedulerDialogOpen);
  };
  const handleOpenEditFunctionsPopUp = (e: MouseEvent<HTMLElement>) => {
    if (openEditFunctionsPopUp === false) {
      e.stopPropagation();
    }
    setOpenEditFunctionsPopUp(!openEditFunctionsPopUp);
  };
  const reviewItems =
    route === Route.EMCR
      ? [
          {
            key: 'Supervisor Approval',
            value: personnel?.approvedBySupervisor,
          },
          {
            key: 'Completed ICS Training',
            value: personnel?.icsTraining,
          },
        ]
      : [
          {
            key: 'Willingness Statement',
            value: personnel?.willingnessStatement,
          },
          {
            key: 'Signed ParQ Questionnaire',
            value: personnel?.parQ,
          },
          {
            key: 'Supervisor Approval',
            value: personnel?.approvedBySupervisor,
          },
          {
            key: 'TEAMS Orientation',
            value: personnel?.orientation,
          },
        ];

  return (
    <div
      className={`min-h-screen pt-24  ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} w-full overflow-x-hidden`}
    >
      <Breadcrumbs
        placeholder={'Breadcrumbs'}
        className={`md:px-12 xl:px-24 2xl:px-64 max-w-full ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'}`}
      >
        <Link to={Routes.Dashboard} className="text-linkBlue">
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="h-4 w-4 fill-[#003366]" />
            <span className="pl-2 underline decoration-solid">
              Personnel (Dashboard)
            </span>
          </div>
        </Link>
        {personnel && (
          <span className="font-bold text-black">
            {personnel.firstName} {personnel.lastName}
          </span>
        )}
      </Breadcrumbs>

      {personnel && (
        <div>
          <div className="pt-12 md:px-12 xl:px-24 2xl:px-64 mx-auto">
            <ProfileHeader personnel={personnel} route={route} role={role} />
          </div>
          <div className="bg-white w-full">
            <div className="md:px-12 xl:px-24 2xl:px-64 mx-auto w-auto">
              <div className="xl:mr-12">
                {personnel.status === Status.PENDING && (
                  <NewApplicantBanner
                    reviewItems={reviewItems}
                    route={route}
                    handleOpenReviewApplicant={handleOpenReviewApplicant}
                  />
                )}
              </div>

              <div className=" pb-12 bg-white w-full pt-4  ">
                <div className="flex flex-row justify-start md:items-center md:mr-12 lg:ml-48">
                  {role === Role.COORDINATOR &&
                    personnel.status !== Status.PENDING && (
                      <Toggle
                        value={personnel.status === Status.ACTIVE}
                        handleToggle={(checked: boolean) =>
                          updatePersonnel({
                            status: checked ? Status.ACTIVE : Status.INACTIVE,
                          })
                        }
                        label={`Switch to ${personnel.status === Status.ACTIVE ? 'Inactive' : 'Active'}`}
                      />
                    )}
                </div>
              </div>

              <ProfileDetails
                role={role}
                openEditProfilePopUp={handleOpenEditProfilePopUp}
                intakeRequirements={intakeRequirements}
                generalInformation={generalInformation}
                contact={contact}
                organizational={organizational}
                pending={personnel.status === Status.PENDING}
              />
              {route === Route.EMCR && (
                <ProfileFunctions
                  functions={functions}
                  personnel={personnel}
                  openEditFunctionsPopUp={handleOpenEditFunctionsPopUp}
                />
              )}
              <Scheduler
                name={personnel?.firstName}
                availability={availability}
                onChangeAvailabilityDates={onChangeAvailabilityQuery}
                openSchedulerDialog={openSchedulerDialog}
              />

              {route === Route.BCWS && (
                <>
                  <SectionsAndRoles
                    roles={personnel?.roles ?? []}
                    firstChoiceSection={personnel.firstChoiceSection}
                    secondChoiceSection={personnel.secondChoiceSection}
                    onClick={handleOpenEditRoles}
                  />
                  <SkillsAndCertifications
                    skills={skills ?? []}
                    onClick={handleOpenEditSkills}
                  />{' '}
                </>
              )}

              <ProfileNotes
                role={role}
                personnel={personnel}
                handleOpenEditNotes={handleOpenEditNotes}
                handleOpenEditCoordinatorNotes={handleOpenEditCoordinatorNotes}
              />
            </div>

            {/* Edit Profile */}
            <DialogUI
              open={openEditProfilePopUp}
              onClose={updatePersonnel}
              handleOpen={handleOpenEditProfilePopUp}
              title={'Edit Member Details'}
              style={'lg:w-2/3 xl:w-1/2'}
            >
              <ProfileEditForm
                personnel={personnel}
                open={openEditProfilePopUp}
                handleClose={handleOpenEditProfilePopUp}
                updatePersonnel={updatePersonnel}
                route={route}
              />
            </DialogUI>

            {/* Functions */}
            <DialogUI
              open={openEditFunctionsPopUp}
              onClose={() => {}}
              handleOpen={handleOpenEditFunctionsPopUp}
              title={'Edit Experience Levels'}
              style={'lg:w-2/3 xl:w-1/2'}
            >
              <ProfileFunctionEdit
                personnel={personnel}
                open={openEditFunctionsPopUp}
                allFunctions={functions}
                handleOpenEditFunctionsPopUp={handleOpenEditFunctionsPopUp}
                updatePersonnelExperiences={savePersonnelExperiences}
              />
            </DialogUI>

            {/* Roles */}
            <DialogUI
              open={openEditRolesPopUp}
              onClose={handleOpenEditRoles}
              handleOpen={handleOpenEditRoles}
              title="Edit Roles"
              style="w-5/6"
            >
              <ProfileEditRoles
                allRoles={bcwsRoles}
                originalRoles={personnel.roles || []}
                sectionChoices={{
                  firstChoiceSection: personnel.firstChoiceSection,
                  secondChoiceSection: personnel.secondChoiceSection,
                }}
                handleClose={handleOpenEditRoles}
                handleSave={(roles: {
                  newRoles: { roleId: number; expLevel: string }[];
                  firstChoiceSection?: Section;
                  secondChoiceSection?: Section | null;
                }) => {
                  updatePersonnel({
                    firstChoiceSection: roles.firstChoiceSection,
                    secondChoiceSection: roles.secondChoiceSection,
                    roles: roles.newRoles,
                  });
                  setOpenEditRolesPopUp(false);
                }}
              />
            </DialogUI>

            {/* Skills and Certs */}
            <DialogUI
              open={openEditSkillsPopUp}
              onClose={handleOpenEditSkills}
              handleOpen={handleOpenEditSkills}
              title="Edit Skills & Certifications"
              style="w-5/6"
            >
              <ProfileEditSkills
                originalLanguages={personnel.languages || []}
                originalTools={personnel.tools || []}
                originalCerts={personnel.certifications || []}
                handleClose={handleOpenEditSkills}
                handleSave={(skills: {
                  newLanguages: BcwsLanguages[];
                  newTools: BcwsPersonnelTool[];
                  newCertifications: BcwsCertification[];
                }) => {
                  updatePersonnel({
                    languages: skills.newLanguages,
                    tools: skills.newTools,
                    certifications: skills.newCertifications,
                  });
                  setOpenEditSkillsPopUp(false);
                }}
              />
            </DialogUI>

            {/* Notes */}
            <DialogUI
              open={openEditNotes}
              onClose={handleOpenEditNotes}
              handleOpen={handleOpenEditNotes}
              title={'Edit Notes'}
              style={'lg:w-2/3 xl:w-1/2'}
            >
              <EditNotes
                name={'logisticsNotes'}
                label="Notes"
                notes={{ logisticsNotes: personnel?.logisticsNotes ?? '' }}
                onSubmit={updatePersonnel}
                handleClose={handleOpenEditNotes}
              />
            </DialogUI>

            {/* Coordinator Notes */}
            <DialogUI
              open={openEditCoordinatorNotes}
              onClose={handleOpenEditCoordinatorNotes}
              handleOpen={handleOpenEditCoordinatorNotes}
              title={'Edit Coordinator Notes'}
              style={'lg:w-2/3 xl:w-1/2'}
            >
              <EditNotes
                name={'coordinatorNotes'}
                label="Coordinator Notes"
                notes={{ coordinatorNotes: personnel?.coordinatorNotes ?? '' }}
                onSubmit={updatePersonnel}
                handleClose={handleOpenEditCoordinatorNotes}
              />
            </DialogUI>
            <DialogUI
              open={openReviewApplicant}
              onClose={handleOpenReviewApplicant}
              handleOpen={handleOpenReviewApplicant}
              title={'Confirm Review'}
              style={'w-3/4 lg:w-1/3 xl:w-1/4'}
            >
              <ReviewApplicant
                onClose={handleOpenReviewApplicant}
                onClick={() => {
                  updatePersonnel({
                    status: Status.ACTIVE,
                    dateApproved: dayjs(new Date()),
                  });
                  handleOpenReviewApplicant();
                }}
              />
            </DialogUI>

            {/* Scheduler */}
            <Dialog
              open={schedulerDialogOpen}
              handler={handleSchedulerOpen}
              placeholder={''}
              size="md"
            >
              <DialogHeader
                placeholder={''}
                className="flex flex-row align-middle bg-grayBackground"
              >
                <h4 className="grow font-bold">
                  {editCell?.availabilityType
                    ? 'Edit Availability'
                    : 'Add Availability'}
                </h4>
                <Button
                  placeholder={''}
                  variant="text"
                  className="text-sm"
                  onClick={() => setSchedulerDialogOpen(false)}
                >
                  Cancel
                </Button>
              </DialogHeader>
              <DialogBody placeholder={''}>
                <SchedulerPopUp
                  editedFrom={editCell?.from}
                  editedTo={editCell?.to}
                  editedAvailabilityType={editCell?.availabilityType}
                  editedDeploymentCode={editCell?.deploymentCode}
                  editMode={!!editCell?.availabilityType}
                  onSave={saveAvailabilityDates}
                />
              </DialogBody>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
