import axiosConfig from './axiosConfig';
import ENDPOINT_API from '../constants/apiEndpoint';

const userURL = ENDPOINT_API.USER_API;

/**
 * function getUsers get data from Json server
 * @returns {Object} data - transmission data
 */
const getUsers = async () => {
  try {
    const response = await axiosConfig.get(userURL);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export default getUsers;
