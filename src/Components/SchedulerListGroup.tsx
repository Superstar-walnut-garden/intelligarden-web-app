import React from "react";
import SchedulerItem from "./SchedulerItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { SchedulerItemProps } from "./SchedulerItem";
import { Event } from "./EventManager";

interface SchedulerListGroupProps {
  items: SchedulerItemProps[];
  onCreate: (item: SchedulerItemProps) => void;
  onSave: (item: SchedulerItemProps) => void;
  onRemove: (id: number) => void;
  currentTime: string;
  currentWeekday: string;
  eventList: Event[];
}

const SchedulerListGroup: React.FC<SchedulerListGroupProps> = ({
  items,
  onSave,
  onCreate,
  onRemove,
  currentTime,
  currentWeekday,
  eventList,
}) => {
  const handleAddItem = () => {
    const newItem: SchedulerItemProps = {
      id: nextId(),
      weekday: "0000000",
      start: "00:00",
      duration: "01:30",
      enabled: true,
      on: false,
    };
    onCreate(newItem);
  };

  const handleRemoveItem = (id: number) => {
    onRemove(id);
  };

  function nextId() {
    let unReservedId= 0;
    items.map((item) => {// search
    if(unReservedId <= item.id){
      unReservedId = item.id + 1;
    }
    });
    return unReservedId;
  }

  
  const handleSave = (item: SchedulerItemProps) => {
    onSave(item);
  }

  const getWeekdayValue = (weekday: string) => {
    let index = 0;
    for (let i = 0; i < 7; i++) {
      if (weekday[i] === "1") index = i;
    }
    return index;
  };

  const getNextScheduledDay = (weekday: string, currentWeekday: number) => {
    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentWeekday + i) % 7;
      if (weekday[dayIndex] === "1") {
        return dayIndex;
      }
    }
    return -1; // In case no valid day is found
  };

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
          <SchedulerItem
            key={item.id}
            item={item}
            onRemove={(id) => handleRemoveItem(id)}
            onSave={(updatedItem) => handleSave(updatedItem)}
            eventList={eventList}
          />
        ))}
      </div>
      <div className="d-flex align-items-center w-100">
        <button className="btn btn-primary m-4 w-100" onClick={handleAddItem}>
          Add New Schedule
        </button>
      </div>
    </div>
  );
};

export default SchedulerListGroup;
