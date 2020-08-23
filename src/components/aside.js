import React from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const Aside = () => {
  const [unsavedChanges, toggleUnsavedChanges] = React.useState(false);

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
          toggleUnsavedChanges(false);
        });
    }
  };

  return (
    <aside>
      <i
        style={{ fontSize: 35 }}
        onClick={handleSave}
        id="save-changes"
        className={`material-icons add-icon ${unsavedChanges && "orange"}`}
      >
        save
      </i>
    </aside>
  );
};

export default Aside;
