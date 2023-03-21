import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/database';
import Api_URL from '../../config/api/Api_URL';

export const saveJobDataToFirebase = createAsyncThunk(
  'jobs/saveJobDataToFirebase',
  async (data, {rejectWithValue}) => {
    try {
      await firebase.app().database(Api_URL).ref('jobs').push(data);
    } catch (error) {
      return rejectWithValue(error.message);
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
