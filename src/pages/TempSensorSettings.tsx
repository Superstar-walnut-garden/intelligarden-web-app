import React, { useState, useEffect } from "react";
import GenericListGroup from "../Components/GenericListGroup";
import TitleBar from "../Components/TitleBar";
import TempSensorItem from "../Components/TempSensorItem"
import * as ApiService from "../api/apiService";
import { TempSensorApiData } from "../api/apiService";

const TempSensorSettings: React.FC = () => {
  const [items, setItems] = useState<TempSensorApiData[]>([]);
  useEffect(() => {
      const intervalId = setInterval(fetchList, 2000);
      fetchList();
      return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

  const fetchList = async () => {
    try {
      const data = await ApiService.getSensorList();
      setItems(data);
    } catch (error) {
      console.error('Error fetching Sensor list:', error);
    }
  };

  const deleteSensor = async (id: number) => {
    try {
      await ApiService.deleteSensor(id);
    } catch (error) {
      console.error('Error deleting Sensor:', error);
    }
    fetchList(); //get updated list
  };

  const modifySensor = async (updatedItem: TempSensorApiData) => {
    try {
      await ApiService.modifySensor(updatedItem);
    } catch (error) {
      console.error('Error modifying Sensor:', error);
    }
    fetchList(); // get updated list
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <TitleBar title="Manage Temp Sensors" />
        <div className="d-flex justify-content-center align-items-center">
          <GenericListGroup
            items={items}
            onCreate={()=>{}}
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
        </div>
      </div>
    </>
  );
};

export default TempSensorSettings;