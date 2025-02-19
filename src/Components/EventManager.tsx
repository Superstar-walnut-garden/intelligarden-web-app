import React, { useState, useEffect } from 'react';
import EventListGroup from './EventListGroup';
import { Event } from './EventItem';
import * as ApiService from '../api/apiService';
import TitleBar from './TitleBar';

const EventManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const result = await ApiService.getEventList();
      setEvents(result);
    } catch (error) {
      console.error('Error fetching event list:', error);
    }
  };

  const createEvent = async(event: Event) => {
    try {
      ApiService.createEvent(event);
      getList();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await ApiService.deleteEvent(id);
      getList();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const modifyEvent = async (event: Event) => {
    try {
      await ApiService.modifyEvent(event);
      getList();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <>
    <TitleBar title="Event Manager"/>
    <div className="d-flex flex-column align-items-center">
      <EventListGroup
        items={events}
        onCreate={createEvent}
        onRemove={deleteEvent}
        onSave={modifyEvent}/>
      </div>
    </>
  );
};

export default EventManager;