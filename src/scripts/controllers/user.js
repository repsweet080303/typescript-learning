import API_ERROR_MESSAGES from '../constants/messages';

export default class Controller {
  /**
   * @param {Object} listUser - A users instance
   * @param {Object} user - A user instance
   * @param {Object} userView - A userView instance
   * @param {Object} listUserView - A userView instance
   */
  constructor(listUser, user, userView, listUserView) {
    this.listUser = listUser;
    this.user = user;
    this.userView = userView;
    this.listUserView = listUserView;

    // bind event toggle option add new user
    this.userView.bindOpenOption();
    this.userView.bindCloseOption();

    // bind event toggle search input
    this.listUserView.bindOpenSearch();
    this.listUserView.bindCloseSearch();

    // bind event search user
    this.listUserView.bindSearchUsers(this.handleSearchUsers.bind(this));

    // bind event select navbar
    this.userView.bindSelectNav();

    // bind event select user
    this.userView.bindSelectUser(this.handleEditUser.bind(this));

    // bind event toggle modal input user name
    this.userView.bindOpenModal();
    this.userView.bindCloseModal();

    // bind event add user
    this.userView.bindAddUser(this.handleAddUser.bind(this));
  }

  /**
   * handle event render view
   */
  async handleRenderView() {
    const response = await this.listUser.get();

    if (response.error) {
      this.userView.bindTogglePopup(API_ERROR_MESSAGES.GET_API);
      return;
    }
      this.listUserView.renderTable(response.data);
  }

  /**
   * handle event add user
   * @param {string} username - input value
   */
  async handleAddUser(username) {
      const response = await this.user.add(username);
 
      if (response.error) {
        this.userView.bindTogglePopup(API_ERROR_MESSAGES.ADD_USER);
        return
      }
     this.userView.bindRenderUser(response.data);
  }

  /**
   * handle event update user
   * @param {string} id - id of user selected
   * @param {Object} data - value of user updated
   */
  async handleUpdateUser(id, data) {
      const resUser = await this.user.update(id, data);

      if (resUser.error) {
        this.userView.bindTogglePopup(API_ERROR_MESSAGES.UPDATE_USER);
        return;
      }

      this.userView.bindUpdateElement(id, data);
  }

  /**
   * handle event delete user
   * @param {string} id - id of user selected
   */
  async handleDeleteUser(id) {
      const resUser = await this.user.delete(id);

      if (resUser.error) {
        this.userView.bindTogglePopup(API_ERROR_MESSAGES.DELETE_USER);
        return;
      }
      this.userView.bindDeleteElement(id);
  }

  /**
   * handle event view detail user
   * @param {Number} id - id of the user
   */
  async handleEditUser(id) {
    const response = await this.user.getUserInfo(id);

    if (response.error) {
      this.userView.bindTogglePopup(API_ERROR_MESSAGES.GET_USER_INFO);
      return;
    }

    this.userView.renderUserInfoDetail(
      response.data,
      this.handleUpdateUser.bind(this),
      this.handleDeleteUser.bind(this),
    );
  }

  /**
   * handle event search user
   * @param {String} data - value of input search
   */
  async handleSearchUsers(data) {
      const result = this.listUser.search(data);
      this.listUserView.renderTable(result);
  }
}
