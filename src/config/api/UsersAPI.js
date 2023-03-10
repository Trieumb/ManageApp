import {firebase} from '@react-native-firebase/database';

const database = firebase.app().database(
  //process.env.FIREBASE_REALTIME_URL,
  'https://managerapp-41d45-default-rtdb.asia-southeast1.firebasedatabase.app/',
);

export const writeUserData = async ({uid, name, email, role}) => {
  try {
    const data = await database.ref(`users/${uid}`).set({
      name,
      email,
      role,
    });
    console.log('write data: ', data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserInfoById = async ({uid}) => {
  try {
    const snapshot = await database.ref(`users/${uid}`).once('value');
    var name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
    var email = (snapshot.val() && snapshot.val().email) || 'No email';
    var role = (snapshot.val() && snapshot.val().role) || 'Anonymous';
    const data = {uid, name, email, role};
    console.log('get data: ', data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const snapshot = await database.ref('users').once('value');
    const users = [];
    snapshot.forEach(snapshot => {
      users.push({
        uid: snapshot.key,
        name: snapshot.val().name,
        email: snapshot.val().email,
        role: snapshot.val().role,
      });
    });
    return {users};
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
