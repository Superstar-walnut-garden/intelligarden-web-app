import React, { useState, useEffect } from "react";
import GPIOListGroup from "../Components/GPIOListGroup";
import TitleBar from "../Components/TitleBar";
import axios from 'axios';
import { GPIOItemProps } from "../Components/GPIOItem";
import { Event } from "../Components/EventManager";

const PinManagerPage: React.FC = () => {
  const [GPIOItems, setGPIOItems] = useState<GPIOItemProps[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetchList();
  }, []);

  
  useEffect(() => {
    axios.get<Event[]>('/getEventList').then((response) => {
      setEvents(response.data);
    });
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get<GPIOItemProps[]>('/getGPIOList');
      setGPIOItems(response.data);
    } catch (error) {
      console.error('Error fetching schedule list:', error);
    }
  };

  const createGPIO = async (newIO: GPIOItemProps) => {
    const newIOData = { ...newIO };
    try {
      await axios.post('/createGPIO', newIOData);
    } catch (error) {
      console.error('Error creating GPIO:', error);
    }
    fetchList(); //get updated list
  };

  const deleteGPIO = async (id: number) => {
    try {
      await axios.post('/deleteGPIO', { id });
    } catch (error) {
      console.error('Error deleting GPIO:', error);
    }
    fetchList(); //get updated list
  };

  const modifyGPIO = async (updatedItem: GPIOItemProps) => {
    try {
      await axios.post('/modifyGPIO', {...updatedItem });
    } catch (error) {
      console.error('Error modifying GPIO:', error);
    }
    fetchList(); // get updated list
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <TitleBar title="Manage I/Os" />
        <div className="d-flex justify-content-center align-items-center">
          <GPIOListGroup
            items={GPIOItems}
            onSave={modifyGPIO}
            onRemove={deleteGPIO}
            onCreate={createGPIO}
            eventList={events}
          />
        </div>
      </div>
    </>
  );
};

export default PinManagerPage;