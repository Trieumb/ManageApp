import database from '@react-native-firebase/database';

export const getUserByUid = async uid => {
  try {
    const res = await firestore().collection('users').doc(uid).get();
    return res;
  } catch (error) {
    let errorMessage = 'User not found!';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const createUserWithUid = async (uid, newUser) => {
  try {
    const res = await firestore().collection('users').doc(uid).set(newUser);
    console.log('create user with id res: ', res);
    return res;
  } catch (error) {
    let errorMessage = 'Could not create new user!';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const updateUserById = async (uid, updatedUser) => {
  try {
    const res = await firestore()
      .collection('users')
      .doc(uid)
      .update(updatedUser);
    return res;
  } catch (error) {
    let errorMessage = 'Could not update user!';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};
