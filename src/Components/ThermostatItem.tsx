import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare } from "react-bootstrap-icons";
import { FloppyFill } from "react-bootstrap-icons";
import { TempSensorApiData, ThermostatApiData } from "../api/apiService";
import ItemTitle from "../Components/ItemTitle";

interface ThermostatItemComponentProps {
  item: ThermostatApiData;
  sensorList: TempSensorApiData[];
  onRemove: (id: number) => void;
  onSave: (item: ThermostatApiData) => void;
}

const ThermostatItem: React.FC<ThermostatItemComponentProps> = ({
  item,
  sensorList,
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
      } d-flex flex-column align-items-start m-2 border rounded p-0`}
    >
      <ItemTitle
        title={localItem.name}
        isEditing={isEditing}
        onTextChange={handleNameChange}
      />
      <div className="d-flex-column align-items-center w-100 mb-1 p-2">
        <div className="d-flex align-items-center w-100 mb-1">
          <label
            title="id"
            className={`form-control-plaintext text-muted w-auto`}
          >
            {"ID: " + localItem.id}
          </label>
        </div>
        <div className="d-flex align-items-center w-100 mb-0">
          <label
            title="sensor"
            className={`form-control-plaintext text-muted w-auto`}
          >
            Sensor:
          </label>
          <select
            title="SensorListDropdown"
            value={String(localItem.sensor)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setLocalItem((prevItem) => ({
                ...prevItem,
                sensor: String(e.target.value),
              }));
            }}
            disabled={!isEditing}
            className={`w-auto mx-1 mb-0 ${
              !isEditing ? "form-control-plaintext text-muted" : "form-control"
            }`}
          >
            <option value={-1}>No sensors assigned!</option>
            {sensorList.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex align-items-center w-100 mb-1 mx-2">
        <label className="text-muted w-auto"> Setpoint: </label>
        <input
          title="setpoint"
          type="text"
          className={`w-auto mx-1 ${
            isEditing ? "form-control" : "form-control-plaintext text-muted"
          }`}
          value={localItem.setpoint}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalItem((prevItem) => ({
              ...prevItem,
              setpoint: Number(e.target.value),
            }));
          }}
          disabled={!isEditing}
        />
      </div>
      <div className="d-flex align-items-center w-100 mb-1 mx-2">
        <label className="text-muted w-auto"> Alt-Setpoint: </label>
        <input
          title="altsetpoint"
          type="text"
          className={`w-auto mx-1 ${
            isEditing ? "form-control" : "form-control-plaintext text-muted"
          }`}
          value={localItem.altSetpoint}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalItem((prevItem) => ({
              ...prevItem,
              altSetpoint: Number(e.target.value),
            }));
          }}
          disabled={!isEditing}
        />
      </div>
      <div className="d-flex align-items-center w-100 mb-1 mx-2">
        <label className="text-muted w-auto"> Hysteresis: </label>
        <input
          title="hysteresis"
          type="text"
          className={`w-auto mx-1 ${
            isEditing ? "form-control" : "form-control-plaintext text-muted"
          }`}
          value={localItem.hysteresis}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalItem((prevItem) => ({
              ...prevItem,
              hysteresis: Number(e.target.value),
            }));
          }}
          disabled={!isEditing}
        />
      </div>
      <div className="d-flex align-items-center w-100 mb-3 mx-2">
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

export default ThermostatItem;
