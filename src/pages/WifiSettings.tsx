// src/pages/WifiConfig.tsx
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import WifiConfigForm from '../Components/WifiConfigForm';
import HotspotConfigForm from '../Components/HotspotConfigForm';

const WifiSettings: React.FC = () => {
  const [key, setKey] = useState<string>('connect');

  return (
    <div className="container mt-4">
      <Tabs activeKey={key} onSelect={(k) => setKey(k || 'connect')}>
        <Tab eventKey="connect" title="Connect to Access Point">
          <WifiConfigForm />
        </Tab>
        <Tab eventKey="hotspot" title="Hotspot Setup">
          <HotspotConfigForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default WifiSettings;
