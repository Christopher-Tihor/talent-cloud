import React from 'react';
import { setTableDataStyle } from './utils';
import { StatusName } from '../../common';
import { DashboardRow } from '../../common/interface';

export const TableBody = ({ pageData }: { pageData: DashboardRow[] }) => {
  return (
    <tbody className="h-full  overflow-x-auto">
      {pageData?.map((itm: DashboardRow, index: number) => (
        <tr
          key={`${itm.name + index.toString}`}
          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
        >
          {Object.values(itm).map((itm: string, index: number) => (
            <td key={`${itm + index.toString()}`} className={setTableDataStyle(itm)}>
              {Object.keys(StatusName).includes(itm) ? (
                <div
                  className={[
                    'rounded-full border  py-2 my-2 px-4 text-center text-sm font-semibold ',
                    itm === StatusName.Active
                      ? 'border-active bg-active text-active'
                      : 'border-inactive bg-inactive text-inactive',
                  ].join(',')}
                >
                  {itm}
                </div>
              ) : (
                itm
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
