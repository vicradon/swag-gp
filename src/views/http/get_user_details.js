import axios from 'axios';

const getUserDetails = async (id, token) => {
  // const { _id, token } = JSON.parse(localStorage.getItem('smefund-user'));
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
      method: 'get',
      url: `https://smefundapi.herokuapp.com/api/v1/user/${id}`,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        token
      }
    };
    response = await client(options);
  } catch (error) {
    response = error.message;
  }
  return response;
};

export default getUserDetails;

