import React from "react";
import SchedulerItem from "./SchedulerItem";
import "bootstrap/dist/css/bootstrap.min.css";

interface SchedulerItemProps {
  id: number;
  weekday: string;
  start: string;
  duration: string;
  enabled: boolean;
  on: boolean;
}

interface SchedulerListGroupProps {
  items: SchedulerItemProps[];
  onChange: (items: SchedulerItemProps[]) => void;
  onSave: () => void;
  currentTime: string;
  currentWeekday: string;
}

const SchedulerListGroup: React.FC<SchedulerListGroupProps> = ({
  items,
  onChange,
  onSave,
  currentTime,
  currentWeekday,
}) => {
  const handleAddItem = () => {
    const newItem: SchedulerItemProps = {
      id: Date.now(),
      weekday: "0000000",
      start: "",
      duration: "",
      enabled: true,
      on: false,
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleToggleEnable = (id: number) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };
  const handleSave = () => {
    onSave();
  };

  const handleItemChange = (
    id: number,
    updatedItem: Partial<SchedulerItemProps>
  ) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

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

  const sortedItems = [...items].sort((a, b) => {
    const currentTimeValue = new Date(`1970-01-01T${currentTime}`).getTime();

    const aNextDay = getNextScheduledDay(
      a.weekday,
      getWeekdayValue(currentWeekday)
    );
    const bNextDay = getNextScheduledDay(
      b.weekday,
      getWeekdayValue(currentWeekday)
    );

    if (aNextDay !== bNextDay) {
      return aNextDay - bNextDay;
    }

    const aTime = new Date(`1970-01-01T${a.start}`).getTime();
    const bTime = new Date(`1970-01-01T${b.start}`).getTime();
    // if (a.on === true) return 1;
    // else if (b.on === true) return -1;
    // else
    if (
      aNextDay === getWeekdayValue(currentWeekday) &&
      aTime < currentTimeValue
    ) {
      return 1;
    } else if (
      bNextDay === getWeekdayValue(currentWeekday) &&
      bTime < currentTimeValue
    ) {
      return -1;
    } else {
      return aTime - bTime;
    }
  });

  return (
    <div
      className="d-flex flex-column align-items-center mb-3 border p-2 rounded p-2"
      style={{ width: "fit-content", height: "fit-content" }}
    >
      <div
        className="list-group overflow-auto"
        style={{ maxHeight: "400px", width: "fit-content" }}
      >
        {sortedItems.map((item) => (
          <SchedulerItem
            key={item.id}
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onToggleEnable={() => handleToggleEnable(item.id)}
            onChange={(updatedItem) => handleItemChange(item.id, updatedItem)}
            onSave={handleSave}
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
