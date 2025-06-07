import Widget from "../Components/Widget";
import TitleBar from "../Components/TitleBar";

const Home = () => {
  return (
    <>
    <TitleBar title="Intelligarden Hub"/>
    <div className="container">
      <div className="row">
        <Widget title="WiFi Settings" info="Change WiFi or Hotspot settings" link="/wifisettings" bgColor="#ffebee" />
        <Widget title="Manage Schedulers" info="Schedule your irrigation, lighting and etc..." link="/pumpsettings" bgColor="#e3f2fd" />
        <Widget title="Temperature Sensor Setup" info="Setup your sensors" link="/TempSensorSettings" bgColor="#e8f5e9" />
        <Widget title="Manage Thermostats" info="Setup your Temperature Controllers" link="/thermostat-manager" bgColor="#ffaaaa" />
        <Widget title="Firebase Settings" info="Configure Firebase" link="/FirebaseSettings" bgColor="#fff3e0" />
        <Widget title="Water Sensor Settings" info="Pond Inlet Water Data Logging" link="/" bgColor="#a3dafd" />
        <Widget title="Display Settings" info="Config Display Properties" link="/DisplaySettings" bgColor="#f3e5f5" />
        <Widget title="Soil Sensor Settings" info="Setup Soil Moisture Sensors" link="/" bgColor="#aaebee" />
        <Widget title="Setup Slave Nodes" info="Connect to other esp32 nodes" link="/" bgColor="#ffee99" />
        <Widget title="Setup Valves" info="Connect to a Wired / Wireless Valve" link="/" bgColor="#ffcc99" />
        <Widget title="System Region" info="Configure System Timezone" link="/timezone-settings" bgColor="#cccc99" />
        <Widget title="Event Manager" info="Link Subsystems Based on Events" link="/event-manager" bgColor="#cccc66" />
        <Widget title="Manage I/Os" info="Setup GPIOs and link them to events!" link="/pin-manager" bgColor="#bbdd88" />
      </div>
    </div>
    </>
  );
};

export default Home;
