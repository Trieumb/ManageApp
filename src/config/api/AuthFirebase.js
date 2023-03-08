import auth from '@react-native-firebase/auth';

export const loginWithEmail = async (data) => {
  try {
    const res = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    return res;
  } catch (error) {
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

export const signupWithEmail = async (data) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    );
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


export const resetPasswordWithEmail = async (email) => {
  try {
    const res = await auth().sendPasswordResetEmail(email);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const reauthenticateWithCredential = async (currentPassword) => {
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

export const updatePasswordOnFirebase = async (newPassword) => {
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