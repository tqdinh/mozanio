import { storage } from '@path/App';

//User
export const setDataUser = (dataUser: object) => {
  const currentDataUser: object = [];
  try {
    storage.set('user', JSON.stringify(!dataUser ? currentDataUser : dataUser));
  } catch (err) {
    console.log(err);
  }
};

export const getDataUser = () => {
  let userObject = null;
  try {
    const userJson = storage.getString('user');
    userObject =
      null == userJson || undefined == userJson ? null : JSON.parse(userJson);
  } catch (error) {
    console.log('getDataUser', error);
  }
  return userObject;
};
