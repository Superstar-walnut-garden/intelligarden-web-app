import React, { useEffect, useState } from "react";
import { getSignalHubList, SignalHubItem } from "../api/apiService";
import {
  SignalNameResolver,
  SignalType,
} from "../Components/SignalNameResolver";

interface SignalDrilldownProps {
  selectedValues?: string[];
  multiple?: boolean;
  onChange?: (selected: string[]) => void;
  visible?: boolean;
  name?: string;
  allowedTypes?: SignalType[]; // ✅ Strict enum-based
}

type DrillLevel =
  | { type: "subsystem"; name: string }
  | { type: "item"; subsystem: string; name: string };

const SignalPicker: React.FC<SignalDrilldownProps> = ({
  selectedValues = [],
  multiple = false,
  onChange,
  visible = true,
  name = "signals",
  allowedTypes = [SignalType.Broadcaster, SignalType.Listener], // ✅ Default to both
}) => {
  const [hub, setHub] = useState<SignalHubItem[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedValues);
  const [path, setPath] = useState<DrillLevel[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getSignalHubList().then(setHub);
  }, []);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  const handleSelect = (signal: string) => {
    setSelected((prev) =>
      multiple
        ? prev.includes(signal)
          ? prev.filter((s) => s !== signal)
          : [...prev, signal]
        : [signal]
    );
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const getItemNameForSignal = (signal: string): string | undefined => {
    for (const subsystem of hub) {
      for (const item of subsystem.items) {
        if (item.signals.includes(signal)) {
          return item.name;
        }
      }
    }
    return undefined;
  };

  const getSignalTypeLabel = (value: SignalType): string =>
    Object.entries(SignalType).find(([, v]) => v === value)?.[0] ?? value;

  const renderLevel = () => {
    if (path.length === 0) {
      return (
        <ul className="list-group">
          {hub.map((sub) => (
            <li
              key={sub.name}
              className="list-group-item list-group-item-action"
              onClick={() => setPath([{ type: "subsystem", name: sub.name }])}
              style={{ cursor: "pointer" }}
            >
              {sub.name}
            </li>
          ))}
        </ul>
      );
    }

    if (path.length === 1 && path[0].type === "subsystem") {
      const subsystem = hub.find((s) => s.name === path[0].name);
      if (!subsystem) return null;

      return (
        <ul className="list-group">
          {subsystem.items.map((item) => (
            <li
              key={item.name}
              className="list-group-item list-group-item-action"
              onClick={() =>
                setPath([
                  { type: "subsystem", name: subsystem.name },
                  { type: "item", subsystem: subsystem.name, name: item.name },
                ])
              }
              style={{ cursor: "pointer" }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      );
    }

    if (
      path.length === 2 &&
      path[0].type === "subsystem" &&
      path[1].type === "item"
    ) {
      const subsystem = hub.find((s) => s.name === path[0].name);
      const item = subsystem?.items.find((i) => i.name === path[1].name);
      if (!item) return null;

      return (
        <ul className="list-group">
          {item.signals.map((signal) => {
            const parsed = SignalNameResolver.parse(signal);
            const type = parsed.type;
            const isAllowed = allowedTypes.includes(type);
            const isSelected = selected.includes(signal);

            const handleClick = () => {
              if (isAllowed) {
                handleSelect(signal);
              } else {
                alert(
                  `Only ${allowedTypes
                    .map(getSignalTypeLabel)
                    .join(" / ")} signals can be selected.`
                );
              }
            };

            return (
              <li
                key={signal}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  isAllowed ? "" : "text-muted"
                }`}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                <span>
                  {isSelected
                    ? `✅ ${SignalNameResolver.parse(signal).localSignalName}`
                    : SignalNameResolver.parse(signal).localSignalName}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }

    return null;
  };

  return (
    <div className="p-2 border rounded" style={{ maxWidth: "600px" }}>
      <div className="d-flex align-items-center gap-2">
        {!visible && (
          <label className={`${visible ? "" : "text-muted"}`}>{name}:</label>
        )}
        {visible && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setModalOpen(true)}
          >
            Edit {name}
          </button>
        )}
      </div>

      <ul className="list-group p-0">
        {selected.map((signal) => {
          const parsed = SignalNameResolver.parse(signal);
          const itemName = getItemNameForSignal(signal);
          return (
            <li key={signal} className="list-group-item border-0 mx-0 px-0">
              <div className="d-flex flex-column">
                <span className="lh-sm">{itemName}</span>
                <small className="text-muted lh-1">
                  ({parsed.subsystemName}
                  {parsed.id}_{parsed.localSignalName})
                </small>
              </div>
            </li>
          );
        })}
      </ul>

      {modalOpen && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pick Signals</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setModalOpen(false);
                    setPath([]);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {path.length > 0 && (
                  <button
                    className="btn btn-sm btn-outline-secondary mb-2"
                    onClick={handleBack}
                  >
                    ← Back
                  </button>
                )}
                {renderLevel()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalPicker;
