import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  Box,
  Flex
} from '@chakra-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DragAndDrop from './DragAndDrop';
import uploadPhoto from '../http/upload_photo';

const ImgUploadModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = React.useState('Drag and drop file here');
  const [file, setFile] = React.useState();

  const uploadImg = async () => {
    const data = new FormData();
    data.append('profilePhoto', file);
    const response = await uploadPhoto(data);
    if (response.status === 'success') {
      toast.success('Successfully uploaded profile picture');
    } else {
      toast.error(response);
    }
  };

  const handleUpload = (e) => {
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    if (types.includes(e.target.files[0].type)) {
      setFile(e.target.files[0]);
      setMessage('Drag and drop file here');
    } else {
      setMessage(`${e.target.files[0].type} is not supported`);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload new profile picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            {/* <form onSubmit={uploadImg}> */}
            <DragAndDrop setMessage={setMessage} setFile={setFile}>
              {
                <Box my="2rem" py="2rem" border="1px dashed gray">
                  {message}
                </Box>
              }
            </DragAndDrop>
            <Flex justify="center" alignItems="center">
              <label>
                <p>Or Select directly</p>
                <input onChange={handleUpload} type="file" />
              </label>
            </Flex>

            <Button
              isloading="false"
              loadingText="Uploading"
              mt="2rem"
              variantColor="blue"
              isDisabled={file === undefined}
              onClick={uploadImg}
            >
              Upload
            </Button>
            {/* </form> */}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

ImgUploadModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default ImgUploadModal;
