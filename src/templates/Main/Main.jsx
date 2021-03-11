import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useState, useEffect, useRef } from "react";
import Sidenav from "./Sidenav";
import styles from "./styles.module.css";
// import { css, jsx } from "@emotion/react";

function Main({ children }) {
  const [sidenavOpen, setSidenavVisible] = useState(
    localStorage.getItem("window_width") > 768
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { width } = useWindowSize();
  const drawerRef = useRef();
  useOnClickOutside(drawerRef, () => setDrawerVisible(false));

  useEffect(() => {
    if (width !== undefined) {
      localStorage.setItem("window_width", width);
      setSidenavVisible(width > 768);
    }
  }, [width]);

  return (
    <div>
      <div className="position-fixed left-0">
        <Sidenav
          sidenavOpen={sidenavOpen}
          setSidenavVisible={setSidenavVisible}
        />
      </div>

      <div
        style={{
          marginLeft: `${sidenavOpen ? 200 : 50}px`,
          transition: "margin .2s",
        }}
        className="p-4"
      >
        {children}
      </div>
    </div>
  );
}

export default Main;
