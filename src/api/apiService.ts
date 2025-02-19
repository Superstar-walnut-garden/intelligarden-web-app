import axios from "axios";
import { Event } from "../Components/EventItem";
import { SchedulerItemProps } from "../Components/SchedulerItem";
import { GPIOItemProps } from "../Components/GPIOItem";

const apiBaseUrl = "/api";

// -----------------------
// Events API
// -----------------------
export const getEventList = async (): Promise<Event[]> => {
  const response = await axios.get<Event[]>(apiBaseUrl + '/getEventList');
  return response.data;
};

export const createEvent = async (newEvent: Event): Promise<void> => {
  await axios.post(apiBaseUrl + '/createEvent', newEvent);
};

export const deleteEvent = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + '/deleteEvent', { id });
};

export const modifyEvent = async (event: Event): Promise<void> => {
  await axios.post(apiBaseUrl + '/modifyEvent', { ...event });
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
  const response = await axios.get<SchedulerItemProps[]>(apiBaseUrl + "/getScheduleList");
  return response.data;
};

export const createSchedule = async (item: SchedulerItemProps): Promise<void> => {
  await axios.post(apiBaseUrl + "/createSchedule", item);
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + "/deleteSchedule", { id });
};

export const modifySchedule = async (
  id: number,
  updatedItem: Partial<SchedulerItemProps>
): Promise<void> => {
  await axios.post(apiBaseUrl + "/modifySchedule", { id, ...updatedItem });
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
export const getSensorList = async (): Promise<any> => {
  const response = await axios.get(apiBaseUrl + "/getSensorList");
  return response.data;
};

export const setSensorList = async (sensorData: any): Promise<void> => {
  await axios.post(apiBaseUrl + "/setSensorList", sensorData, {
    headers: { "Content-Type": "application/json" }
  });
};

// -----------------------
// GPIO API
// -----------------------
export const getGPIOList = async (): Promise<GPIOItemProps[]> => {
  const response = await axios.get<GPIOItemProps[]>(apiBaseUrl + "/getGPIOList");
  return response.data;
};

export const createGPIO = async (item: GPIOItemProps): Promise<void> => {
  await axios.post(apiBaseUrl + "/createGPIO", item);
};

export const deleteGPIO = async (id: number): Promise<void> => {
  await axios.post(apiBaseUrl + "/deleteGPIO", { id });
};

export const modifyGPIO = async (item: GPIOItemProps): Promise<void> => {
  await axios.post(apiBaseUrl + "/modifyGPIO", item);
};