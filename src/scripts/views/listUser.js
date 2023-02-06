import { querySelectorElement } from '../helpers/selectors';

export default class {
  constructor(template) {
    this.template = template;

    // select table body
    this.tableBody = querySelectorElement('.table-primary__body');
    this.table = querySelectorElement('.table-primary');

    // select button search
    this.btnSearch = querySelectorElement('.btn__search');
    this.btnClose = querySelectorElement('.btn__close');

    // select search component
    this.headerSearch = querySelectorElement('.search__header');
    this.wrapperSearch = querySelectorElement('.search__wrapper');

    // select search input
    this.searchInput = querySelectorElement('.search__input');
  }

 /**
 * function renderTable in view, assigne data
 * and call function renderTableData from class template
 * then assign in table selector
 * @param {Object} data - data of the user
 */
  renderTable(data) {
    this.tableBody.innerHTML = this.template.renderTableData(data);
  }

  /**
   * bindOpenSearch
   * when click icon search in header search
   * show search input
   */

  bindOpenSearch() {
    const self = this;
    
    self.btnSearch.addEventListener('click', () => {
      self.headerSearch.classList.add('d-hidden');
      self.wrapperSearch.classList.remove('d-hidden');
      self.wrapperSearch.classList.add('d-flex-between');
    });
  }

  /**
   * bindCloseSearch
   * when click icon close in wrapper search
   * hide search input
   */
  bindCloseSearch() {
    const self = this;

    self.btnClose.addEventListener('click', () => {
      self.headerSearch.classList.remove('d-hidden');
      self.wrapperSearch.classList.add('d-hidden');
    });
  }

  /**
   * bindSearchUsers
   */
  bindSearchUsers(handle) {
    const self = this ;

    self.searchInput.addEventListener('keyup', (e) => {
      handle(e.target.value.toLowerCase());
    });
  }
}
