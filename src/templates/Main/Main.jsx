import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useState, useEffect, useRef } from "react";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import Drawer from "./Drawer";

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

  const mainChildrenMarginLeft = (() => {
    if (width < 768) return 0;
    return sidenavOpen ? 200 : 50;
  })();

  return (
    <div>
      {width < 768 && (
        <div className="fixed-top">
          <Navbar
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        </div>
      )}

      {drawerVisible && (
        <Drawer
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
      )}

      {width > 768 && (
        <div className="position-fixed left-0">
          <Sidenav
            sidenavOpen={sidenavOpen}
            setSidenavVisible={setSidenavVisible}
          />
        </div>
      )}

      <div
        style={{
          marginLeft: `${mainChildrenMarginLeft}px`,
          marginTop: `${width < 768 ? 50 : 0}px`,
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
