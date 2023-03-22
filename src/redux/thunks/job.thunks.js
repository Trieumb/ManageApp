import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/database';
import messaging from'@react-native-firebase/messaging';
import Api_URL from '../../config/api/Api_URL';

export const saveJobDataToFirebase = createAsyncThunk(
  'jobs/saveJobDataToFirebase',
  async (data, thunkAPI) => {
    try {
      messaging.getToken({ vapidKey: 'BHyLllkeIo_OVOtX85epmqq48zUq1AX1yHmkLV6mvSo4YqI1kn7vIERIoXDEhHPzS95HjM95dgTz7-acguBLooE' }).then((currentToken) => {
        if (currentToken) {
          messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('Opened notification:', remoteMessage);
          });
          messaging().send({
            notification: {
              title: 'Có công việc mới',
              body: 'Vui lòng kiểm tra lại',
            },
            token: currentToken,
          });
        } else {
          console.log('lỗi!');
        }
      })
      await firebase.app().database(Api_URL).ref('jobs').push(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ jobId, data }, thunkAPI) => {
    try {
      await firebase.app().database(Api_URL).ref(`jobs/${jobId}`).update(data);
      console.log("đã cập nhật job");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  try {
    const snapshot = await firebase.app().database(Api_URL).ref('jobs').once('value');
    const data = snapshot.val();
    const jobs = Object.keys(data || {}).map((key) => ({ id: key, ...data[key] }));
    console.log(jobs);
    return jobs;
  } catch (error) {
    console.log(error);
  }
});

export const deleteJob = createAsyncThunk('jobs/deleteJobs', async (jobId) => {
  try {
    const res = await firebase.app().database(Api_URL).ref(`jobs/${jobId}`).remove();
    return res;
  } catch (error) {
    console.log(error);
  }
});

// export const sendNotification = createAsyncThunk(
//   'jobs/sendNotification',
//   async (job, { getState }) => {
//     try {
//       // Lấy danh sách token thiết bị từ cơ sở dữ liệu Firebase
//       const snapshot = await admin.app().database(Api_URL).ref('/users').once('value');
//       const users = snapshot.val();
//       const tokens = [];

//       // Lấy danh sách token thiết bị của tất cả người dùng
//       Object.values(users).forEach((user) => {
//         if (user.deviceToken) {
//           tokens.push(user.deviceToken);
//         }
//       });

//       // Gửi thông báo đến tất cả các thiết bị
//       if (tokens.length > 0) {
//         const message = {
//           notification: {
//             title: 'Công việc mới!',
//             body: 'Đã có một công việc được thêm mới!'
//           },
//           tokens: tokens
//         };

//         const response = await admin.messaging().sendMulticast(message);
//         console.log('Sent notification to', response.successCount, 'devices');
//       }
//     } catch (error) {
//       console.error('Unable to send notification:', error);
//       throw error;
//     }
//   }
// );
