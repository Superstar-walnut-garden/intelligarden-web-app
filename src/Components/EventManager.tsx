import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  flag: boolean;
  occupied: boolean;
}

const EventManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventName, setNewEventName] = useState<string>('');

  useEffect(() => {
    axios.get<Event[]>('http://192.168.4.1/getEventList').then((response) => {
      setEvents(response.data);
    });
  }, []);

  const createEvent = () => {
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const newEvent = { id: newId, name: newEventName, flag: false, occupied: false };
    axios.post('http://192.168.4.1/createEvent', newEvent).then(() => {
      setEvents([...events, newEvent]);
      setNewEventName('');
    });
  };

  const deleteEvent = (id: number) => {
    axios.post('http://192.168.4.1/deleteEvent', { id }).then(() => {
      setEvents(events.filter(event => event.id !== id));
    });
  };

  const modifyEvent = (id: number, name: string) => {
    axios.post('http://192.168.4.1/modifyEvent', { id, name }).then(() => {
      setEvents(events.map(event => (event.id === id ? { ...event, name } : event)));
    });
  };

  return (
    <div>
      <h1>Event Manager</h1>
      <input
        type="text"
        value={newEventName}
        onChange={(e) => setNewEventName(e.target.value)}
        placeholder="New Event Name"
      />
      <button onClick={createEvent}>Create Event</button>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <input
              type="text"
              placeholder='id'
              value={event.name}
              onChange={(e) => modifyEvent(event.id, e.target.value)}
            />
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
            <span>Flag: {event.flag ? '1' : '0'}</span>
            <span>Occupied: {event.occupied ? '1' : '0'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManager;