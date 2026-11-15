import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PencilSquare,
  FloppyFill,
  Trash,
  ChevronDown,
  ChevronUp,
} from "react-bootstrap-icons";

import { SandFlushApiData } from "../api/apiService";

interface SandFlushItemComponentProps {
  item: SandFlushApiData;
  onRemove: (id: number) => void;
  onSave: (item: SandFlushApiData) => void;
}

const SandFlushItem: React.FC<SandFlushItemComponentProps> = ({
  item,
  onRemove,
  onSave,
}) => {
  const [localItem, setLocalItem] = useState(item);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);

  useEffect(() => {
    if (!isEditing) setLocalItem(item);
  }, [item, isEditing]);

  const handleSave = () => {
    onSave({ ...localItem });
    setIsEditing(false);
    setIsConfigExpanded(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsConfigExpanded(true);
  };

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      onRemove(item.id);
    }
  };

  const updateNumber = (field: keyof SandFlushApiData, value: string) => {
    setLocalItem((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
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
  ].join(" · ");

  return (
    <div className="card shadow-sm m-2">
      {/* Header */}
      <div className="card-header py-2 d-flex justify-content-between align-items-center">
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
            className="btn btn-sm btn-outline-danger border-0"
            onClick={handleRemove}
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash />
          </button>
        </div>
      </div>

      <div className="card-body p-2">
        {/* Live operation */}
        <div className="row g-0 mb-2">
          <div className="col-6 border-end pe-2">
            <div className="small text-muted">Differential pressure</div>

            <div className="fs-4 fw-semibold">{localItem.dp + "Bar"}</div>

            <div className="small text-muted">
              Setpoint: {localItem.dpSetpoint}
            </div>
          </div>

          <div className="col-6 ps-2">
            <div className="small text-muted d-flex align-items-center gap-1">
              {localItem.isBackwashing ? "Backwashing" : "Backwash"}

              {localItem.isBackwashing && (
                <span
                  className="spinner-border spinner-border-sm text-success"
                  role="status"
                />
              )}
            </div>

            <div className="fs-4 fw-semibold">
              {localItem.isBackwashing
                ? `${localItem.remainingBackwashTime}s`
                : "Idle"}
            </div>

            <div className="small text-muted">
              {localItem.isBackwashing
                ? `Filter ${localItem.backwashingFilterNumber}`
                : "No active backwash"}
            </div>
          </div>
        </div>

        <div className="d-flex flex-nowrap justify-content-between align-items-center gap-1 small text-muted border-top pt-2">
          <span className="text-nowrap">
            Filtration:{" "}
            <strong className="text-body">
              {localItem.filtrationTimeSinceBackwash >= 60
                ? `${(localItem.filtrationTimeSinceBackwash / 60)
                    .toFixed(1)
                    .replace(/\.0$/, "")}h`
                : `${localItem.filtrationTimeSinceBackwash}m`}
            </strong>
          </span>

          <span className="text-nowrap">
            Reversed:{" "}
            <strong className="text-body">
              {localItem.lastBackwashReversed ? "YES" : "NO"}
            </strong>
          </span>

          <button
            type="button"
            className={`btn btn-sm py-0 px-2 text-nowrap ${
              localItem.isBackwashing ? "btn-secondary" : "btn-outline-primary"
            }`}
            disabled={localItem.isBackwashing}
            onClick={() => onSave({ ...item, manualFlush: true })}
            title={
              localItem.isBackwashing
                ? "Unavailable during backwashing"
                : "Start manual backwash"
            }
          >
            Manual flush
          </button>
        </div>
        {/* Configuration */}
        <div className="border-top mt-2 pt-2">
          {/* Configuration header */}
          <div className="d-flex justify-content-between align-items-center">
            <strong className="small">Configuration</strong>

            <div className="d-flex align-items-center gap-1">
              <button
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
          </div>

          {/* Always visible compact summary */}
          {!isEditing && (
            <div className="small text-muted mt-2">{configSummary}</div>
          )}

          {/* Expanded configuration editor */}
          {isConfigExpanded && (
            <div className="mt-2 border-top pt-2">
              {/* Numeric settings */}
              {[
                ["Parallel filters", "parallelFilterCount"],
                ["Valve delay", "valveDelay"],
                ["Min flush interval", "minFlushInterval"],
                ["Flush interval", "flushInterval"],
                ["Flush duration", "flushDuration"],
                ["Dwell time", "dwellTime"],
                ["dP setpoint", "dpSetpoint"],
              ].map(([label, field]) => (
                <div
                  key={field}
                  className="d-flex align-items-center justify-content-between py-1"
                >
                  <label className="small text-muted">{label}</label>

                  <input
                    type="number"
                    step="any"
                    className="form-control form-control-sm"
                    style={{ width: "100px" }}
                    value={localItem[field as keyof SandFlushApiData] as number}
                    onChange={(e) =>
                      updateNumber(
                        field as keyof SandFlushApiData,
                        e.target.value,
                      )
                    }
                  />
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
                      triggerMode: e.target
                        .value as SandFlushApiData["triggerMode"],
                    }))
                  }
                >
                  <option value="dP">dP</option>
                  <option value="interval">Interval</option>
                  <option value="hybrid">Hybrid</option>
                </select>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SandFlushItem;
