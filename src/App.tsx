import PumpSettings from "./pages/PumpSettings";
import Home from "./pages/Home";
import WifiSettings from "./pages/WifiSettings";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirebaseSettings from "./pages/FirebaseSettings";
import TempSensorSettings from "./pages/TempSensorSettings"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/PumpSettings" element={<PumpSettings/>}/>
        <Route path="/WifiSettings" element={<WifiSettings/>}/>
        <Route path="/FirebaseSettings" element={<FirebaseSettings/>}/>
        <Route path="/TempSensorSettings" element={<TempSensorSettings/>}/>
      </Routes>
    </Router>
  );
}

export default App;
