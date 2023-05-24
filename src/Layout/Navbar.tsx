import { useState } from "react";
import { Button } from "react-bootstrap";
import Icons from "components/Icons";

interface Props {
  drawerVisible: boolean;
  setDrawerVisible: (drawerVisible: boolean) => void;
}

function Navbar({ drawerVisible, setDrawerVisible }: Props) {
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  return (
    <div className="w-100 text-dark bg-dark px-3 py-2 shadow d-flex align-items-center justify-content-between">
      {closeButtonVisible ? (
        <Button
          variant="transparent"
          onClick={() => {
            setDrawerVisible(!drawerVisible);
            setCloseButtonVisible(false);
          }}
        >
          <img src={Icons.menuClose} width="20" alt="close menu" />
        </Button>
      ) : (
        <Button
          variant="transparent"
          onClick={() => {
            setDrawerVisible(!drawerVisible);
            setCloseButtonVisible(true);
          }}
        >
          <img src={Icons.menu} alt="menu" />
        </Button>
      )}
      <span className="text-white">SwagGP</span>
    </div>
  );
}

export default Navbar;
