import axios from "axios";
import { Event } from "../Components/EventItem";
import { SchedulerItemProps } from "../Components/SchedulerItem";
import { GPIOItemProps } from "../Components/GPIOItem";

const apiBaseUrl = "/api";

// -----------------------
// Display API
// -----------------------


// -----------------------
// Events API
// -----------------------
export const getEventList = async (): Promise<Event[]> => {
  const response = await axios.get<Event[]>(apiBaseUrl + '/Event/get');
  return response.data;
};

export const createEvent = async (newEvent: Event): Promise<void> => {
  await axios.post(apiBaseUrl + '/Event/create', newEvent);
};

export const deleteEvent = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + '/Event/delete', { id });
};

export const modifyEvent = async (event: Event): Promise<void> => {
  await axios.post(apiBaseUrl + '/Event/modify', { ...event });
};

// -----------------------
// Firebase API
// -----------------------
export interface FirebaseSettingsData {
  apiKey: string;
  databaseURL: string;
  userEmail: string;
  userPassword: string;
  databaseRootName: string;
  enabled: boolean;
}

export const getFirebaseData = async (): Promise<FirebaseSettingsData> => {
  const response = await axios.get<FirebaseSettingsData>(apiBaseUrl + "/getFirebaseData");
  return response.data;
};

export const setFirebaseData = async (payload: FirebaseSettingsData): Promise<void> => {
  await axios.post(apiBaseUrl + "/setFirebaseData", payload, {
    headers: { "Content-Type": "application/json" }
  });
};

// -----------------------
// Wifi API
// -----------------------
export interface WifiState {
  ssid: string;
  password: string;
  dhcpEnabled: boolean;
  ip?: string;
  subnet?: string;
  gateway?: string;
  primaryDNS?: string;
  secondaryDNS?: string;
}

export const getWifiState = async (): Promise<WifiState> => {
  const response = await axios.get<WifiState>(apiBaseUrl + "/getWifiState");
  return response.data;
};

export const setWifiConfig = async (payload: WifiState): Promise<void> => {
  await axios.post(apiBaseUrl + "/setWifiConfig", payload, {
    headers: { "Content-Type": "application/json" }
  });
};

// -----------------------
// Hotspot API
// -----------------------
export interface HotspotConfig {
  ssid: string;
  password: string;
}

export const getHotspotConfig = async (): Promise<HotspotConfig> => {
  const response = await axios.get<HotspotConfig>(apiBaseUrl + "/getHotspotConfig");
  return response.data;
};

export const setHotspotConfig = async (payload: HotspotConfig): Promise<void> => {
  await axios.post(apiBaseUrl + "/setHotspotConfig", payload, {
    headers: { "Content-Type": "application/json" }
  });
};

// -----------------------
// Schedule API
// -----------------------
export const getScheduleList = async (): Promise<SchedulerItemProps[]> => {
  const response = await axios.get<SchedulerItemProps[]>(apiBaseUrl + "/Scheduler/get");
  return response.data;
};

export const createSchedule = async (item: SchedulerItemProps): Promise<void> => {
  await axios.post(apiBaseUrl + "/Scheduler/create", item);
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + "/Scheduler/delete", { id });
};

export const modifySchedule = async (
  id: number,
  updatedItem: Partial<SchedulerItemProps>
): Promise<void> => {
  await axios.post(apiBaseUrl + "/Scheduler/modify", { id, ...updatedItem });
};

// -----------------------
// Current Time API
// -----------------------
export interface CurrentTimeData {
  time: string;
  weekday: string;
}

export const getCurrentTime = async (): Promise<CurrentTimeData> => {
  const response = await axios.get<CurrentTimeData>(apiBaseUrl + "/getCurrentTime");
  return response.data;
};

// -----------------------
// Sensor API
// -----------------------
export interface TempSensorApiData {
  id: number;
  name: string;
  status: boolean;
  temp: number;
}

export const getSensorList = async (): Promise<any> => {
  const response = await axios.get(apiBaseUrl + "/TempSensor/get");
  return response.data;
};

export const deleteSensor = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + "/TempSensor/delete", { id });
};

export const modifySensor = async (item: TempSensorApiData): Promise<void> => {
  await axios.post(apiBaseUrl + "/TempSensor/modify", item);
};

// -----------------------
// GPIO API
// -----------------------
export const getGPIOList = async (): Promise<GPIOItemProps[]> => {
  const response = await axios.get<GPIOItemProps[]>(apiBaseUrl + "/GPIO/get");
  return response.data;
};

export const createGPIO = async (item: GPIOItemProps): Promise<void> => {
  await axios.post(apiBaseUrl + "/GPIO/create", item);
};

export const deleteGPIO = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + "/GPIO/delete", { id });
};

export const modifyGPIO = async (item: GPIOItemProps): Promise<void> => {
  await axios.post(apiBaseUrl + "/GPIO/modify", item);
};

// -----------------------
// Display API
// -----------------------
export interface DisplayConfig {
  type: string;
}

export const getDisplayConfig = async (): Promise<DisplayConfig> => {
  const response = await axios.get<DisplayConfig>(apiBaseUrl + "/getDisplayConfig");
  return response.data;
};

export const setDisplayConfig = async (config: DisplayConfig): Promise<void> => {
  await axios.post(apiBaseUrl + "/setDisplayConfig", config);
};

// -----------------------
// Thermostat API
// -----------------------
export interface ThermostatApiData {
  id: number;
  event_id: number;
  heaterEvent_id: number;
  coolerEvent_id: number;
  sensor: string;
  name: string;
  setpoint: number;
  altSetpoint: number;
  hysteresis: number;
  offset: number;
  status: boolean;
  enabled: boolean;
}

export const getThermostatList = async (): Promise<ThermostatApiData[]> => {
  const response = await axios.get<ThermostatApiData[]>(apiBaseUrl + "/Thermostat/get");
  return response.data;
};

export const createThermostate = async (item: ThermostatApiData): Promise<void> => {
  await axios.post(apiBaseUrl + "/Thermostat/create", item);
};

export const deleteThermostat = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + "/Thermostat/delete", { id });
};

export const modifyThermostat = async (item: ThermostatApiData): Promise<void> => {
  await axios.post(apiBaseUrl + "/Thermostat/modify", item);
};