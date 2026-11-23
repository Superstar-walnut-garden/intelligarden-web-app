import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare, FloppyFill, Trash } from "react-bootstrap-icons";

import {
  SandFlushApiData,
  OperatingState,
  TriggerMode,
  FusionBusApiData,
} from "../api/apiService";

import FusionBusDevPicker from "./FusionBusDevPicker";
import LogConfig from "./LogConfig";
import { LogConfigProps } from "./LogConfig";

interface SandFlushItemComponentProps {
  item: SandFlushApiData;
  fusionBusDevs: FusionBusApiData[];
  onRemove: (id: number) => void;
  onSave: (item: SandFlushApiData) => void;
}

type NumericConfigField =
  | "parallelFilterCount"
  | "valveDelay"
  | "minFlushInterval"
  | "flushInterval"
  | "flushDuration"
  | "dwellTime"
  | "dpSetpoint";

const numericSettings: {
  label: string;
  field: NumericConfigField;
  unit: string;
}[] = [
  { label: "Parallel filters", field: "parallelFilterCount", unit: "#" },
  { label: "Valve delay", field: "valveDelay", unit: "Sec" },
  { label: "Min flush interval", field: "minFlushInterval", unit: "Min" },
  { label: "Flush interval", field: "flushInterval", unit: "Min" },
  { label: "Flush duration", field: "flushDuration", unit: "Sec" },
  { label: "Dwell time", field: "dwellTime", unit: "Sec" },
  { label: "dP setpoint", field: "dpSetpoint", unit: "Bar" },
];

const SandFlushItem: React.FC<SandFlushItemComponentProps> = ({
  item,
  fusionBusDevs,
  onRemove,
  onSave,
}) => {
  const [localItem, setLocalItem] = useState(item);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);

  const isBackwashing = localItem.operatingState === OperatingState.Backwashing;

  useEffect(() => {
    if (!isEditing) setLocalItem(item);
  }, [item, isEditing]);

  // Save configuration
  const handleSave = () => {
    onSave({ ...localItem });
    setIsEditing(false);
    setIsConfigExpanded(false);
  };

  // Edit configuration
  const handleEdit = () => {
    setIsEditing(true);
    setIsConfigExpanded(true);
  };

  // Remove item
  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      onRemove(item.id);
    }
  };

  // Update numeric configuration
  const updateNumber = (field: NumericConfigField, value: string) => {
    setLocalItem((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  // Update logging configuration
  const handleLogConfigChange = (config: LogConfigProps) => {
    setLocalItem((prev) => ({
      ...prev,
      ...config,
    }));
  };

  // Trigger manual flush
  const handleManualFlush = () => {
    onSave({
      ...item,
      manualFlush: true,
    });
  };

  // Cancel active backwash
  const handleCancelFlush = () => {
    onSave({
      ...item,
      cancelFlush: true,
    });
  };

  // Compact configuration summary
  const configSummary = [
    `${localItem.parallelFilterCount} filters`,
    `Valve ${localItem.valveDelay}s`,
    `Min ${localItem.minFlushInterval}`,
    `Interval ${localItem.flushInterval}`,
    `Flush ${localItem.flushDuration}s`,
    `Dwell ${localItem.dwellTime}s`,
    `dP ${localItem.dpSetpoint}`,
    localItem.triggerMode,
    `Seq ${localItem.switchSequence ? "ON" : "OFF"}`,
    localItem.loggingEnabled ? `Log ${localItem.logInterval}s` : "Log OFF",
  ].join(" · ");

  // Format filtration time
  const filtrationTime =
    localItem.filtrationTimeSinceBackwash >= 60
      ? `${(localItem.filtrationTimeSinceBackwash / 60)
          .toFixed(1)
          .replace(/\.0$/, "")}h`
      : `${localItem.filtrationTimeSinceBackwash}m`;

  return (
    <div className={`card shadow-sm m-2 ${isEditing ? "border-primary" : ""}`}>
      {/* Header */}
      <div className="card-header p-0">
        <div className="py-2 px-3 d-flex justify-content-between align-items-center">
          <div className="flex-grow-1 me-2">
            {isEditing ? (
              <input
                className="form-control form-control-sm"
                value={localItem.name}
                onChange={(e) =>
                  setLocalItem((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            ) : (
              <strong>{localItem.name}</strong>
            )}

            <div className="small text-muted">ID: {localItem.id}</div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge ${
                localItem.status ? "bg-success" : "bg-secondary"
              }`}
            >
              {localItem.status ? "ON" : "OFF"}
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger border-0"
              onClick={handleRemove}
              title="Remove item"
              aria-label="Remove item"
            >
              <Trash />
            </button>
          </div>
        </div>

        {item.autoBackwashInterrupted && !isBackwashing && (
          <div className="d-flex align-items-center  gap-2 px-3 py-1 border-top bg-body-tertiary">
            <span className="small text-secondary">
              Auto-backwash interrupted
              {item.autoBackwashRetryIn > 0 && (
                <>
                  <span className="mx-1">·</span>
                  Retry in {item.autoBackwashRetryIn} min
                </>
              )}
            </span>
          </div>
        )}
      </div>

      <div className="card-body p-2">
        {/* Live operation */}
        <div className="row g-0 mb-2">
          {/* Differential pressure */}
          <div className="col-6 border-end pe-2">
            <div className="small text-muted">Differential pressure</div>

            <div className="fs-4 fw-semibold">{localItem.dp} Bar</div>

            <div className="small text-muted">
              Setpoint: {localItem.dpSetpoint}
            </div>
          </div>

          {/* Operating state */}
          <div className="col-6 ps-2">
            <div className="small text-muted d-flex align-items-center gap-1">
              {isBackwashing ? "Backwashing" : "Operation"}

              {isBackwashing && (
                <span
                  className="spinner-border spinner-border-sm text-success"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="fs-4 fw-semibold">
              {isBackwashing
                ? `${localItem.remainingBackwashTime}s`
                : localItem.operatingState === OperatingState.Filtering
                  ? "Filtering"
                  : "Idle"}
            </div>

            <div className="small text-muted">
              {isBackwashing
                ? localItem.backwashingFilterNumber === -1
                  ? "Waiting"
                  : `Filter ${localItem.backwashingFilterNumber}`
                : localItem.operatingState === OperatingState.Filtering
                  ? "Filtration active"
                  : "No active backwash"}
            </div>
          </div>
        </div>

        {/* Runtime information and operation button */}
        <div className="d-flex flex-nowrap justify-content-between align-items-center gap-1 small text-muted border-top pt-2">
          <span className="text-nowrap">
            Filtration: <strong className="text-body">{filtrationTime}</strong>
          </span>

          <span className="text-nowrap">
            sequence:{" "}
            <strong className="text-body">
              {localItem.flushSequenceReversed ? "Reverse" : "Normal"}
            </strong>
          </span>

          {isBackwashing ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger py-0 px-2 text-nowrap"
              onClick={handleCancelFlush}
              title="Cancel active backwash"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-outline-primary py-0 px-2 text-nowrap"
              onClick={handleManualFlush}
              title="Start manual backwash"
            >
              Manual
            </button>
          )}
        </div>

        {/* Configuration */}
        <div className="border-top mt-2 pt-2">
          {/* Configuration header */}
          <div className="d-flex justify-content-between align-items-center">
            <strong className="small">Configuration</strong>

            <button
              type="button"
              className={`btn btn-sm ${
                isEditing ? "btn-success" : "btn-outline-primary"
              }`}
              onClick={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? (
                <>
                  <FloppyFill className="me-1" />
                  Save
                </>
              ) : (
                <>
                  <PencilSquare className="me-1" />
                  Edit
                </>
              )}
            </button>
          </div>

          {/* Always visible configuration summary */}
          {!isEditing && (
            <div className="small text-muted mt-2">{configSummary}</div>
          )}

          {/* Expanded configuration editor */}
          {isConfigExpanded && (
            <div className="mt-2 border-top pt-2">
              {/* Numeric settings */}
              {numericSettings.map(({ label, field, unit }) => (
                <div
                  key={field}
                  className="d-flex align-items-center justify-content-between py-1"
                >
                  <label className="small text-muted mb-0">{label}</label>

                  <div
                    className="input-group input-group-sm"
                    style={{ width: "125px" }}
                  >
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      value={localItem[field]}
                      onChange={(e) => updateNumber(field, e.target.value)}
                    />
                    <span className="input-group-text">{unit}</span>
                  </div>
                </div>
              ))}

              {/* Trigger mode */}
              <div className="d-flex align-items-center justify-content-between py-1">
                <label className="small text-muted">Trigger mode</label>

                <select
                  className="form-select form-select-sm"
                  style={{ width: "100px" }}
                  value={localItem.triggerMode}
                  onChange={(e) =>
                    setLocalItem((prev) => ({
                      ...prev,
                      triggerMode: e.target.value as TriggerMode,
                    }))
                  }
                >
                  <option value={TriggerMode.DP}>dP</option>
                  <option value={TriggerMode.Interval}>Interval</option>
                  <option value={TriggerMode.Hybrid}>Hybrid</option>
                </select>
              </div>
              <div className="d-flex align-items-center justify-content-between py-1">
                <label className="small text-muted">dP sensor</label>
                <div style={{ width: "100px" }}>
                  <FusionBusDevPicker
                    devices={fusionBusDevs}
                    filterDevices={(device) => device.type === "PressureSensor"}
                    isEditing={isEditing}
                    selectedId={"1"}
                    onChange={(selectedId: string) => {
                      setLocalItem((prevItem) => ({
                        ...prevItem,
                        pressureSensorId: selectedId,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Switch sequence */}
              <div className="form-check form-switch mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`switch-sequence-${localItem.id}`}
                  checked={localItem.switchSequence}
                  onChange={(e) =>
                    setLocalItem((prev) => ({
                      ...prev,
                      switchSequence: e.target.checked,
                    }))
                  }
                />

                <label
                  className="form-check-label small"
                  htmlFor={`switch-sequence-${localItem.id}`}
                >
                  Switch sequence
                </label>
              </div>

              {/* Logging configuration */}
              <div className="border-top mt-2 pt-2">
                <LogConfig
                  config={{
                    logInterval: localItem.logInterval,
                    logOnlyOnChange: localItem.logOnlyOnChange,
                    loggingEnabled: localItem.loggingEnabled,
                  }}
                  onChange={handleLogConfigChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SandFlushItem;
