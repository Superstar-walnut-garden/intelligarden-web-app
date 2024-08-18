import React, { useState, useEffect } from "react";
import SchedulerListGroup from "../Components/SchedulerListGroup";
import HomeButton from "../Components/HomeButton";

// Define the type for scheduler items
interface SchedulerItemProps {
  id: number;
  weekday: string;
  start: string;
  duration: string;
  enabled: boolean;
  on: boolean;
}
interface TimeAndWeekday {
  time: string;
  weekday: string;
}

const PumpSettings: React.FC = () => {
  const [schedulerItems, setSchedulerItems] = useState<SchedulerItemProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getPumpSchedule");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: SchedulerItemProps[] = await response.json();
        setSchedulerItems(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Scheduler items updated:", schedulerItems);
  }, [schedulerItems]);

  const handleChange = (newItems: SchedulerItemProps[]) => {
    setSchedulerItems(newItems);
    console.log("Saved items:", newItems);
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <div className="border-bottom pb-2 mb-4">
          {/* <HomeButton /> */}
          <h1 className="page-header text-center">Pump Settings</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <SchedulerListGroup items={schedulerItems} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default PumpSettings;
