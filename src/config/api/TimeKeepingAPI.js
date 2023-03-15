import {firebase} from '@react-native-firebase/database';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import dayjs from 'dayjs';
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
    console.log('snapshot:', snapshot);
    snapshot.forEach(snapshot => {
      monthTimeKeepingList.push({
        key: snapshot.key,
        day: snapshot.val().day,
        overtime: snapshot.val().overtime,
        type: snapshot.val().type,
      });
    });
    const markedDateList = monthTimeKeepingList.reduce((acc, curr) => {
      acc[dayjs(`${month}-${curr.day}`).format('YYYY-MM-DD')] = {
        selected: true,
        selectedColor: TIME_KEEPING_COLORS[curr?.type],
      };
      return acc;
    }, {});
    return {monthTimeKeepingList, markedDateList};
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
    console.log('write TimeKeeping data: ', data);
    return timeKeepingData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
