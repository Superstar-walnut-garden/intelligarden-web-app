import React, { useState } from "react";
import WeekSelector from "./WeekSelector";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare } from "react-bootstrap-icons";
import { FloppyFill } from "react-bootstrap-icons";

interface SchedulerItemProps {
  id: number;
  weekday: string;
  start: string;
  duration: string;
  enabled: boolean;
  on: boolean;
}

interface SchedulerItemComponentProps {
  item: SchedulerItemProps;
  onRemove: () => void;
  onToggleEnable: () => void;
  onChange: (updatedItem: Partial<SchedulerItemProps>) => void;
  onSave: () => void;
}

const SchedulerItem: React.FC<SchedulerItemComponentProps> = ({
  item,
  onRemove,
  onToggleEnable,
  onChange,
  onSave,
}) => {
  const handleWeekSelectorChange = (weekday: string) => {
    onChange({ weekday });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ start: e.target.value });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ duration: e.target.value });
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    if (isEditing) onSave();
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`list-group-item ${
        isEditing ? "bg-warning" : ""
      } d-flex flex-column align-items-start m-2 border p-2 rounded p-2`}
    >
      <div className="d-flex align-items-center w-100 mb-3">
        <div className="d-flex flex-column mx-3">
          <label>Start: </label>
          <input
            title="Start"
            type="time"
            className="form-control"
            value={item.start}
            onChange={handleStartTimeChange}
            disabled={!isEditing}
          />
        </div>
        <div className="d-flex justify-content-end flex-column mx-3">
          <label>Duration: </label>
          <input
            title="Duration"
            type="time"
            className="form-control "
            value={item.duration}
            onChange={handleDurationChange}
            disabled={!isEditing}
          />
        </div>
        <div className="d-flex flex-column">
          <button
            className={`btn btn-primary rounded-circle `}
            onClick={handleEditClick}
          >
            {" "}
            <div hidden={isEditing}>
              <PencilSquare />
            </div>
            <div hidden={!isEditing}>
              <FloppyFill />
            </div>
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start mb-3">
        <label className="mx-3"> Week Days: </label>
        <WeekSelector
          initialSelectedDays={item.weekday}
          onSelectionChange={handleWeekSelectorChange}
          isEnabled={isEditing}
        />
      </div>
      <div className="d-flex w-100">
        <button className="btn btn-danger w-100 mx-1" onClick={onRemove}>
          Remove
        </button>
        <button
          className={`btn w-100 mx-1 ${
            item.enabled ? "btn-secondary" : "btn-success"
          }`}
          onClick={onToggleEnable}
        >
          {item.enabled ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default SchedulerItem;
