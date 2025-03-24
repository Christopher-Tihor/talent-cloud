import { Field, useFormikContext } from 'formik';
import type {
  FormFields,
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { handleFilterProgram } from '../utils/helpers';
import { FormSection } from '../components/FormSection';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { format } from 'date-fns';
import clsx from 'clsx';
import { Fragment } from 'react';
import { DriverLicenseName, MinistryName } from '@/common';
import { BcwsRoleName } from '@/common/enums/sections.enum';

const ReviewFields = ({
  fields,
  sectionName,
}: {
  fields: FormFields[];
  sectionName: string;
}) => {
  const { values } = useFormikContext<IntakeFormValues>();

  const getValue = (value: any, name: string) => {
    switch (name) {
      case 'homeLocation':
        return value.name;
      case 'functions':
        return (value as any[])
          .map((itm) => itm?.name)
          .filter(
            (itm) => (itm && itm?.name !== undefined) || (itm && itm?.name !== ''),
          )
          ?.join('; ');
      case 'certification':
        return value ? value?.name : '--';
      case 'expiry':
        return value && format(value, 'yyyy-MM-dd');
      case 'toolProficiency':
        return value ?? '--';
      case 'travelPreferenceEmcr':
      case 'travelPreferenceBcws':
        return value && value.name;
      case 'tool':
        return (value && value.name) || '--';
      case 'firstChoiceFunction':
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
        return value ? value?.name : '--';
      case 'firstChoiceSection':
      case 'secondChoiceSection':
      case 'thirdChoiceSection':
        return value ? value?.name : '--';
      case 'PLANNING':
      case 'LOGISTICS':
      case 'FINANCE_ADMIN':
      case 'OPERATIONS':
      case 'COMMAND':
      case 'AVIATION':
        return (
          (value as any[])
            ?.map((itm) => BcwsRoleName[itm.name as keyof typeof BcwsRoleName])
            ?.join('; ') ?? '--'
        );
      case 'languageProficiency':
        return (
          (value &&
            LanguageProficiencyName[
              value as keyof typeof LanguageProficiencyName
            ]) ||
          '--'
        );
      case 'language':
        return value;
      case 'driverLicense':
        return (
          (value &&
            value.length > 0 &&
            (value as any[])
              .map((itm) => DriverLicenseName[itm as keyof typeof DriverLicenseName])
              .join('; ')) ||
          '--'
        );
      case 'ministry':
        return (value && MinistryName[value as keyof typeof MinistryName]) || '--';

      default:
        return value?.name ? value.name : value ? value : '--';
    }
  };

  return (
    <div
      className={clsx(
        'col-span-2 gap-y-8 grid grid-cols-2',
        ['EMCR CORE Team Sections', 'BCWS CORE Team Sections and Roles'].includes(
          sectionName,
        ) && 'grid grid-cols-3',
      )}
    >
      {fields
        ?.filter((itm) =>
          itm.program && values.program
            ? handleFilterProgram(itm, values.program)
            : itm,
        )
        .map((field: any, index: number) => (
          <Fragment key={field.name + index.toString()}>
            {!field.nestedFields ? (
              <div key={field.name} className={`col-span-${field.colSpan || 1}`}>
                {field.label && <div className="subtext text-sm">{field.label}</div>}
                {field.helperText && (
                  <div className="subtext text-sm">{field.helperText}</div>
                )}
                <div className="text-[#262729]">
                  {/* {values[field.name as ]} */}
                  {getValue(values?.[field.name as keyof typeof values], field.name)}
                </div>
              </div>
            ) : (
              <div className="col-span-2">
                {(values?.[field.name as keyof typeof values] as {}[])?.map(
                  (itm, index) => (
                    <div
                      className={`grid grid-cols-2 pb-8`}
                      key={index.toString() + itm}
                    >
                      {itm &&
                        field.nestedFields?.map((innerField: FormFields) => (
                          <div
                            className="col-span-1 flex flex-col"
                            key={innerField.name}
                          >
                            <div className="subtext text-sm">{innerField.label}</div>
                            <div className="text-[#262729] ">
                              {getValue(
                                itm?.[innerField.name as keyof typeof itm] ?? '',
                                innerField?.name,
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ),
                )}
              </div>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export const Review = ({ sections }: { sections: FormSectionType[] }) => {
  const { values, errors } = useFormikContext<IntakeFormValues>();

  // filter non-form related components
  const ignoreComponents = [
    'emergencyExperienceHeader',
    'emcCoreTeamSectionsHeader',
    'emcrDivider',
    'bcwsCoreTeamSectionsHeader',
    'bcwsDivider',
  ];

  const ignoreFields = [
    'About supervisor',
    'Travel Preferences',
    'bcwsCoreTeamSectionsHeader',
  ];

  const reviewSections = sections?.map((section) => ({
    ...section,
    fields: section.fields
      ?.filter((field) => !ignoreComponents.includes(field.name))
      .filter((itm) => itm !== undefined)
      .filter((itm) => !ignoreFields.includes(itm.name))
      .filter((field) =>
        values.program && field.program
          ? handleFilterProgram(field, values.program?.toString())
          : true,
      ),
  }));

  // add missing sections

  return (
    <>
      <FormSection section={{ name: 'CORE Team Program (Stream) Selection' }}>
        <>
          <div className={`col-span-2`}>
            <div className="subtext text-sm">Program</div>
            <div className="text-[#262729] ">{values.program}</div>
          </div>
          <div className={`col-span-2`}>
            <div className="subtext text-sm">Acknowledgement</div>
            <div className="flex flex-col">
              {values?.acknowledgement?.map((itm: string, index: number) => (
                <div className="text-[#262729] " key={itm + index.toString()}>
                  {itm}
                </div>
              ))}
            </div>
          </div>
        </>
      </FormSection>
      {reviewSections?.map((section, index) => (
        <FormSection
          section={section as FormSectionType}
          key={section.name + index.toString()}
        >
          <>
            {section.segments?.map((segment: FormSectionType, index: number) => (
              <Fragment key={segment.name + index.toString()}>
                <div className="col-span-2">
                  <p className="font-bold">{segment.name}</p>
                </div>
                {segment.fields && (
                  <ReviewFields
                    fields={segment.fields}
                    sectionName={segment.name ?? ''}
                  />
                )}
                {index !== section.segments.length - 1 && (
                  <div className="col-span-2 w-full border border-t-1 border-gray-400"></div>
                )}
              </Fragment>
            ))}
          </>
        </FormSection>
      ))}
      <div className="pb-40">
        <label>
          <Field type="checkbox" name="reviewAck" id="reviewAck" />
          <span className="px-2">
            By submitting this form, I acknowledge that the information provided is
            accurate to the best of my knowledge.
            <span className="text-errorRed">*</span>
          </span>
        </label>
        {errors.reviewAck && (
          <div className="font-normal text-sm text-errorRed">{errors.reviewAck}</div>
        )}
      </div>
    </>
  );
};
