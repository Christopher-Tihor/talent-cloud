import { classes } from './classes';
import { Checkbox } from '../ui/Checkbox';
import { Menu, MenuButton, MenuChips, MenuHandler, MenuList } from '../ui';
import type { FireCentre } from '@/common/enums/firecentre.enum';
import { FireCentreName } from '@/common/enums/firecentre.enum';
import { MenuItem } from '@material-tailwind/react';
import type { FieldInterface, Option } from '../table';

export const MultiSelect = ({
  field,
  values,
  label,
  handleChange,
  handleClose,
  handleCloseMany,
  maxChips,
}: {
  field: FieldInterface;
  values: string[];
  handleChange: (name: string, values: string) => void;
  label: string;
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
  maxChips: number;
}) => {
  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ outsidePress: true, itemPress: false }}>
        <MenuHandler field={field} id={field.name}>
          <MenuChips
            chips={
              field.name === 'fireCentre'
                ? values.map((itm) => ({
                    value: itm,
                    label: FireCentreName[itm as FireCentre],
                  }))
                : values?.map((itm) => ({
                    label: itm,
                    value: itm,
                  })) || []
            }
            placeholder={field.placeholder ?? ''}
            handleClose={handleClose}
            handleCloseMany={handleCloseMany}
            name={field.name}
            maxChips={maxChips}
          />
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          {(field.options as Option[])?.map((option: Option) => (
            <MenuItem key={option.value}>
              <label className={classes.menu.listItem} htmlFor={label}>
                <Checkbox
                  id={option.label}
                  onChange={() =>
                    values?.includes(option.value)
                      ? handleClose(field.name, option.value)
                      : handleChange(field.name, option.value)
                  }
                  checked={values?.includes(option.value)}
                  name={field.name}
                  value={option.value}
                />
                {option.label}
              </label>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
