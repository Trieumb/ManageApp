import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import {writeUserData} from './UsersAPI';
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
    if (error.code === 'auth/invalid-email') {
      Alert.alert('Email không đúng!');
    }
    if (error.code === 'auth/wrong-password') {
      Alert.alert('Mật khẩu không đúng!.');
    }
    if (error.code === 'auth/too-many-requests') {
      Alert.alert('server lỗi, thử lại sau!');
    }
  }
};

export const signupWithEmail = async data => {
  try {
    const res = await auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    );
    console.log('signup res:', res);
    await writeUserData({
      uid: res.user?.uid,
      name: data.name,
      email: res.user?.email,
      role: 'employee',
    });
    return res;
  } catch (error) {
    console.log('Error: ', error.message);
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Email đã được sử dụng!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('Email không đúng định dạng!');
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
