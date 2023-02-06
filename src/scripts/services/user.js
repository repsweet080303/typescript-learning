import axiosConfig from './axiosConfig';
import ENDPOINT_API from '../constants/apiEndpoint';

const userURL = ENDPOINT_API.USER_API;

/**
 * function createUser  use method POST
 * new user to data
 * @param {Object} user with more information
 * @returns {Object} data - transmission data
 */
export const createUser = async (data) => {
  try {
    const response = await axiosConfig.post(userURL, data);

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

/**
 * function getUserById with method GET
 * @param {Number} id - id of user
 * @returns {Object} data - transmission data
 */
export const getUserById = async (id) => {
  try {
    const response = await axiosConfig.get(`${userURL}/${id}`);

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

/**
 * function updateUser use PATCH method
 * to update user to data
 * @param {Number} id - id of user
 * @param {Object} data - object to update information user
 * @returns {Object} data - transmission data
 */
export const updateUserById = async (id, data) => {
  try {
    const response = await axiosConfig.patch(`${userURL}/${id}`, data);

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

/**
 * function deleteUserById
 * @param {String} id - id of user
 * @returns {Object} data - transmission data
 */
export const deleteUserById = async (id) => {
  try {
    const response = await axiosConfig.delete(`${userURL}/${id}`);

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
