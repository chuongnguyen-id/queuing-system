import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface LogType {
  id?: string;
  fullname?: string;
  username?: string;
  ipAddress?: string;
  operation?: string;
  timestamp?: Date;
}

interface LogState {
  logs: LogType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: LogState = {
  logs: [],
  status: "idle",
  error: null,
};

export const getLog = createAsyncThunk("logs/getLog", async () => {
  const response = await axios.get(
    "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/logs.json"
  );
  const fetchedLogs: LogType[] = [];
  for (let key in response.data) {
    fetchedLogs.push({
      ...response.data[key],
      id: key,
    });
  }
  return fetchedLogs;
});

export const createLog = createAsyncThunk(
  "logs/createLog",
  async (log: LogType) => {
    const fetchedLog: LogType = {
      ...log,
      timestamp: new Date(),
      ipAddress: "192.168.1.10",
    };
    await axios.post(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/logs.json",
      fetchedLog
    );
    return fetchedLog;
  }
);

export const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLog.fulfilled, (state, action: PayloadAction<LogType[]>) => {
        state.status = "idle";
        state.logs = action.payload;
      })
      .addCase(getLog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch logs";
      })
      .addCase(createLog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLog.fulfilled, (state, action: PayloadAction<LogType>) => {
        state.status = "idle";
        state.logs.push(action.payload);
      })
      .addCase(createLog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create log";
      });
  },
});

export default logSlice.reducer;
