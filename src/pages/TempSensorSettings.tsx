import React, { useState, useEffect } from "react";
import GenericListGroup from "../Components/GenericListGroup";
import TitleBar from "../Components/TitleBar";
import TempSensorItem from "../Components/TempSensorItem";
import * as ApiService from "../api/apiService";
import { TempSensorApiData } from "../api/apiService";
import { TempSensorConfig } from "../api/apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";

const TempSensorSettings: React.FC = () => {
  const [items, setItems] = useState<TempSensorApiData[]>([]);
  const [config, setConfig] = useState<TempSensorConfig | null>(null);

  useEffect(() => {
    const intervalId = setInterval(fetchList, 2000);
    fetchList();
    fetchConfig();
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchConfig = async () => {
    try {
      const cfg = await ApiService.getTempSensorConfig();
      setConfig(cfg);
    } catch (error) {
      console.error("Error fetching Temp Sensor config:", error);
    }
  };

  const fetchList = async () => {
    try {
      const data = await ApiService.getSensorList();
      setItems(data);
    } catch (error) {
      console.error("Error fetching Sensor list:", error);
    }
  };

  const deleteSensor = async (id: number) => {
    try {
      await ApiService.deleteSensor(id);
    } catch (error) {
      console.error("Error deleting Sensor:", error);
    }
    fetchList(); //get updated list
  };

  const modifySensor = async (updatedItem: TempSensorApiData) => {
    try {
      await ApiService.modifySensor(updatedItem.id, updatedItem);
    } catch (error) {
      console.error("Error modifying Sensor:", error);
    }
    fetchList(); // get updated list
  };

  const saveConfig = async (newConfig: TempSensorConfig) => {
    try {
      await ApiService.setTempSensorConfig(newConfig);
      setConfig(newConfig);
    } catch (error) {
      console.error("Error saving Temp Sensor config:", error);
    }
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <TitleBar title="Manage Temp Sensors" />
        <div className="container mt-4">
          <div className="bg-light p-4 rounded border w-100 w-md-50 mx-auto">
            <Tabs defaultActiveKey="sensors" className="mb-3">
              <Tab eventKey="sensors" title="Sensors">
                <GenericListGroup
                  items={items}
                  onCreate={() => {}}
                  onRemove={deleteSensor}
                  onSave={modifySensor}
                  renderItem={(item, onSave, onRemove) => (
                    <TempSensorItem
                      item={item}
                      onSave={onSave}
                      onRemove={onRemove}
                    />
                  )}
                  defaultItemProps={{
                    id: 0,
                    name: "Untitled Sensor",
                    status: false,
                  }}
                />
              </Tab>
              <Tab eventKey="config" title="Config">
                {config && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveConfig(config);
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="maxFileSizeBytes" className="form-label">
                        sensor bus pin:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="maxFileSizeBytes"
                        placeholder="Enter maximum size"
                        value={config?.sensorPin}
                        onChange={(e) =>
                          setConfig((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  sensorPin: Number(e.target.value),
                                }
                              : prev
                          )
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Config
                    </button>
                  </form>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempSensorSettings;
