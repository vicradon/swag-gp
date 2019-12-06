import React from 'react'
import Modal from 'react-modal';
import '../../css/pop-ups.css'


const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

export default function SemesterMenu() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#ff0';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <i onClick={openModal} style={{ fontSize: 35 }} id="expose-levels" className="material-icons add-icon">settings</i>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Semester Menu"
      >

        <div>
          <p>Hello</p>
        </div>


      </Modal>
    </div>
  );
}