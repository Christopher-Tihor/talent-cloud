import { NestedMenu } from './NestedMenu';
import { MenuButton, Chip, Menu, MenuList, MenuHandler } from '../ui';
import { ExperienceName, FunctionName, Program } from '@/common';
import { classes } from './classes';
import type { BcwsRole, Section } from '@/common/enums/sections.enum';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';
import { DashboardFilterNames } from '@/common';

export const CascadingMenu = ({
  value,
  onChange,
  handleClose,
  label,
  field,
  nestedField,
  nestedValue,
  program,
}: {
  onChange: (name: string, value: string) => void;
  handleClose: (name: string, nestedName: string) => any;
  label: string;
  field: any;
  nestedField: any;
  value?: string;
  nestedValue?: string | BcwsRole;
  program?: Program;
}) => {
  const displayValue = (value: string) => {
    if (value === FunctionName.EMERGENCY_SUPPORT_SERVICES) {
      return 'ESS';
    } else if (value === FunctionName.ADVANCED_PLANNING_UNIT) {
      return 'APU';
    } else {
      return value;
    }
  };

  const renderDisplay = (value: string) => {
    if (field.name === DashboardFilterNames.SECTION) {
      return nestedValue
        ? `${SectionName[value as Section]}: ${BcwsRoleName[nestedValue as BcwsRole]}`
        : `${value}: All`;
    } else {
      return nestedValue
        ? `${displayValue(value)}: ${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
        : `${value}: All`;
    }
  };

  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ itemPress: false, outsidePress: true }}>
        <MenuHandler field={field} id={field.name}>
          {value ? (
            <Chip
              handleClose={() => handleClose(field.name, nestedField.name)}
              name={field.name}
              value={value}
              label={renderDisplay(value)}
            />
          ) : (
            <p className={classes.menu.placeholder}>
              Select {label.toLowerCase()}(s)
            </p>
          )}
          <MenuButton />
        </MenuHandler>
        <MenuList>
          <div className="w-full">
            {field.options?.map(
              (option: { label: string; value: string }, index: number) => (
                <NestedMenu
                  field={field}
                  handleChange={onChange}
                  nestedField={{
                    ...nestedField,
                    options:
                      program === Program.BCWS
                        ? nestedField.options[index]
                        : nestedField.options,
                  }}
                  option={option}
                  key={option.value}
                />
              ),
            )}
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
