import { Loading, Table } from '@/components';
import { dashboardToggle, dashboardFilterFields } from './constants';
import { Filters } from './DashboardFilters';
import useTable from '@/hooks/useTable';

const Dashboard = () => {
  const title = 'Search Results';
  const subtitle = 'Results Found';

  const {
    filterValues,
    tableData,
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    handlePageParams,
    onClear,
    dashboardColumns,
    showFunctionColumn,
  } = useTable();

  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h2 className="text-left">Personnel</h2>
      <Filters
        fields={dashboardFilterFields}
        handleMultiSelect={handleMultiSelect}
        handleSingleSelect={handleSingleSelect}
        onClear={onClear}
        filterValues={filterValues}
        handleSearch={handleSearch}
      />

      {!tableData ? (
        <Loading />
      ) : (
        <Table
          title={title}
          subtitle={subtitle}
          toggle={dashboardToggle}
          columns={dashboardColumns}
          tableData={tableData}
          pageParams={filterValues}
          handlePageParams={handlePageParams}
          showFunctionColumn={showFunctionColumn}
        />
      )}
    </div>
  );
};

export default Dashboard;
