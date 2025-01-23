import { Switch } from '@headlessui/react';

import { Fragment } from 'react';
import { Tooltip } from '../ui';

export const Toggle = ({
  value,
  handleToggle,
  label,
  disabled,
}: {
  value: boolean;
  handleToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}) => {
  return (
    
      <>
      {label && <p className="label px-4">{label}</p>}
      <Tooltip content="During the recommitment period no member status may be changed"  placement={'bottom-right'}>
      <Switch
        checked={value}
        onChange={handleToggle}
        name={'showInactive'}
        defaultChecked={false}
        as={Fragment}
        disabled={disabled}
      >
        {({ checked }) => (
          <button
            id={label}
            aria-label="toggle switch"
            className={`${
              !checked || disabled ?  'bg-gray-200':'bg-backgroundBlue'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{'showInactive'}</span>
            <span
              className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
        )}
      </Switch>
      </Tooltip>
      </>

  );
};
