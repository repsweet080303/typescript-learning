export default class Template {
  constructor() {
    this.active = '';
    this.labelStatus = '';
    this.activeUser = '';
    this.badgeStatus = '';
  }

  /**
   * function render table
   * assigns data to the template
   * @param {Array} data - data transmission from API
   * @returns {String} template string
   */
  renderTableData(data) {
    const tableUsers = data.map((user) => this.renderUser(user));
    return tableUsers.join(' ');
  }

  /**
   * render user
   * @param {Array} data - data transmission from API
   * @returns {String} template string
   */
  renderUser(data) {
    this.active = data.isActive ? 'status-item--active' : '';
    this.labelStatus = data.isActive ? 'Active' : 'Not Active';
    return `
  <tr class='table-primary__user' id= ${data.id}>
    <td class="table-primary__col__avatar table-primary__body__row">${data.avatar
    ? `<img class='avatar-user' src=${data.avatar} alt="Avatar ${data.name}"></img>`
    : `<div class='avatar-user__none' 
    >${data.name.toUpperCase().charAt(0)}</div>`}
    </td>
    <td class="table-primary__col__full-name table-primary__body__row">${data.name}</td>
    <td class="table-primary__col__status table-primary__body__row">
      <div class="status-item ${this.active}">${this.labelStatus}</div></td>
    <td class="table-primary__col__email table-primary__body__row">${data.email}</td>
  </tr>
  `;
  }

  /**
   * render renderUserDetail
   * @param {Array} data - data transmission from API
   * @returns {String} template string
   */
  renderUserDetail(data) {
    this.activeUser = data.isActive ? 'status-item--active' : '';
    this.badgeStatus = data.isActive ? 'Active' : 'Not Active';
    return `
          <div class="info__head__wrapper d-flex-between">
            <h3 class="info__head__title">User information</h3>
            <div class="status-item badge-spacing ${this.activeUser}">${this.badgeStatus}</div>
          <button class="btn__edit"><i class="fa-regular fa-pen"></i></button>
          </div>
        </div>
        <div class="info__body">
          <div class="info__body__wrapper">${data.avatar ? `<img class="info__body__image"
          src= ${data.avatar}
          alt= ${data.name}
        />` : `<div class='avatar-user__none avatar-user__large'>${data.name.toUpperCase().charAt(0)}</div>`}
            
            <div class="info__body__name">${data.name}</div>
          </div>
          <div class="info__body__template d-flex info__body__spacing">
            <i class="icon__email fa-regular fa-envelope"></i>

            <p class="info__body__title">Email:</p>
          </div>
          <div class="info__body__detail info__body__spacing">
            ${data.email ? data.email : 'unknown'}
          </div>
          <div class="info__body__template d-flex info__body__spacing">
            <i class="icon__clock fa-regular fa-clock"></i>
            <p class="info__body__title">Last visited:</p>
          </div>
          <div class="info__body__detail info__body__spacing">
            ${new Date(data.lastUpdated).toLocaleString()}
          </div>
        </div>
    `;
  }

  /**
   * render renderUpdateDetail
   * @param {Array} data - data transmission from API
   * @returns {String} template string
   */
  renderUpdateDetail(data) {
    this.registerDate = new Date(data.registered);
    this.updateDate = new Date(data.lastUpdate);
    this.activeUser = data.isActive ? 'status-item--active' : '';
    this.badgeStatus = data.isActive ? 'Active' : 'Not Active';
    this.isChecked = data.isActive ? 'checked' : '';

    return `
    <div class="update-user__header d-flex">
          <button class="btn__arrow">
            <i class="fa-sharp fa-solid fa-arrow-left"></i>
          </button>
          <div class="update-user__header__title">
            <a href="#" class="update-user__header__select"> General </a>
          </div>
        </div>
        <div class="update-user__body">
          <div class="btn__group id="${data.id}">
            <button class="btn btn__primary btn__delete">Delete</button>
            <button class="btn btn__secondary btn__save-info">Save</button>
          </div>
          <div class="d-flex-align margin-tb">
            <p class="update-user__body__label">Fullname</p>
            <input type="text" class="update-user__body__input" id="input__name" value="${data.name}" />
            <p
              class="update-user__body__msg name--error d-hidden"
            >Invalid</p>
          </div>
          <div class="d-flex-align margin-tb">
            <p class="update-user__body__label">Email</p>
            <input type="text" class="update-user__body__input" id="input__email" value="${data.email}" />
            <p
              class="update-user__body__msg email--error d-hidden"
            >Invalid</p>
          </div>
          <div class="update-user__body__avatar d-flex margin-tb">
            <p class="update-user__body__label">Avatar</p>
            <div class="update-user__body__wrapper">
            ${data.avatar ? `<img class="update-user__body__img"
          src= ${data.avatar}
          alt= ${data.name}/>` : `<div class='avatar-user__none avatar-user__medium'>${data.name.toUpperCase().charAt(0)}</div>`}
            </div>
            <div class="update-user__body__upload d-flex-align">
              <label class="label__upload" for="upload-file">
                <i 
                  class="icon__upload update-user__image fa-sharp fa-solid fa-arrow-up-from-bracket"
                ></i>
                <input type="file" class="update-user__image update-user__input" id="upload-file">
              </label>
              <p class="update-user__body__text">Upload new photo</p>
            </div>
          </div>
          <div class="d-flex-align margin-tb">
            <p class="update-user__body__label">Status</p>
            <label class="btn__toggle">
              <input class='btn__toggle__check' type="checkbox" ${this.isChecked}/>
              <span class="btn__toggle__slider"></span>
            </label>
            <p class="status-item status-item--update ${this.activeUser}">${this.badgeStatus}</p>
          </div>
          <div class="d-flex margin-tb">
            <p class="update-user__body__label">Registered</p>
            <p class="update-user__body__time">${new Date(data.registered).toLocaleString()}</p>
          </div>
          <div class="d-flex margin-tb">
            <p class="update-user__body__label">Lasted visit</p>
            <p class="update-user__body__time">${new Date(data.lastUpdated).toLocaleString()}</p>
          </div>
          <div class="d-flex">
            <p class="update-user__body__label">Detail</p>
            <textarea
              class="update-user__body__details"
              name="desc"
              cols="40"
              rows="7"
            >${data.description}</textarea>
          </div>
        </div>
    `;
  }
}
