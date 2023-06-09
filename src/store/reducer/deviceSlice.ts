import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Inputs {
  id?: string;
  code?: string;
  name?: string;
  ipAddress?: string;
  activeStatus?: boolean;
  connectionStatus?: boolean;
  serviceUsed?: string;
}

interface TicketState {
  devices: Inputs[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TicketState = {
  devices: [],
  status: "idle",
  error: null,
};

export const getDevice = createAsyncThunk("devices/getDevice", async () => {
  const response = await axios.get(
    "https://little-and-little-channel-default-rtdb.firebaseio.com/tickets.json"
  );
  const fetchedDevices: Inputs[] = [];
  for (let key in response.data) {
    fetchedDevices.push({
      ...response.data[key],
      id: key,
    });
  }
  return fetchedDevices;
});

export const getDeviceById = createAsyncThunk(
  "devices/getDeviceById",
  async (id: string) => {
    const response = await axios.get(
      `https://little-and-little-channel-default-rtdb.firebaseio.com/tickets/${id}.json`
    );
    const fetchedDevice: Inputs = {
      ...response.data,
      id,
    };
    return fetchedDevice;
  }
);

export const createDevice = createAsyncThunk(
  "devices/createDevice",
  async (device: Inputs) => {
    const response = await axios.post(
      "https://little-and-little-channel-default-rtdb.firebaseio.com/tickets.json",
      device
    );
    const fetchedDevice: Inputs = {
      ...device,
      id: response.data,
    };
    return fetchedDevice;
  }
);

export const deviceSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDevice.fulfilled,
        (state, action: PayloadAction<Inputs[]>) => {
          state.status = "idle";
          state.devices = action.payload;
        }
      )
      .addCase(getDevice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch devices";
      })
      .addCase(getDeviceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDeviceById.fulfilled,
        (state, action: PayloadAction<Inputs>) => {
          state.status = "idle";
          state.devices = [action.payload];
        }
      )
      .addCase(getDeviceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch devices";
      })
      .addCase(createDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createDevice.fulfilled,
        (state, action: PayloadAction<Inputs>) => {
          state.status = "idle";
          state.devices.push(action.payload);
        }
      )
      .addCase(createDevice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create device";
      });
  },
});

export default deviceSlice.reducer;
