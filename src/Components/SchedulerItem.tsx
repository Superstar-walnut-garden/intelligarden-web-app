import React, { useState } from "react";
import WeekSelector from "./WeekSelector";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare } from "react-bootstrap-icons";
import { FloppyFill } from "react-bootstrap-icons";

export interface SchedulerItemProps {
  id: number;
  event_id: number;
  weekday: string;
  start: string;
  duration: string;
  enabled: boolean;
  on: boolean;
  name: string;
}

interface SchedulerItemComponentProps {
  item: SchedulerItemProps;
  onRemove: (id: number) => void;
  onSave: (item: SchedulerItemProps) => void;
}

const SchedulerItem: React.FC<SchedulerItemComponentProps> = ({
  item,
  onRemove,
  onSave
}) => {
  const handleWeekSelectorChange = (weekday: string) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      weekday: weekday
    }));
  };
  const handleRemove = () => {
    onRemove(localItem.id);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      start: e.target.value
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      duration: e.target.value
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      name: e.target.value
    }));
  }
  const [isEditing, setIsEditing] = useState(false);
  const [localItem, setLocalItem] = useState(item);
  const handleEditClick = () => {
    if (isEditing) onSave(localItem);
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`list-group-item ${
        isEditing ? "border-primary" : ""
      } d-flex flex-column align-items-start m-2 border p-2 rounded p-2`}>
      <div className="d-flex flex-column align-items-center w-100 mb-3">
        <div className="d-flex align-items-center w-100 mb-1">
          <label className="text-muted w-auto mx-2"> ID: {item.id}</label>
          <label className="text-muted w-auto"> Name: </label>
          <input
            title="name"
            type="text"
            className={`w-auto mx-1 ${isEditing ? "form-control" : "form-control-plaintext text-muted"}`}
            value={localItem.name}
            onChange={handleNameChange}
            disabled={!isEditing} 
          />
        </div>
        <div className="d-flex align-items-center w-100 mb-1">
          <label className="text-muted w-auto"> Event: </label>
          <input
            title="eventID"
            type="text"
            className={`w-auto mx-1 ${isEditing ? "form-control" : "form-control-plaintext text-muted"}`}
            value={localItem.event_id}
            onChange={handleNameChange}
            disabled={!isEditing} 
          />
        </div>
      </div>
      
      <div className="d-flex align-items-center w-100 mb-3">
        <div className="d-flex flex-column mx-3">
          <label>Start: </label>
          <input
            title="Start"
            type="time"
            className={`${isEditing ? "form-control" : "form-control-plaintext text-muted"}`}
            value={localItem.start}
            onChange={handleStartTimeChange}
            disabled={!isEditing}
          />
        </div>
        <div className="d-flex justify-content-end flex-column mx-3">
          <label>Duration: </label>
          <input
            title="Duration"
            type="time"
            className={`${isEditing ? "form-control" : "form-control-plaintext text-muted"}`}
            value={localItem.duration}
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
        <button className="btn btn-danger w-100 mx-1" onClick={handleRemove}>
          Remove
        </button>
        <button
          className={`btn w-100 mx-1 ${
            item.enabled ? "btn-secondary" : "btn-success"
          }`}
          // onClick={onToggleEnable}
        >
          {item.enabled ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default SchedulerItem;
