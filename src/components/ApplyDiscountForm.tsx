"use client";
import axios from "axios";
import { useState } from "react";
import Report from "./Report";
interface ApplyDiscountFormProps {
  handleToggleReport: () => void;
}
export default function ApplyDiscountForm({
  handleToggleReport,
}: ApplyDiscountFormProps) {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [message, setMessage] = useState("");
  const [showReport, setShowReport] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/discounts/apply",
        {
          patientId,
          doctorId,
          consultationFee: parseFloat(consultationFee),
        }
      );
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "An error occured.");
    }
  };
  return (
    <div className="flex w-1/2 justify-center mx-auto border items-center ">
      <div className="flex w-full flex-col justify-center items-center">
        {!showReport && (
          <>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-d"
            >
              <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Apply Discount
              </h1>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="patientId"
                >
                  Patient ID
                </label>
                <input
                  type="text"
                  placeholder="Patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="doctorId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doctor ID
                </label>
                <input
                  type="text"
                  placeholder="Doctor ID"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="consultationFee"
                  className="block text-sm font-medium text-gray-700"
                >
                  Consultation Fee
                </label>
                <input
                  type="text"
                  placeholder="Consultation Fee"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                type="submit"
              >
                Apply Discount
              </button>
              {message && (
                <p
                  className={`mt-4 text-center ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
            <button
              type="button"
              onClick={handleToggleReport}
              className="mt-4 mb-4 bg-gray-200 px-4 py-2 border rounded-md items-center font-medium"
            >
              See Report
            </button>
          </>
        )}
      </div>
    </div>
  );
}
