import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/login', params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}); 

export const fetchAuthOne = createAsyncThunk('auth/fetchAuthOne', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/user', params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}); 

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/register', params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe' , async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.error = action.payload;
    },
    [fetchAuthOne.pending]: (state) => {
      state.status = "loading";
      state.dataOne = null;
    },
    [fetchAuthOne.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.dataOne = action.payload;
    },
    [fetchAuthOne.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.errorOne = action.payload;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.error = action.payload;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.error = action.payload;
    },
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;