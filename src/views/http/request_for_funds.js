import axios from 'axios';

const requestForFunds = async (data) => {
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
      url: 'https://smefundapi.herokuapp.com/api/v1/fundRequest',
      timeout: 30000,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    response = await client(options);
  } catch (error) {
    response = error.message;
  }
  return response;
};

export default requestForFunds;
