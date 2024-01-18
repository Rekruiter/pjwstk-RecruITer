import { getCompanyStatistics } from '@/api/general/companyStatistics';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Datepicker from 'react-tailwindcss-datepicker';

const CompanyStatisticsPage = () => {
  const [value, setValue] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const { data, isError, isLoading } = useQuery(['companyStatistics', value.startDate, value.endDate], () =>
    getCompanyStatistics(value.startDate, value.endDate),
  );

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  return (
    <div className="container flex flex-col gap-10 p-6">
      <h2 className="text-2xl font-bold text-dark">Company statistics</h2>
      <Datepicker value={value} onChange={handleValueChange} containerClassName="w-1/2 shadow-md" primaryColor="blue" />
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-dark">
                <th className="px-4 py-2">Log ID</th>
                <th className="px-4 py-2">Timestamp</th>
                <th className="px-4 py-2">IP Address</th>
                <th className="px-4 py-2">Operation Type</th>
                <th className="px-4 py-2">Table Name</th>
                <th className="px-4 py-2">Record ID</th>
                <th className="px-4 py-2">Query</th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {data?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-dark/5 shadow-md' : ''}>
                  <td className="border px-4 py-2">{item.logId}</td>
                  <td className="border px-4 py-2">{item.timestamp}</td>
                  <td className="border px-4 py-2">{item.clientIpAddress}</td>
                  <td className="border px-4 py-2">{item.operationType}</td>
                  <td className="border px-4 py-2">{item.tableName}</td>
                  <td className="border px-4 py-2 text-center">{item.recordId}</td>
                  <td className="border px-4 py-2">{item.query}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyStatisticsPage;
