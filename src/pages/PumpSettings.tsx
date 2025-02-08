import React, { useState, useEffect } from "react";
import SchedulerListGroup from "../Components/SchedulerListGroup";
import TitleBar from "../Components/TitleBar";
import axios from 'axios';
import { SchedulerItemProps } from "../Components/SchedulerItem";

const PumpSettings: React.FC = () => {
  const [schedulerItems, setSchedulerItems] = useState<SchedulerItemProps[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentWeekday, setCurrentWeekday] = useState<string>("");

  useEffect(() => {
    fetchScheduleList();
    fetchCurrentTime();
    const intervalId = setInterval(fetchCurrentTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const fetchScheduleList = async () => {
    try {
      const response = await axios.get<SchedulerItemProps[]>('http://localhost:3000/getScheduleList');
      setSchedulerItems(response.data);
    } catch (error) {
      console.error('Error fetching schedule list:', error);
    }
  };

  const fetchCurrentTime = async () => {
    try {
      const response = await fetch("/getCurrentTime");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCurrentTime(data.time);
      setCurrentWeekday(data.weekday);
    } catch (error) {
      console.error("Failed to fetch current time:", error);
    }
  };

  const createSchedule = async () => {
    let newId = 1;
    while (schedulerItems.some(item => item.id === newId)) {
      newId++;
    }
    const newSchedule = { id: newId, weekday: "1111111", start: "20:30", duration: "01:30", enabled: true, on: false };
    try {
      await axios.post('http://localhost:3000/createSchedule', newSchedule);
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
    fetchScheduleList(); //get updated schedule list
  };

  const deleteSchedule = async (id: number) => {
    try {
      await axios.post('http://localhost:3000/deleteSchedule', { id });
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
    fetchScheduleList(); //get updated schedule list
  };

  const modifySchedule = async (id: number, updatedItem: Partial<SchedulerItemProps>) => {
    try {
      await axios.post('http://localhost:3000/modifySchedule', { id, ...updatedItem });
      setSchedulerItems(schedulerItems.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    } catch (error) {
      console.error('Error modifying schedule:', error);
    }
    fetchScheduleList(); // get updated schedule list
  };


  const handleSave = (item: SchedulerItemProps) => {
    modifySchedule(item.id, item);
    console.log("Modified schedules saved!");
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <TitleBar title="Pump Settings" />
        <div className="d-flex justify-content-center align-items-center">
          <SchedulerListGroup
            items={schedulerItems}
            onSave={handleSave}
            onRemove={deleteSchedule}
            onCreate={createSchedule}
            currentTime={currentTime}
            currentWeekday={currentWeekday}
            //onDelete={deleteSchedule} // Pass deleteSchedule function
            //onCreate={createSchedule} // Pass createSchedule function
          />
        </div>
      </div>
    </>
  );
};

export default PumpSettings;