import { Formik } from 'formik';
import { useKeycloak } from '@react-keycloak/web';
import { stepValidation } from './constants/validation';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { type IntakeFormValues } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { Program } from '@/common';
import { Navigate } from 'react-router';
import { Routes } from '@/routes';
import { useProgramFieldData } from '@/hooks';
import IntakeForm from './IntakeForm';
import { Loading } from '@/components';

const FormWrapper = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;
  const {
    formData,
    step,
    handleSubmit,
    saveUpdateForm,
    disabledSteps,
    handleSetStep,
    handleSetErrorSteps,
    handleSetCompletedSteps,
    errorSteps,
    completedSteps,
  } = useIntakeForm();

  const { functions, locations, tools, sections, certificates } =
    useProgramFieldData(Program.ALL);

  const getFieldOptions = (name: string, values: IntakeFormValues) => {
    switch (name) {
      case 'program':
        return Object.values(Program).map((itm) => ({
          label: itm,
          value: itm,
        }));
      case 'roles':
        return sections;

      case 'homeLocation':
        return locations.map((loc: any) => ({
          label: loc.locationName,
          value: loc,
        })) as unknown as { label: string; value: string }[];
      case 'tool':
        return tools.map((tool: any) => ({
          label: tool.fullName,
          value: tool,
        })) as unknown as { label: string; value: string }[];
      case 'certification':
        return certificates.map((cert: any) => ({
          label: cert.name,
          value: cert,
        })) as unknown as { label: string; value: string }[];
      case 'firstChoiceSection':
      case 'secondChoiceSection':
      case 'thirdChoiceSection':
        return sections.map((itm: any) => ({
          label: itm.name,
          value: itm,
          disabled: [
            values.firstChoiceSection,
            values.secondChoiceSection,
            values.thirdChoiceSection,
          ].includes(itm),
        }));
      case 'firstChoiceFunction':
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
        return functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
          disabled: [
            values.firstChoiceFunction,
            values.secondChoiceFunction,
            values.thirdChoiceFunction,
          ].includes(itm),
        })) as unknown as { label: string; value: any }[];

      case 'functions':
        return functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
        })) as unknown as { label: string; value: any }[];

      default:
        return [];
    }
  };

  const initialValues: IntakeFormValues = {
    ...formData?.personnel,
    firstName: tokenParsed?.given_name,
    lastName: tokenParsed?.family_name
      ? tokenParsed?.family_name
      : tokenParsed?.given_name,
    email: tokenParsed?.email,
    program: formData?.personnel?.program,
  };

  if (!tokenParsed) {
    return;
  }

  if (formData?.currentProgram === Program.ALL) {
    return <Navigate to={Routes.MemberProfile} />;
  } else {
    return (
      <>
        {!formData?.personnel ? (
          <Loading />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={stepValidation[step]}
            onSubmit={handleSubmit}
          >
            {({ validateForm, values }) => (
              <IntakeForm
                validateForm={validateForm}
                values={values}
                step={step}
                handleSetErrorSteps={handleSetErrorSteps}
                handleSetCompletedSteps={handleSetCompletedSteps}
                errorSteps={errorSteps}
                completedSteps={completedSteps}
                handleSetStep={handleSetStep}
                saveUpdateForm={saveUpdateForm}
                tabs={formTabs.map((tab) => ({
                  ...tab,
                  sections: tab.sections?.map((section) => ({
                    ...section,
                    fields: section.fields?.map((field) => ({
                      ...field,
                      nestedFields: field.nestedFields?.map((nestedField) => ({
                        ...nestedField,
                        options:
                          nestedField.options?.length === 0
                            ? getFieldOptions(nestedField.name, values)
                            : nestedField.options,
                      })),
                      options:
                        field.options?.length === 0
                          ? getFieldOptions(field.name, values)
                          : field.options,
                    })),
                  })),
                }))}
                disabledSteps={disabledSteps}
              />
            )}
          </Formik>
        )}
      </>
    );
  }
};

export default FormWrapper;
