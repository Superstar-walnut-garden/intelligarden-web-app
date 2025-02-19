import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Event } from "../Components/EventItem";
import EventItem from "../Components/EventItem";

interface EventListGroupProps {
  items: Event[];
  onCreate: (item: Event) => void;
  onSave: (item: Event) => void;
  onRemove: (id: number) => void;
}

const EventListGroup: React.FC<EventListGroupProps> = ({
  items,
  onSave,
  onCreate,
  onRemove,
}) => {
  const handleAddItem = () => {
    const input = window.prompt("New Event Name:");
    if (input !== null) {
      const name = String(input);
      if (name) {
        const newItem: Event = {
          id: nextId(),
          event_id: -1,
          name: "Untitled Event",
          status: false,
          occupied: false,
        };
        onCreate(newItem);
      } else {
        alert("Please enter a valid name!");
      }
    }
  };

  function nextId() {
    let newId = 1;
    while (items.some(item => item.id === newId)) {
      newId++;
    }
    return newId;
  }
  
  const handleRemoveItem = (id: number) => {
    onRemove(id);
  };
  
  const handleSave = (item: Event) => {
    onSave(item);
  }

  return (
    <div
      className="d-flex flex-column align-items-center mb-3 border p-2 rounded p-2"
      style={{ width: "fit-content", height: "fit-content" }}
    >
      <div
        className="list-group overflow-auto"
        style={{ maxHeight: "400px", width: "fit-content" }}
      >
        {items.map((item) => (
          <EventItem
            key={item.id}
            item={item}
            onRemove={(id) => handleRemoveItem(id)}
            onSave={(updatedItem) => handleSave(updatedItem)}
            eventList={items}
          />
        ))}
      </div>
      <div className="d-flex align-items-center w-100">
        <button className="btn btn-primary m-4 w-100" onClick={handleAddItem}>
          New Event
        </button>
      </div>
    </div>
  );
};

export default EventListGroup;
