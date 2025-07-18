import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare } from "react-bootstrap-icons";
import { FloppyFill } from "react-bootstrap-icons";
import ItemTitle from "../Components/ItemTitle";

export interface Event {
  id: number;
  event_id: number;
  name: string;
  status: boolean;
  occupied: boolean;
  logic: string;
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
  onSave,
}) => {
  const handleRemove = () => {
    onRemove(localItem.id);
  };

  const handleNameChange = (name: string) => {
    setLocalItem((prevItem) => ({
      ...prevItem,
      name: name,
    }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalItem((prevItem) => ({
      ...prevItem,
      event_id: Number(e.target.value),
    }));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [localItem, setLocalItem] = useState(item);
  const handleEditClick = () => {
    if (isEditing) onSave(localItem);
    setIsEditing(!isEditing);
  };
  const handleLogicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalItem((prevItem) => ({
      ...prevItem,
      logic: String(e.target.value),
    }));
  };

  return (
    <div
      className={`list-group-item container-md ${
        isEditing ? "border-primary" : ""
      } d-flex flex-column align-items-start mb-3 border rounded p-0`}
    >
      <ItemTitle
        title={localItem.name}
        isEditing={isEditing}
        onTextChange={handleNameChange}
      />
      <div className="d-flex-column align-items-center w-100 p-2">
        <div className="d-flex-column align-items-center w-100 mb-1">
          <div className="d-flex align-items-center w-100 mb-1">
            <label
              title="id"
              className={`form-control-plaintext text-muted w-auto`}
            >
              {"ID: " + localItem.id}
            </label>
          </div>
          <div className="d-flex align-items-center w-100 mb-1">
            <label className={`${isEditing ? "" : "text-muted"}`}>
              Signal Logic:
            </label>
            <select
              className={`w-auto mx-1 ${
                isEditing ? "form-control" : "form-control-plaintext text-muted"
              }`}
              title="SignalMode"
              value={localItem.logic}
              disabled={!isEditing}
              onChange={handleLogicChange}
            >
              <optgroup label="Self-Driven Modes">
                <option value={"self"}>Main (Self)</option>
                <option value={"selfInverted"}>Inverted Self</option>
              </optgroup>
              <optgroup label="Paired-only Modes">
                <option value={"pairedOnly"}>Paired Only</option>
                <option value={"pairedInverted"}>Paired Inverted</option>
              </optgroup>
              <optgroup label="Paired-Logic Modes">
                <option value={"andWith"}>AND With</option>
                <option value={"orWith"}>OR With</option>
                <option value={"nandWith"}>NAND With</option>
                <option value={"norWith"}>NOR With</option>
              </optgroup>
            </select>
          </div>
          <div
            className={`d-flex align-items-center w-100 mb-1 ${
              localItem.logic === "self" ||
              localItem.logic === "selfInverted" ||
              localItem.logic === undefined
                ? "d-none"
                : undefined
            }`}
          >
            <label className={`${isEditing ? "" : "text-muted"}`}>
              {" "}
              Paired Event:{" "}
            </label>
            <select
              title="eventID"
              className={`w-auto mx-1 ${
                isEditing ? "form-control" : "form-control-plaintext text-muted"
              }`}
              value={localItem.event_id}
              onChange={handleEventChange}
              disabled={!isEditing}
            >
              <option value={-1}>No events assigned!</option>
              {eventList
                .filter((event) => event.id !== localItem.id)
                .map((event) => (
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
    </div>
  );
};

export default EventItem;
