import React, { useState, useEffect, useCallback } from "react";
import GenericListGroup from "../Components/GenericListGroup";
import TitleBar from "../Components/TitleBar";
import * as ApiService from "../api/apiService";
import {
  SandFlushApiData,
  OperatingState,
  TriggerMode,
} from "../api/apiService";
import SandFlushItem from "../Components/SandFlushItem";

const SandFlushSettings: React.FC = () => {
  const [items, setItems] = useState<SandFlushApiData[]>([]);

  const fetchList = useCallback(async () => {
    try {
      const data = await ApiService.getSandFlushList();
      setItems(data);
    } catch (error) {
      console.error("Error fetching SandFlush list:", error);
    }
  }, []);

  useEffect(() => {
    fetchList();

    const intervalId = window.setInterval(fetchList, 3000);

    return () => window.clearInterval(intervalId);
  }, [fetchList]);

  const deleteItem = async (id: number) => {
    try {
      await ApiService.deleteSandFlush(id);
      await fetchList();
    } catch (error) {
      console.error("Error deleting SandFlush item:", error);
    }
  };

  const modifyItem = async (updatedItem: SandFlushApiData) => {
    try {
      await ApiService.modifySandFlush(updatedItem.id, updatedItem);
      await fetchList();
    } catch (error) {
      console.error("Error modifying SandFlush item:", error);
    }
  };

  const createItem = async (newItem: SandFlushApiData) => {
    try {
      await ApiService.createSandFlush(newItem);
      await fetchList();
    } catch (error) {
      console.error("Error creating SandFlush item:", error);
    }
  };

  return (
    <>
      <TitleBar title="SandFlush Pro" />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center align-items-center w-100">
          <GenericListGroup<SandFlushApiData>
            items={items}
            onCreate={createItem}
            onRemove={deleteItem}
            onSave={modifyItem}
            renderItem={(item, onSave, onRemove) => (
              <SandFlushItem item={item} onSave={onSave} onRemove={onRemove} />
            )}
            defaultItemProps={{
              id: 0,
              name: "Untitled SandFlush",
              status: false,

              valveDelay: 0,
              parallelFilterCount: 1,
              minFlushInterval: 0,
              flushInterval: 0,
              flushDuration: 0,
              dwellTime: 0,

              dpSetpoint: 0,
              dp: 0,

              switchSequence: false,
              flushSequenceReversed: false,

              operatingState: OperatingState.Idle,
              backwashingFilterNumber: 0,
              remainingBackwashTime: 0,

              manualFlush: false,
              cancelFlush: false,

              filtrationTimeSinceBackwash: 0,
              triggerMode: TriggerMode.DP,

              logInterval: 0,
              logOnlyOnChange: false,
              loggingEnabled: false,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SandFlushSettings;
