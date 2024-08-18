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
}

const SchedulerListGroup: React.FC<SchedulerListGroupProps> = ({
  items,
  onChange,
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

  const handleItemChange = (
    id: number,
    updatedItem: Partial<SchedulerItemProps>
  ) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  return (
    <div
      className="d-flex flex-column align-items-center mb-3 border p-2 rounded p-2"
      style={{ width: "fit-content", height: "fit-content" }}
    >
      <div
        className="overflow-auto"
        style={{ maxHeight: "400px", width: "fit-content" }}
      >
        {items.map((item) => (
          <SchedulerItem
            key={item.id}
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onToggleEnable={() => handleToggleEnable(item.id)}
            onChange={(updatedItem) => handleItemChange(item.id, updatedItem)}
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
