import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PumpSettings from "./pages/PumpSettings";
import Home from "./pages/Home";
import WifiSettings from "./pages/WifiSettings";
import FirebaseSettings from "./pages/FirebaseSettings";
import TempSensorSettings from "./pages/TempSensorSettings";
import EventManagerPage from './pages/EventManagerPage';

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
      </Routes>
    </Router>
  );
};

export default App;
