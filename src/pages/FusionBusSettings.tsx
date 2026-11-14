import React, { useState, useEffect } from "react";
import GenericListGroup from "../Components/GenericListGroup";
import TitleBar from "../Components/TitleBar";
import VentDriveItem from "../Components/VentDriveItem";
import * as ApiService from "../api/apiService";
import { FusionBusApiData } from "../api/apiService";
import TempSensorItem from "../Components/TempSensorItem";

const FusionBusSettings: React.FC = () => {
  const [items, setItems] = useState<ApiService.FusionBusApiData[]>([]);
  useEffect(() => {
    const intervalId = setInterval(fetchList, 3000);
    fetchList();
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // useEffect(() => {
  //   setItems(
  //     items.filter((item) => {
  //       if (item.type === "VentDrive") {
  //         return item;
  //       }
  //     })
  //   );
  // }, [items]);

  const fetchList = async () => {
    try {
      const data = await ApiService.getFusionBusList();
      setItems(data);
      // setItems(
      //   items.filter((item) => {
      //     if (item.type === "VentDrive") {
      //       return item;
      //     }
      //   })
      // );
    } catch (error) {
      console.error("Error fetching Sensor list:", error);
    }
  };

  const deleteSensor = async (id: string) => {
    try {
      await ApiService.deleteFusionBusItem(id);
    } catch (error) {
      console.error("Error deleting Sensor:", error);
    }
    fetchList(); //get updated list
  };

  const modifySensor = async (updatedItem: FusionBusApiData) => {
    try {
      await ApiService.modifyFusionBusItem(updatedItem.id, updatedItem);
    } catch (error) {
      console.error("Error modifying Sensor:", error);
    }
    fetchList(); // get updated list
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <TitleBar title="FusionBus Devices" />
        <div className="d-flex justify-content-center align-items-center">
          <GenericListGroup<ApiService.FusionBusApiData>
            items={items}
            onCreate={() => {}}
            onRemove={deleteSensor}
            onSave={modifySensor}
            renderItem={(item, onSave, onRemove) => {
              if (item.type === "VentDrive") {
                return (
                  <VentDriveItem
                    item={item}
                    devices={items}
                    onSave={onSave}
                    onRemove={onRemove}
                  />
                );
              } else if (item.type === "TempSensor") {
                return (
                  <TempSensorItem
                    item={item}
                    onSave={onSave}
                    onRemove={onRemove}
                  />
                );
              }
              return (
                <div className="d-flex align-items-center justify-content-between p-2">
                  <span>
                    {item.name} ({item.type})
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSensor(item.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            }}
            defaultItemProps={{
              id: "",
              name: "Untitled Sensor",
              status: false,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FusionBusSettings;
