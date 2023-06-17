import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface DeviceType {
  id?: string;
  deviceCode?: string;
  deviceName?: string;
  ipAddress?: string;
  model?: string;
  username?: string;
  password?: string;
  activeStatus?: boolean;
  connectionStatus?: boolean;
  usedService?: string;
}

interface DeviceState {
  devices: DeviceType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  status: "idle",
  error: null,
};

export const getDevice = createAsyncThunk("devices/getDevice", async () => {
  const response = await axios.get(
    "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/devices.json"
  );
  const fetchedDevices: DeviceType[] = [];
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
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/devices/${id}.json`
    );
    const fetchedDevice: DeviceType = {
      ...response.data,
      id,
    };
    return fetchedDevice;
  }
);

export const createDevice = createAsyncThunk(
  "devices/createDevice",
  async (device: DeviceType) => {
    const response = await axios.post(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/devices.json",
      device
    );
    const fetchedDevice: DeviceType = {
      ...device,
      id: response.data,
    };
    return fetchedDevice;
  }
);

export const updateDevice = createAsyncThunk(
  "devices/updateDevice",
  async (device: DeviceType) => {
    const response = await axios.put(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/devices/${device.id}.json`,
      device
    );
    const fetchedDevice: DeviceType = {
      ...device,
      id: response.data,
    };
    return fetchedDevice;
  }
);

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDevice.fulfilled,
        (state, action: PayloadAction<DeviceType[]>) => {
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
        (state, action: PayloadAction<DeviceType>) => {
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
        (state, action: PayloadAction<DeviceType>) => {
          state.status = "idle";
          state.devices.push(action.payload);
        }
      )
      .addCase(createDevice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create device";
      })
      .addCase(updateDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateDevice.fulfilled,
        (state, action: PayloadAction<DeviceType>) => {
          state.status = "idle";
          const deviceIndex = state.devices.findIndex(
            (d) => d.id === action.payload.id
          );
          if (deviceIndex !== -1) {
            state.devices[deviceIndex] = action.payload;
          }
        }
      )
      .addCase(updateDevice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update device";
      });
  },
});

export default deviceSlice.reducer;
