import {firebase} from '@react-native-firebase/database';
const database = firebase
  .app()
  .database(
    'https://managerapp-41d45-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

export const getUserTimeKeepingByMonth = async ({userUid, month}) => {
  try {
    const snapshot = await database
      .ref(`timekeeping/${userUid}/${month}`)
      .once('value');
    const monthTimeKeepingList = [];
    snapshot.forEach(snapshot => {
      monthTimeKeepingList.push({
        key: snapshot.key,
        day: snapshot.val().day,
        overtime: snapshot.val().overtime,
        type: snapshot.val().type,
      });
    });

    return {month, monthTimeKeepingList};
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const writeNewTimeKeeping = async ({
  userUid,
  month,
  timeKeepingData,
}) => {
  try {
    const {key} = timeKeepingData;
    const data = await database
      .ref(`timekeeping/${userUid}/${month}/${key}`)
      .set({
        day: timeKeepingData.day,
        overtime: timeKeepingData.overtime,
        type: timeKeepingData.type,
      });
    return timeKeepingData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
