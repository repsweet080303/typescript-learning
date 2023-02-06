import {
  createUser, getUserById, updateUserById, deleteUserById,
} from '../services/user';

export default class User {

  /**
   * function addUser
   * @param {String} username - input value
   * @returns {Object} user - object information user
   */
  async add(username) {
      const user = {
        avatar: '',
        name: username,
        isActive: false,
        email: '',
        description: '',
        registered: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      
      return await createUser(user);
  }

  /**
   * function getUserInfo
   * @param {Number} id - id user
   * @returns {Object} data - data transmission
   */
   async getUserInfo(id) {

       return await getUserById(id);
  }

 /**
  * function updateUser
  * @param {Number} id - id user
  * @param {Object} data - data update user
  * @returns {Object} data - data transmission
  */

   async update(id, data) {
      const updatedUser = {
        ...data,
        lastUpdated: new Date().toString(),
      };

      return await updateUserById(id, updatedUser);
  }

 /**
  * function deleteUser
  * @param {Number} id - id user
  * @returns {Object} data - data transmission
  */
   async delete(id) {

    return await deleteUserById(id);
  }
}
