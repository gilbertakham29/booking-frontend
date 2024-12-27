"use client";
import ApplyDiscountForm from "../../components/ApplyDiscountForm";
import Report from "@/components/Report";
import { useState } from "react";

export default function Home() {
  const [showReport, setShowReport] = useState(false); // Track whether the report is visible

  const handleToggleReport = () => {
    setShowReport(!showReport); // Toggle between report and form
  };
  return (
    <div className="p-4">
      {showReport ? (
        <Report handleToggleReport={handleToggleReport} />
      ) : (
        <ApplyDiscountForm handleToggleReport={handleToggleReport} />
      )}
    </div>
  );
}
