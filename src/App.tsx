import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PumpSettings from "./pages/PumpSettings";
import Home from "./pages/Home";
import WifiSettings from "./pages/WifiSettings";
import FirebaseSettings from "./pages/FirebaseSettings";
import TempSensorSettings from "./pages/TempSensorSettings";
import EventManagerPage from './pages/EventManagerPage';
import PinManagerPage from './pages/PinManagerPage';
import DisplaySettings from './pages/DisplaySettings';
import ThermostatManagerPage from './pages/ThermostatManagerPage';
import TimezoneSettings from './pages/TimezoneSettings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/PumpSettings" element={<PumpSettings/>}/>
        <Route path="/WifiSettings" element={<WifiSettings/>}/>
        <Route path="/FirebaseSettings" element={<FirebaseSettings/>}/>
        <Route path="/TempSensorSettings" element={<TempSensorSettings/>}/>
        <Route path="/event-manager" element={<EventManagerPage/>}/>
        <Route path="/Pin-manager" element={<PinManagerPage/>}/>
        <Route path="/DisplaySettings" element={<DisplaySettings/>}/>
        <Route path="thermostat-manager" element={<ThermostatManagerPage/>}/>
        <Route path="timezone-settings" element={<TimezoneSettings/>}/>
        <Route path="*" element={<Home/>}/> {/* Fallback route */}
      </Routes>
    </Router>
  );
};

export default App;
