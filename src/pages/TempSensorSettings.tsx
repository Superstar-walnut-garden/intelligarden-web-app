import React, { useState, useEffect } from 'react';
import * as ApiService from "../api/apiService"
import 'bootstrap/dist/css/bootstrap.min.css';

interface SensorData {
  [key: string]: string;
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const encode64BitNumberToBase62 = (num: string) => {
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

const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};

const SensorPage: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [lastData, setLastData] = useState<SensorData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getSensorList();
        const data: SensorData = response;
        if (!deepEqual(lastData, data)) {
          setLastData(data);
          setSensorData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const intervalId = setInterval(fetchData, 2000);
    fetchData();
    return () => clearInterval(intervalId);
  }, [lastData]);

  const saveData = async () => {
    ApiService.setSensorList(sensorData);
  };

  // const showNotification = (message: string) => {
  //   const notification = document.getElementById('save-button');
  //   if (notification) {
  //     notification.textContent = message;
  //     setTimeout(() => {
  //       if (notification) {
  //         notification.textContent = "Save";
  //       }
  //     }, 2000);
  //   }
  // };

  const handleInputChange = (address: string, value: string) => {
    setSensorData({
      ...sensorData,
      [address]: value
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Sensor List</h1>
      <div className="card p-4 mb-4">
        <div className="list-group">
          {Object.entries(sensorData).map(([address, name], index) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              <div className="d-flex flex-column w-70">
                <div className="text-truncate">
                  <span id={address} className={name ? 'text-dark' : 'text-muted'}>
                    ID: {encode64BitNumberToBase62(address)}
                  </span>
                </div>
                <input
                  title='name'
                  type="text"
                  className="form-control mt-2"
                  value={name}
                  data-index={index}
                  onChange={(e) => handleInputChange(address, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button id="save-button" className="btn btn-primary btn-block" onClick={saveData}>Save</button>
    </div>
  );
};

export default SensorPage;
