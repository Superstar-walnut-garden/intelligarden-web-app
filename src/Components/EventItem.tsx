import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare } from "react-bootstrap-icons";
import { FloppyFill } from "react-bootstrap-icons";

export interface Event {
  id: number;
  event_id: number;
  name: string;
  status: boolean;
  occupied: boolean;
  invert: boolean;
}


interface EventItemComponentProps {
  item: Event;
  eventList: Event[];
  onRemove: (id: number) => void;
  onSave: (item: Event) => void;
}

const EventItem: React.FC<EventItemComponentProps> = ({
  item,
  eventList,
  onRemove,
  onSave
}) => {
  const handleRemove = () => {
    onRemove(localItem.id);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      name: e.target.value
    }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      event_id: Number(e.target.value)
    }));
  }; 

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      mode: Number(e.target.value)
    }));
  }; 

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      id: Number(e.target.value)
    }));
  }; 

  const [isEditing, setIsEditing] = useState(false);
  const [localItem, setLocalItem] = useState(item);
  const [enableMating, setEnableMating] = React.useState(localItem.event_id === -1);
  const handleEditClick = () => {
    if (isEditing) onSave(localItem);
    setIsEditing(!isEditing);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableMating(e.target.checked);
    // event_id remains unchanged
  };

  return (
    <div
      className={`list-group-item ${
        isEditing ? "border-primary" : ""
      } d-flex flex-column align-items-start m-2 border p-2 rounded p-2`}>
      <div className="d-flex-column align-items-center w-100 mb-1">
        <div className="d-flex align-items-center w-100 mb-1">
          <label className="text-muted w-auto"> Name: </label>
          <input
            title="name"
            type="text"
            className={`w-auto mx-1 ${isEditing ? "form-control" : "form-control-plaintext text-muted"}`}
            value={localItem.name}
            onChange={handleNameChange}
            disabled={!isEditing} 
          />
          <label
            title="id"
            className={`form-control-plaintext text-muted w-auto mx-1`}
          >{"(ID: " + localItem.id + ")"}</label>
        </div>
        <div className="form-check me-2">
            <input
              title="mycheckbox"
              type="checkbox"
              className="form-check-input"
              id="enableInversion"
              checked={localItem.invert}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{setLocalItem(prevItem => ({
                ...prevItem,
                invert: Boolean(e.target.checked)
              }));}}
              disabled={!isEditing}
            />
            <label className="form-check-label" htmlFor="enableMating">
              Invert Status (for listeners)
            </label>
        </div>
        <div className="d-flex align-items-center w-100 mb-1">
          <div className="form-check me-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="enableMating"
              checked={enableMating}
              onChange={handleCheckboxChange}
              disabled={!isEditing}
            />
            <label className="form-check-label" htmlFor="enableMating">
              Enable Mating
            </label>
          </div>
        </div>
        <div className={`d-flex align-items-center w-100 mb-1 ${!enableMating ? "d-none" : undefined}`}>
        <label className="text-muted w-auto"> Mate with: </label>
          <select
            title="eventID"
            className={`w-auto mx-1 ${isEditing ? "form-control" : "form-control-plaintext text-muted"}`}
            value={localItem.event_id}
            onChange={handleEventChange}
            disabled={!isEditing}
          >
            <option value={-1}>No events assigned!</option>
            {eventList
              .filter(event => event.id !== localItem.id)
              .map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      
      <div className="d-flex align-items-center w-100 mb-3">
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
      <div className="d-flex w-100">
        <button className="btn btn-danger w-100 mx-1" onClick={handleRemove}>
          Remove
        </button>
        <button
          className={`btn w-100 mx-1 ${
            item.status ? "btn-success" : "btn-secondary"
          }`} 
          disabled
        >
          {item.status ? "Status: 1" : "Status: 0"}
        </button>
      </div>
    </div>
  );
};

export default EventItem;
