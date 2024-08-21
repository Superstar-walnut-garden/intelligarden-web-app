import "bootstrap/dist/css/bootstrap.min.css";
import "./WeekSelector.css";
import HomeButton from "./HomeButton";

interface TitleBarProps {
  title?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title = "Unnamed Title" }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-bottom mb-4">
        <HomeButton />
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <h1 className=" text-center">{title}</h1>
        </div>
      </div>
    </>
  );
};

export default TitleBar;
