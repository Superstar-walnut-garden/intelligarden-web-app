import React from "react";
import Widget from "../Components/Widget";
import TitleBar from "../Components/TitleBar";

const Home = () => {
  return (
    <>
    <TitleBar title="Intelligarden Hub"/>
    <div className="container">
      <div className="row">
        <Widget title="Pump Settings" info="Configure your pump" link="/pumpsettings" bgColor="#e3f2fd" />
        <Widget title="WiFi Settings" info="Connected to Superstar-garden 2.4" link="/wifisettings" bgColor="#ffebee" />
        <Widget title="Temperature Sensor Setup" info="Setup your sensors" link="/temperature-sensor-setup" bgColor="#e8f5e9" />
        <Widget title="Firebase Settings" info="Configure Firebase" link="/firebase-settings" bgColor="#fff3e0" />
        <Widget title="Display Settings" info="Adjust display" link="/display-settings" bgColor="#f3e5f5" />
      </div>
    </div>
    </>
    
  );
};

export default Home;
