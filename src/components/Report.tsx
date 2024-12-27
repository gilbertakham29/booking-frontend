"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Interface to define the structure of the report data
interface ReportDoc {
  patientId: string;
  doctorId: string;
  finalFee: number;
  discountAmount: number;
}

interface ReportProps {
  handleToggleReport: () => void; // Function to toggle the visibility of the report
}

export default function Report({ handleToggleReport }: ReportProps) {
  const [report, setReport] = useState<ReportDoc[] | null>(null); // State to store the report data
  const [isReportVisible, setIsReportVisible] = useState(true); // Initially, show the report

  // Fetching the report from the server
  useEffect(() => {
    if (isReportVisible) {
      const fetchReport = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/discounts/financial-report"
          );
          setReport(response.data);
        } catch (error) {
          console.error("Error fetching report data:", error);
        }
      };

      fetchReport();
    }
  }, [isReportVisible]);

  return (
    <>
      <div className="p-4 ">
        {isReportVisible && report && (
          <div className="overflow-x-auto ">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                    Patient ID
                  </th>
                  <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                    Doctor ID
                  </th>
                  <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                    Final Fee
                  </th>
                  <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                    Discount Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-gray-700">
                      {entry.patientId}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {entry.doctorId}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      ${entry.finalFee.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      ${entry.discountAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={handleToggleReport}
          className="mb-4 mt-3 px-6 py-2 bg-gray-200 text-gray-900 rounded-lg transition-all"
        >
          {isReportVisible ? "Hide Report" : "See Report"}
        </button>
      </div>
    </>
  );
}
