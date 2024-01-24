import { Chip, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { classes } from './constants';
import { MenuItemGroupList } from './MenuListGroup';
import { MenuItemList } from './MenuList';
import { MenuButton } from './MenuButton';
import type { ChangeEvent } from 'react';

export const MenuMultiSelect = ({
  field,
  values,
  onChange,

  handleClose,
  handleCloseMultiple,
  label,
}: {
  field: any;
  values: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: (name: string, value: string) => void;
  handleCloseMultiple: (name: string) => void;
  label: string;
}) => {
  const dismiss = { outsidePress: true };
  const getClass = (name: string) => {
    if (name === 'region') {
      return 'w-96 md:w-36 lg:w-52';
    } else {
      return 'p-4 lg:w-[875px] -ml-24';
    }
  };
  return (
    <>
      <label>{label}</label>
      <Menu dismiss={dismiss}>
        <MenuHandler>
          <div className={classes.menu.container}>
            {values?.length ? (
              <div className={classes.menu.chipsContainer}>
                {values?.length > 2 ? (
                  <Chip
                    value={`${values?.length} selected`}
                    color="blue-gray"
                    variant="ghost"
                    className={classes.menu.chip}
                    onClose={() => handleCloseMultiple(field.name)}
                  />
                ) : (
                  values?.map((value: any) => (
                    <Chip
                      key={value}
                      value={value}
                      color="blue-gray"
                      variant="ghost"
                      className={classes.menu.chip}
                      onClose={() => handleClose(field.name, value)}
                    />
                  ))
                )}
              </div>
            ) : (
              <span className={classes.menu.placeholder}>Select {label}(s)</span>
            )}

            <div className={classes.menu.buttonContainer}>
              <MenuButton />
            </div>
          </div>
        </MenuHandler>

        <MenuList placeholder={undefined} className={getClass(field.name)}>
          {field.groupedOptions ? (
            <MenuItemGroupList field={field} values={values} onChange={onChange} />
          ) : (
            <MenuItemList field={field} values={values} onChange={onChange} />
          )}
        </MenuList>
      </Menu>
    </>
  );
};
