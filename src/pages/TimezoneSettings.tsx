// src/components/WifiConfigForm.tsx
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import TitleBar from "../Components/TitleBar";

interface FirebaseSettingsData {
  apiKey: string;
  databaseURL: string;
  userEmail: string;
  userPassword: string;
  databaseRootName: string;
  // interval?: string;
}

const TimezoneSettings: React.FC = () => {
  const [firebaseSettingsData, setFirebaseSettingsData] =
    useState<FirebaseSettingsData>({
      apiKey: "",
      databaseURL: "",
      userEmail: "",
      userPassword: "",
      databaseRootName: "",
    });

  useEffect(() => {
    axios
      .get<FirebaseSettingsData>("/getFirebaseData")
      .then((response: AxiosResponse<FirebaseSettingsData>) => {
        setFirebaseSettingsData(response.data);
        if (
          firebaseSettingsData.apiKey === "" &&
          firebaseSettingsData.databaseURL === "" &&
          firebaseSettingsData.userEmail === "" &&
          firebaseSettingsData.userPassword === "" &&
          firebaseSettingsData.databaseRootName === ""
        ) {
          setFirebaseEnabled(false);
        }
      });
  }, []);
  const [firebaseEnabled, setFirebaseEnabled] = useState<boolean>(false);

  const handleSave = () => {
    const payload = {
      apiKey: firebaseSettingsData.apiKey,
      databaseURL: firebaseSettingsData.databaseURL,
      userEmail: firebaseSettingsData.userEmail,
      userPassword: firebaseSettingsData.userPassword,
      databaseRootName: firebaseSettingsData.databaseRootName,
    };

    console.log("Payload:", payload); // Debugging line

    axios
      .post("/setFirebaseData", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse) => {
        console.log("Firebase config saved:", response.data);
      });
  };

  return (
    <>
      {" "}
      <TitleBar title="Firebase Settings" />
      <Form className="mt-3">
        <>
          <Form.Group as={Row} controlId="formFirebase">
            <Form.Label column sm={2}>
              Data Logging is {firebaseEnabled ? "Enabled" : "Disabled"}
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="switch"
                checked={firebaseEnabled}
                onChange={handleEnableToggle}
              />
            </Col>
          </Form.Group>
          {firebaseEnabled && (
            <>
              <Form.Group as={Row} controlId="formApiKey">
                <Form.Label column sm={2}>
                  apiKey
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={firebaseSettingsData.apiKey || ""}
                    onChange={(e) =>
                      setFirebaseSettingsData({
                        ...firebaseSettingsData,
                        apiKey: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formDatabaseURL">
                <Form.Label column sm={2}>
                  databaseURL
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={firebaseSettingsData.databaseURL || ""}
                    onChange={(e) =>
                      setFirebaseSettingsData({
                        ...firebaseSettingsData,
                        databaseURL: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formUserEmail">
                <Form.Label column sm={2}>
                  userEmail
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={firebaseSettingsData.userEmail || ""}
                    onChange={(e) =>
                      setFirebaseSettingsData({
                        ...firebaseSettingsData,
                        userEmail: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formUserPassword">
                <Form.Label column sm={2}>
                  userPassword
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={firebaseSettingsData.userPassword || ""}
                    onChange={(e) =>
                      setFirebaseSettingsData({
                        ...firebaseSettingsData,
                        userPassword: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formDatabaseRootName">
                <Form.Label column sm={2}>
                  databaseRootName
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={firebaseSettingsData.databaseRootName || ""}
                    onChange={(e) =>
                      setFirebaseSettingsData({
                        ...firebaseSettingsData,
                        databaseRootName: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </>
          )}
        </>

        <Button variant="primary" onClick={handleSave} className="mt-3">
          Apply / Save
        </Button>
      </Form>
    </>
  );
};

export default TimezoneSettings;
