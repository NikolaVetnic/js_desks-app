import { useEffect, useState } from "react";
import { Button, ButtonToolbar, OverlayTrigger } from "react-bootstrap";
import "./DeskContainer.css";
import { AvailableTooltip } from "../../Tooltip/Tooltips";
import DropdownMenu from "../../DropdownMenu";
import SelectedDeskDisplay from "../SelectedDeskDisplay";
import getDesksByLocationFromDb from "../../../../utils/db/getDesksByLocationFromDb";

const menuOptions = [
  { value: "", label: "- choose option -" },
  { value: "hd", label: "Heidelberg" },
  { value: "md", label: "Magdeburg" },
  { value: "ns", label: "Novi Sad" },
];

const DeskContainer = () => {
  const [location, setLocation] = useState("");
  const [desks, setDesks] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setSelectedDesk(null);
    console.log(`Location changed to ${event.target.value}`);
  };

  useEffect(() => {
    handleDesks();
  }, [location]);

  const handleDesks = async () => {
    // TODO: [JSSBG-28] display real desks from database
    try {
      const result = await getDesksByLocationFromDb(location);
      const desksData = result || [];
      setDesks(desksData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalOpen = (item) => {
    setSelectedDesk(item);
  };

  const positionerInstance = (item) => {
    return (
      <ButtonToolbar>
        <OverlayTrigger placement="top" overlay={AvailableTooltip}>
          <Button
            onClick={() => handleModalOpen(item)}
            variant="success"
            className="flexbox-item"
          ></Button>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  };

  return (
    <>
      <DropdownMenu
        value={location}
        options={menuOptions}
        onChange={handleLocationChange}
      />

      <div className="flexbox-container mt-3">
        <div className="rowChild">
          {location && desks.map((item, index) => {
            if (location === item.location) {
              return (
                <div key={index}>
                  {positionerInstance(item)}
                </div>
              );
            }
          })}
        </div>
      </div>

      {!!selectedDesk && <SelectedDeskDisplay {...selectedDesk} />}
    </>
  );
};

export default DeskContainer;