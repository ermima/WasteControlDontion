/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const GenerateReport = ({ generateReport, report }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2 text-blue-700">Generate Report</h3>
      <button onClick={generateReport} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Generate Report
      </button>
      {report && (
        <div className="mt-4 text-black-100 bg-gray-100 p-4 rounded-lg shadow">
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;