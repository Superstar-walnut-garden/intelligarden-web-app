import React, { useState, useEffect } from "react";
import GenericListGroup from "../Components/GenericListGroup";
import TitleBar from "../Components/TitleBar";
import * as ApiService from "../api/apiService";
import { SandFlushApiData } from "../api/apiService";
import SandFlushItem from "../Components/SandFlushItem";

const SandFlushSettings: React.FC = () => {
  const [items, setItems] = useState<ApiService.SandFlushApiData[]>([]);
  useEffect(() => {
    const intervalId = setInterval(fetchList, 3000);
    fetchList();
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchList = async () => {
    try {
      const data = await ApiService.getSandFlushList();
      setItems(data);
      // setItems(
      //   items.filter((item) => {
      //     if (item.type === "VentDrive") {
      //       return item;
      //     }
      //   })
      // );
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await ApiService.deleteFusionBusItem(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    fetchList(); //get updated list
  };

  const modifyItem = async (updatedItem: SandFlushApiData) => {
    try {
      await ApiService.modifySandFlush(updatedItem.id, updatedItem);
    } catch (error) {
      console.error("Error modifying item:", error);
    }
    fetchList(); // get updated list
  };

  return (
    <>
      <div className="flex-d align-items-center">
        <TitleBar title="SandFlush Pro" />
        <div className="d-flex justify-content-center align-items-center">
          <GenericListGroup<SandFlushApiData>
            items={items}
            onCreate={() => {}}
            onRemove={deleteItem}
            onSave={modifyItem}
            renderItem={(item, onSave, onRemove) => {
              return (
                <SandFlushItem
                  item={item}
                  onSave={onSave}
                  onRemove={onRemove}
                />
              );
            }}
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

export default SandFlushSettings;
