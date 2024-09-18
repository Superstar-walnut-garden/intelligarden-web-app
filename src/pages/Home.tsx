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
        <Widget title="Temperature Sensor Setup" info="Setup your sensors" link="/" bgColor="#e8f5e9" />
        <Widget title="Firebase Settings" info="Configure Firebase" link="/FirebaseSettings" bgColor="#fff3e0" />
        <Widget title="Water Sensor Settings" info="Pond Inlet Water Data Logging" link="/" bgColor="#a3dafd" />
        <Widget title="Display Settings" info="Choose which items to be displayed" link="/" bgColor="#f3e5f5" />
        <Widget title="Soil Sensor Settings" info="Setup Soil Moisture Sensors" link="/" bgColor="#aaebee" />
        <Widget title="Setup Slave Nodes" info="Connect to other esp32 nodes" link="/" bgColor="#ffee99" />
        <Widget title="Setup Valves" info="Connect to a Wired / Wireless Valve" link="/" bgColor="#ffcc99" />
        <Widget title="System Region" info="Configure System Timezone" link="/" bgColor="#cccc99" />
      </div>
    </div>
    </>
  );
};

export default Home;
