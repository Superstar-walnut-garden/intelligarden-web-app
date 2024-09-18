// src/components/WifiConfigForm.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface WifiState {
  ssid: string;
  password: string;
  dhcpEnabled: boolean;
  ip?: string;
  subnet?: string;
  gateway?: string;
  primaryDNS?: string;
  secondaryDNS?: string;
}

const WifiConfigForm: React.FC = () => {
  const [wifiState, setWifiState] = useState<WifiState>({
    ssid: '',
    password: '',
    dhcpEnabled: true,
  });
  const [dhcpEnabled, setDhcpEnabled] = useState<boolean>(true);

  useEffect(() => {
    axios.get<WifiState>('/getWifiState').then((response: AxiosResponse<WifiState>) => {
      setWifiState(response.data);
      // setDhcpEnabled(response.data.dhcpEnabled);
    });
  }, []);

  const handleDhcpToggle = () => {
    setDhcpEnabled(!dhcpEnabled);
  };

  const handleSaveWifiConfig = () => {
    const payload = {
      ssid: wifiState.ssid,
      password: wifiState.password,
      dhcpEnabled,
      ip: dhcpEnabled ? '' : wifiState.ip,
      gateway: dhcpEnabled ? '' : wifiState.gateway,
      subnet: dhcpEnabled ? '' : wifiState.subnet,
      primaryDNS: dhcpEnabled ? '' : wifiState.primaryDNS,
      secondaryDNS: dhcpEnabled ? '' : wifiState.secondaryDNS
    };

    console.log('Payload:', payload); // Debugging line

    axios.post('/setWifiConfig', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: AxiosResponse) => {
      console.log('WiFi config saved:', response.data);
    });
  };

  return (
    <Form className="mt-3">
      <Form.Group as={Row} controlId="formSsid">
        <Form.Label column sm={2}>SSID</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            value={wifiState.ssid || ''}
            onChange={(e) => setWifiState({ ...wifiState, ssid: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPassword">
        <Form.Label column sm={2}>Password</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            value={wifiState.password || ''}
            onChange={(e) => setWifiState({ ...wifiState, password: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formDhcp">
        <Form.Label column sm={2}>DHCP</Form.Label>
        <Col sm={10}>
          <Form.Check
            type="switch"
            checked={dhcpEnabled}
            onChange={handleDhcpToggle}
          />
        </Col>
      </Form.Group>
      {!dhcpEnabled && (
        <>
          <Form.Group as={Row} controlId="formIp">
            <Form.Label column sm={2}>IP Address</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={wifiState.ip || ''}
                onChange={(e) => setWifiState({ ...wifiState, ip: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formSubnet">
            <Form.Label column sm={2}>Subnet Mask</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={wifiState.subnet || ''}
                onChange={(e) => setWifiState({ ...wifiState, subnet: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGateway">
            <Form.Label column sm={2}>Gateway</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={wifiState.gateway || ''}
                onChange={(e) => setWifiState({ ...wifiState, gateway: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPrimaryDNS">
            <Form.Label column sm={2}>Primary DNS</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={wifiState.primaryDNS || ''}
                onChange={(e) => setWifiState({ ...wifiState, primaryDNS: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formSecondaryDNS">
            <Form.Label column sm={2}>Secondary DNS</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={wifiState.secondaryDNS || ''}
                onChange={(e) => setWifiState({ ...wifiState, secondaryDNS: e.target.value })}
              />
            </Col>
          </Form.Group>
        </>
      )}
      <Button variant="primary" onClick={handleSaveWifiConfig} className="mt-3">
        Save
      </Button>
    </Form>
  );
};

export default WifiConfigForm;
