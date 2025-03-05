import React, { useEffect, useState } from "react";
import { Event } from "./EventItem";
import * as ApiService from "../api/apiService";

interface EventPickerProps {
  value: number;
  onChange: (id: number) => void;
  disabled: boolean;
}

const EventPicker: React.FC<EventPickerProps> = ({ value, onChange, disabled }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await ApiService.getEventList();
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <select
        title="EventListDropdown"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{onChange(Number(e.target.value));}}
        disabled={disabled}
        className={`w-auto mx-1 ${disabled ? "form-control-plaintext text-muted" : "form-control"}`}
    >
      <option value={-1}>No events assigned!</option>
      {events.map((event) => (
        <option key={event.id} value={event.id}>
          {event.name}
        </option>
      ))}
    </select>
  );
};

export default EventPicker;