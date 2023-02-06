import Controller from './controllers/user';
import Template from './templates/user';
import UserView from './views/user';
import ListUserView from './views/listUser';
import ListUser from './models/listUser';
import User from './models/user';

const template = new Template();
const userView = new UserView(template);
const listUserView = new ListUserView(template);
const listUser = new ListUser();
const user = new User();
const controller = new Controller(listUser, user, userView, listUserView);

window.addEventListener('load', () => controller.handleRenderView());
