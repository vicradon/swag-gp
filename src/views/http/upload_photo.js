import axios from 'axios';

const uploadPhoto = async (data) => {
  const client = axios.create();

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      throw new Error(err.response.data.message);
    }
  );

  let response;
  try {
    const options = {
      method: 'post',
      url: 'https://smefundapi.herokuapp.com/api/v1/user/avatar',
      timeout: 30000,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    response = await client(options);
  } catch (error) {
    response = error.message;
  }
  return response;
};

export default uploadPhoto;
