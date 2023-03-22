import { createSlice } from '@reduxjs/toolkit';
import { saveJobDataToFirebase, updateJob, fetchJobs, deleteJob} from '../thunks/job.thunks';

const initialState = {
    jobsData: [],
    isLoading: false,
    error: null,
};

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(saveJobDataToFirebase.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(saveJobDataToFirebase.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(saveJobDataToFirebase.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchJobs.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobsData = action.payload;
        });
        builder.addCase(fetchJobs.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
        builder.addCase(deleteJob.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobsData = action.payload;
        });
        builder.addCase(deleteJob.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
        builder.addCase(updateJob.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateJob.fulfilled, (state, action) => {
          state.isLoading = false;
        });
        builder.addCase(updateJob.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
});

export default jobSlice;