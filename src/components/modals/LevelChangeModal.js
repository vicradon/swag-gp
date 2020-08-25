import React from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const LevelChangeModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { activeLevel, levels } = useSelector((state) => ({
    activeLevel: state.componentActivity.activeLevel,
    levels: Object.keys(state.studentDetails.levels),
  }));

  const handleAddNextLevel = () => {
    dispatch({ type: "ADD_NEXT_LEVEL" });
  };
  const handleDeleteLevel = (level) => {
    const shouldDeleteLevel = window.confirm("Delete this level?");
    if (shouldDeleteLevel) {
      dispatch({ type: "DELETE_LEVEL", payload: { level } });
      closeModal();
    }
  };
  const handleLevelClick = (level) => {
    dispatch({ type: "SWITCH_LEVEL", payload: { level } });
    closeModal();
  };
  return (
    <div>
      <style>
        {`
            .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.3);
              z-index: 3;
              height: 100%;  
            }
            .level-switcher {
              background-color: white;
              z-index: 4;
              position: fixed;
              left: calc(50% - 200px);
              top: calc(50% - 150px);
              color: #333;
              width: 400px;
              padding: 1rem;
            }
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .levels .level {
              display: flex;
              justify-content: space-between;
              border: 1px solid gray;
              align-items: center;
              margin: 10px 0;
              border-radius: 5px;
              padding: 10px;
            }
            .active {
              background: var(--primary);
              border-color: var(--primary);
              color: white;
            }
            .modal-actions {
              display: flex;
              justify-content: flex-end;
            }
            .add-next {
              background: var(--primary);
              border: 1px solid var(--primary);
              color: white;
              padding: 5px;
            }
            @media(max-width: 450px){
              .level-switcher {
                width: 300px;
                left: calc(50% - 150px);
              }
            }
        `}
      </style>
      <div onClick={closeModal} className="overlay"></div>
      <div className="level-switcher">
        <div className="modal-header">
          <h3>Level Switcher</h3>
          <FaTimes onClick={closeModal} />
        </div>
        <div className="levels">
          {levels.map((level, index) => {
            return (
              <div
                key={index}
                className={`level ${activeLevel === Number(level) && "active"}`}
              >
                <div onClick={() => handleLevelClick(level)}>
                  <span>{level}</span> <span>level</span>
                </div>
                {Number(level) === Number(levels[levels.length - 1]) && level !== 100 ? (
                  <FaTrash
                    onClick={() => handleDeleteLevel(level)}
                    style={{
                      color: "lightcoral",
                      cursor: "pointer",
                      margin: 0,
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal-actions">
          <button onClick={handleAddNextLevel} className="add-next">
            Add Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelChangeModal;
