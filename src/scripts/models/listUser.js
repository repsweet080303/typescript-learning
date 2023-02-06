import getUsers from '../services/users';

export default class {
  constructor() {
    this.users = [];
  }

 /**
  * function getAllUser get Array users
  * by getUsers and assign them to users
  * @returns {Object} data - transmission data
  */
   async get() {
      const response = await getUsers();
      this.users = response.data;
      
      return response
  }

  /**
   * function searchUsers
   * @param {String} data - value input search
   * @returns {Array} response - list transmission data
   */
   search(data) {
      return this.users.filter((user) => user.name.toLowerCase().includes(data));
  }
}
