import { FusionBusApiData } from "../api/apiService";

interface FusionBusDevPickerProps {
  devices: FusionBusApiData[];
  selectedId: string;
  onChange: (selectedId: string) => void;
  isEditing: boolean;
  filterDevices?: (device: FusionBusApiData) => boolean;
}

const FusionBusDevPicker: React.FC<FusionBusDevPickerProps> = ({
  devices,
  selectedId,
  onChange,
  isEditing,
  filterDevices,
}) => {
  const filteredDevices = filterDevices
    ? devices.filter(filterDevices)
    : devices;

  return (
    <select
      title="DevListDropdown"
      value={selectedId}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
      }}
      disabled={!isEditing}
      className={`form-select form-select-sm ${
        !isEditing ? "form-control-plaintext text-muted" : "form-control"
      }`}
    >
      <option value="-1">No device</option>

      {filteredDevices.map(
        (device) =>
          device.name && (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ),
      )}
    </select>
  );
};

export default FusionBusDevPicker;
