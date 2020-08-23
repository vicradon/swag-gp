import React from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../hooks/useWindowSize";
import { db } from "../firebase";
import { FaSave, FaExchangeAlt } from "react-icons/fa";
import LevelChangeModal from "./modals/LevelChangeModal";

const Aside = () => {
  const size = useWindowSize();
  const [levelChangeModalOpen, setLevelChanageModalOpen] = React.useState(
    false
  );

  const { authenticated, uid, componentActivity, levels } = useSelector(
    (state) => {
      return {
        authenticated: state.auth.authenticated,
        uid: state.auth.userDetails && state.auth.userDetails.uid,
        levels: state.levels,
        componentActivity: state.componentActivity,
      };
    }
  );

  const handleSave = () => {
    if (authenticated) {
      db.collection("users")
        .doc(uid)
        .set({ componentActivity, levels })
        .then(() => {
          console.log("saved");
          // toggleUnsavedChanges(false);
        });
    }
  };

  return (
    <aside>
      {levelChangeModalOpen && <LevelChangeModal closeModal={() => setLevelChanageModalOpen(false)} />}
      <FaSave size={size.width > 600 ? 30 : 20} onClick={handleSave} />
      <FaExchangeAlt
        size={size.width > 600 ? 30 : 20}
        onClick={() => setLevelChanageModalOpen(true)}
      />
    </aside>
  );
};

export default Aside;
