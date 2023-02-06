import { querySelectorElement } from '../helpers/selectors';
import { validateEmailRegex, validateNameEmpty } from '../helpers/validate';
import  changeBase64  from '../helpers/modules';

export default class {
  constructor(template) {
    this.template = template;

    // select table body
    this.tableBody = querySelectorElement('.table-primary__body');
    this.table = querySelectorElement('.table-primary');

    // select option
    this.option = querySelectorElement('.navbar__option');

    // select information user
    this.info = querySelectorElement('.info');

    // select popup add user
    this.popupAdd = querySelectorElement('.modal-add-user');
    this.input = querySelectorElement('.form__input');

    // select popup delete user
    this.popupDelete = querySelectorElement('.modal-delete-user');

    // updated form
    this.isUpdate = false;

    // form update user
    this.formUpdate = querySelectorElement('.update-user');

    // input search
    this.searchTitle = querySelectorElement('.search__title');
  }

  /**
   * function bindOpenOption when button new
   * click, option add new user show
   */
  bindOpenOption() {
    const self = this;
    const btnNew = querySelectorElement('.btn__new');

    btnNew.addEventListener('click', (event) => {
      event.stopPropagation();
      self.option.classList.remove('d-hidden');
    });
  }

  /**
   * function bindCloseOption when click
   * everywhere option add new user hidden
   */
  bindCloseOption() {
    const self = this;

    window.addEventListener('click', () => {
      self.option.classList.add('d-hidden');
    });
  }

  /**
   * function bindOpenModel when option
   * add new user click
   * popup add new user show
   */
  bindOpenModal() {
    const self = this;

    self.option.addEventListener('click', () => {
      self.option.classList.add('d-hidden');
      self.popupAdd.classList.remove('d-hidden');
    });
  }

  /**
   * function bindCloseModel when icon close
   * clicked, popup add new user hidden
   */
  bindCloseModal() {
    const self = this;
    const iconClose = querySelectorElement('.modal-add-user__icon--close');

    iconClose.addEventListener('click', () => {
      self.input.value = '';
      self.popupAdd.classList.add('d-hidden');
    });
  }

  /**
   * function bindSelectNav when click
   * select, navbar change color
   */
  bindSelectNav() {
    const navbarSelect = querySelectorElement('.navbar__select');

    navbarSelect.addEventListener('click', () => {
      navbarSelect.classList.add('navbar__active');
    });
  }

  /**
  * function bindSelectUser get parameter is
  * handler function and call back function
  * with parameter id user
  * @param {Function} handle - callback handler for select user
  */
  bindSelectUser(handler) {
    const self = this;

    self.tableBody.addEventListener('click', async (event) => {
      event.stopPropagation();

      self.rowUser = event.target.closest('.table-primary__user');
      self.idUser = self.rowUser.getAttribute('id');

      await handler(self.idUser);
    });
  }

  /**
   * function renderUserInfoDetail
   * @param {Object} data - information of user
   * @param {Function} handleUpdate - callback handler for update
   */
  renderUserInfoDetail(data, handleUpdate, handleDelete) {
    const self = this;

    if (self.isUpdate) {
      self.info.classList.add('d-hidden');
      self.formUpdate.classList.remove('d-hidden');
      self.formUpdate.innerHTML = self.template.renderUpdateDetail(data);

      self.bindActiveUpdate(data, handleUpdate, handleDelete);
    } else {
      self.searchTitle.style.paddingRight = '600px';

      self.info.classList.remove('d-hidden');
      self.info.innerHTML = self.template.renderUserDetail(data);

      self.bindOpenUpdateForm(data, handleUpdate, handleDelete);
    }
  }

  /**
   * function bindOpenUpdateForm
   * @param {Object} data - information of user
   * @param {Function} handleUpdate - callback handler for update
   */
  bindOpenUpdateForm(data, handleUpdate, handleDelete) {
    const self = this;

    self.btnPencil = querySelectorElement('.btn__edit');

    self.btnPencil.addEventListener('click', () => {
      self.searchTitle.style.paddingRight = '495px';
      self.isUpdate = true;

      self.info.classList.add('d-hidden');
      self.formUpdate.classList.remove('d-hidden');
      self.formUpdate.innerHTML = self.template.renderUpdateDetail(data);

      self.bindActiveUpdate(data, handleUpdate, handleDelete);
    });
  }

  /**
   * function bindActiveUpdate
   * @param {Object} data - information of user
   * @param {Function} handleUpdate - callback handler for update
   */
  bindActiveUpdate(data, handleUpdate, handleDelete) {
    const self = this;

    self.fileUpload = document.querySelectorAll('.update-user__image');

    self.bindCloseUpdateForm(data);
    self.bindChangeStatus();
    self.bindUpdateAvatar(self.fileUpload);
    self.bindUpdateUser(data, handleUpdate);
    self.bindOpenPopupDelete();
    self.bindDeleteUser(data.id, handleDelete);
    self.bindClosePopupDelete();
  }

  /**
   * function bindCloseUpdateForm
   * @param {Object} data - information of user
   */
  bindCloseUpdateForm(data) {
    const self = this;

    self.btnBack = querySelectorElement('.btn__arrow');
    self.btnBack.addEventListener('click', () => {
      self.isUpdate = true;
      self.formUpdate.classList.add('d-hidden');
      self.info.classList.remove('d-hidden');
      self.info.innerHTML = self.template.renderUserDetail(data);
      self.bindOpenUpdateForm(data);
    });
  }

  /**
   * function bindCloseUpdateForm
   */
  bindChangeStatus() {
    const self = this;

    self.btnSwitch = querySelectorElement('.btn__toggle__check');
    self.statusLabel = querySelectorElement('.status-item--update');

    self.btnSwitch.addEventListener('click', () => {
      const isChecked = self.btnSwitch.checked ? 'Active' : 'Not active';
      const action = self.btnSwitch.checked ? 'add' : 'remove';

      self.statusLabel.classList[action]('status-item--active');
      self.statusLabel.innerHTML = isChecked;
    });
  }

  /**
   * function bindUpdateAvatar
   * @param {Object} fileUpload - file image upload for user
   */
  bindUpdateAvatar(fileUpload) {
    const self = this;

    self.avatarUser = querySelectorElement('.update-user__body__wrapper');

    fileUpload.forEach((element) => {
      element.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const avatar = document.createElement('img');
        avatar.src = await changeBase64(file);
        avatar.classList.add('update-user__body__img');

        self.avatarUser.innerHTML = '';
        self.avatarUser.appendChild(avatar);
      });
    });
  }

  /**
   * function bindUpdateUser
   * @param {Object} data - information of user
   * @param {Function} handleUpdate - function handle update
   */
  bindUpdateUser(data, handleUpdate) {

    const btnSave = querySelectorElement('.btn__save-info');
    const inputName = querySelectorElement('#input__name');
    const inputEmail = querySelectorElement('#input__email');
    const statusActive = querySelectorElement('.btn__toggle__check');
    const bio = querySelectorElement('.update-user__body__details');

    btnSave.addEventListener('click', () => {
      const avatar = querySelectorElement('.update-user__body__img');
      const msgName = querySelectorElement('.name--error');
      const msgEmail = querySelectorElement('.email--error');

      if (validateNameEmpty(inputName.value)) {
        msgName.classList.remove('d-hidden');
      } else if (validateEmailRegex(inputEmail.value)) {
        msgName.classList.add('d-hidden');
        msgEmail.classList.remove('d-hidden');
      } else {
        msgName.classList.add('d-hidden');
        msgEmail.classList.add('d-hidden');

        handleUpdate(data.id, {
          avatar: avatar.src,
          name: inputName.value,
          isActive: statusActive.checked,
          email: inputEmail.value,
          description: bio.value,
        });
      }
    });
  }

 /**
  * function bindUpdateElement
  * @param {Object} data - information of user
  * @param {Object} avatar - url avatar of user
  * @param {String} name - new name of user
  * @param {Boolean} status - status of user
  * @param {String} email - adress email of user
  */
  bindUpdateElement(id, data) {
    const userElement = document.getElementById(`${id}`);
    const avatarElement = userElement.querySelector('.table-primary__col__avatar');
    const nameElement = userElement.querySelector('.table-primary__col__full-name');
    const statusElement = userElement.querySelector('.table-primary__col__status');
    const emailElement = userElement.querySelector('.table-primary__col__email');
    const avatarUser = avatarElement.querySelector('.avatar-user');
    const statusUser = statusElement.querySelector('.status-item');

    avatarUser.setAttribute('src', `${data.avatar}`);
    nameElement.textContent = `${data.name}`;
    emailElement.textContent = `${data.email}`;

    if(data.isActive) {
      statusUser.textContent = 'Active';
      statusUser.classList.add('status-item--active');
    } else {
      statusUser.textContent = 'Not active';
      statusUser.classList.remove('status-item--active');
    }
  }

 /**
  * function bindAddUser
  * @param {Function} handler - handler function add user
  */
  bindAddUser(handler) {
    const self = this;
    const btnSave = querySelectorElement('.btn__save');

    btnSave.addEventListener('click', async () => {
       handler(self.input.value);
    });
  }

 /**
  * function bindAddUser
  * @param {Object} user - information of user
  */
  bindRenderUser (user) {
    const self = this;

    const newElement = self.template.renderUser(user);

    self.input.value = '';
    self.popupAdd.classList.add('d-hidden');

    const newRow = `${self.tableBody.innerHTML} ${newElement}`;
    self.tableBody.innerHTML = newRow;
  }

  /**
   * function bindOpenPopupDelete
   */
  bindOpenPopupDelete() {
    const self = this;

    self.btnDelete = querySelectorElement('.btn__delete');
    self.btnDelete.addEventListener('click', () => {
      self.popupDelete.classList.remove('d-hidden');
    });
  }

  /**
   * function bindClosePopupDelete
   */
  bindClosePopupDelete() {
    const self = this;
    const btnCancel = querySelectorElement('.btn__cancel');

    btnCancel.addEventListener('click', () => {
      self.popupDelete.classList.add('d-hidden');
    });
  }

  /**
   * function bindDeleteUser
   * @param {Object} data - information of user
   * @param {Function} handleDelete - callback function
   */
  bindDeleteUser(id, handleDelete) {
    const self = this;

    self.headerSearch = querySelectorElement('.search__header')
    self.btnRemove = querySelectorElement('.btn__remove');
    self.btnRemove.addEventListener('click', () => {
      handleDelete(id);

      self.headerSearch.classList.add('d-flex-between');
      self.popupDelete.classList.add('d-hidden');
      self.formUpdate.classList.add('d-hidden');
    });
  }

  /**
   * bindTogglePopup
   * @param {Number} id - id of user
   */
  bindDeleteElement(id) {
    const userElement = document.getElementById(`${id}`);
    userElement.remove();
  }

  /**
   * bindTogglePopup
   * @param {String} message - message for error
   */
  bindTogglePopup(message) {

    const popupError = querySelectorElement('.popup');
    const popupMsg = querySelectorElement('.popup__message');
    const btnBack = querySelectorElement('.btn__back');
    popupError.classList.remove('d-hidden');
    popupMsg.innerHTML = message;

    btnBack.addEventListener('click', () => {
      popupError.classList.add('d-hidden');
    });
  }
}
