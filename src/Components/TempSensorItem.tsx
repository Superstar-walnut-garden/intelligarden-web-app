import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare } from "react-bootstrap-icons";
import { FloppyFill } from "react-bootstrap-icons";
import { TempSensorApiData } from "../api/apiService";


interface TempSensorItemComponentProps {
  item: TempSensorApiData;
  onRemove: (id: number) => void;
  onSave: (item: TempSensorApiData) => void;
}

const TempSensorItem: React.FC<TempSensorItemComponentProps> = ({
  item,
  onRemove,
  onSave
}) => {

  const encode64BitNumberToBase62 = (num: number) => {
    const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let bigIntNum = BigInt(num);
    bigIntNum = (bigIntNum >> 8n) & ((1n << 48n) - 1n);

    let base62String = "";
    while (bigIntNum > 0) {
      let remainder = bigIntNum % 62n;
      base62String = BASE62[Number(remainder)] + base62String;
      bigIntNum /= 62n;
    }
    return base62String;
  };

  const handleRemove = () => {
    onRemove(localItem.id);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalItem(prevItem => ({
      ...prevItem,
      name: e.target.value
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
          >{"(ID: " + encode64BitNumberToBase62(localItem.id) + ")"}</label>
        </div>
        <div className="d-flex align-items-center w-100 mb-1">
          <label
            title="id"
            className={`form-control-plaintext text-muted w-auto`}
          >{"Temp: " + localItem.temp + "C"}</label>
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
            {item.status ? "Connected" : "Disconnected"}
          </button>
        </div>
    </div>
  </div>
  );
};

export default TempSensorItem;
