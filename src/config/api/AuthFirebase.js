import auth from '@react-native-firebase/auth';
import {getUserInfoById, getAllUsers, writeUserData} from './UsersAPI';
export const getLoginStatus = async callback => {
  try {
    auth().onAuthStateChanged(user => {
      return callback(user);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginWithEmail = async data => {
  try {
    const res = await auth().signInWithEmailAndPassword(
      data.email.trim(),
      data.password,
    );
    return res;
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/user-not-found') {
      throw new Error('That email address is not found.');
    }
    if (error.code === 'auth/wrong-password') {
      throw new Error('The password is invalid.');
    }
    if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many requests from this device. Try again later!');
    }
  }
};

export const signupWithEmail = async data => {
  try {
    const res = await auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    );
    await writeUserData(res.user?.uid, data.name, res.user?.email, 'employee');
    return res;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      throw new Error('That email address is invalid!');
    }
  }
};

export const resetPasswordWithEmail = async data => {
  try {
    const res = await auth().sendPasswordResetEmail(data.email.trim());
    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const reauthenticateWithCredential = async currentPassword => {
  try {
    const user = auth().currentUser;
    if (!user || !user.email) {
      return;
    }
    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    const res = await user.reauthenticateWithCredential(credential);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const updatePasswordOnFirebase = async newPassword => {
  try {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    await user.updatePassword(newPassword);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const logOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};
