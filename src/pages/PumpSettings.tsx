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

const PumpSettings: React.FC = () => {
  const [schedulerItems, setSchedulerItems] = useState<SchedulerItemProps[]>(
    []
  );
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentWeekday, setCurrentWeekday] = useState<string>("");

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

    return;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getCurrentTime");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setCurrentTime(data.time);
        setCurrentWeekday(data.weekday);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (newItems: SchedulerItemProps[]) => {
    setSchedulerItems(newItems);
    console.log("Saved items:", newItems);
  };
  const handleSave = () => {
    const sendData = async () => {
      try {
        const response = await fetch("http://localhost:3000/setPumpSchedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedulerItems),
        });
        const data: SchedulerItemProps[] = await response.json();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    sendData();
    console.log("list sent to server!");
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <div className="border-bottom pb-2 mb-4">
          {/* <HomeButton /> */}
          <h1 className="page-header text-center">Pump Settings</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <SchedulerListGroup
            items={schedulerItems}
            onChange={handleChange}
            onSave={handleSave}
            currentTime={currentTime}
            currentWeekday={currentWeekday}
          />
        </div>
      </div>
    </>
  );
};

export default PumpSettings;
