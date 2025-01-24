import { useState } from 'react';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import useMemberProfile from '@/hooks/useMemberProfile';
import { Program, Status, Tabs as TabsEnum } from '@/common';
import { DialogUI, Loading, MemberProfileDetails } from '@/components';
import { ProfileMemberHeader } from '@/components/profile/header';
import { MemberAvailabilityTab } from '@/components/tabs/Availability';
import { Tabs as TabIndexes } from '@/common';
import { RecommitmentProfileBanner } from '@/components/profile/banners/RecommitmentProfileBanner';
import { memberData } from '@/hooks/profileData';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { useProgramFieldData } from '@/hooks';
import { RecommitmentFormBase } from '@/components/recommitment';
import { format } from 'date-fns';

const MemberProfile = () => {
  const {
    personnel,
    program,
    recommitmentProgram,
    loading,
    updatePersonnel,
    openRecommitmentForm,
    handleOpenRecommitmentForm,
  } = useMemberProfile();
  const [showEmcrBanner, setShowEmcrBanner] = useState(true);
  const [showBcwsBanner, setShowBcwsBanner] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  const { bcwsRoles, functions } = useProgramFieldData(Program.ALL);

  const handleCloseBanner = (program?: Program) => {
    if (program === Program.ALL || !program) {
      setShowBanner(false);
    } else if (program === Program.BCWS) {
      setShowBcwsBanner(false);
    } else {
      setShowEmcrBanner(false);
    }
  };

  const [activeTab, setActiveTab] = useState('availability');

  const profileData = memberData(personnel);
  const { recommitmentCycle } = useRecommitmentCycle();
  const handleTabChange = (index: string) => {
    if (
      ![TabsEnum.AVAILABILITY, TabsEnum.PROFILE, TabsEnum.TRAINING].includes(
        index as TabsEnum,
      )
    ) {
      setActiveTab(TabsEnum.AVAILABILITY);
    } else {
      setActiveTab(index);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden lg:px-32 xl:px-32 2xl:px-64`}
    >
      <div
        className={`${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'} pt-32`}
      >
        <Tabs value={activeTab} onChange={handleTabChange}>
          {personnel && (
            <ProfileMemberHeader personnel={personnel} currentTab={activeTab} />
          )}

          <div className="bg-white w-full">
            <div className="mx-auto w-auto">
              {personnel && recommitmentCycle && (
                <div className="pt-12 pb-6">
                  <RecommitmentProfileBanner
                    year={recommitmentCycle?.year}
                    endDate={format(recommitmentCycle.endDate, 'MMMM do, yyyy')}
                    personnel={personnel}
                    handleClick={handleOpenRecommitmentForm}
                    handleCloseBanner={handleCloseBanner}
                    showBanner={showBanner}
                    showEmcrBanner={showEmcrBanner}
                    showBcwsBanner={showBcwsBanner}
                  />
                </div>
              )}
              <TabsBody placeholder={undefined}>
                <TabPanel value={TabIndexes.AVAILABILITY}>
                  {personnel && (
                    <MemberAvailabilityTab
                      bcwsRoles={bcwsRoles}
                      functions={functions}
                      personnel={personnel}
                      profileData={profileData}
                      updatePersonnel={updatePersonnel}
                    />
                  )}
                </TabPanel>
                <TabPanel value={TabIndexes.PROFILE}>
                  {personnel && (
                    <MemberProfileDetails
                      profileData={profileData}
                      personnel={personnel}
                      updatePersonnel={updatePersonnel}
                    />
                  )}
                </TabPanel>
              </TabsBody>
            </div>
          </div>
        </Tabs>
      </div>
      {program && personnel && (
        <DialogUI
          open={openRecommitmentForm}
          onClose={updatePersonnel}
          handleOpen={handleOpenRecommitmentForm}
          title={`Confirm Recommitment Status for ${recommitmentProgram === Program.ALL ? 'BCWS and EMCR' : recommitmentProgram?.toUpperCase()}`}
          style={'lg:w-2/3 xl:w-1/2'}
        >
          <RecommitmentFormBase
            program={recommitmentProgram}
            personnel={personnel}
            onClose={handleOpenRecommitmentForm}
          />
        </DialogUI>
      )}
    </div>
  );
};

export default MemberProfile;
