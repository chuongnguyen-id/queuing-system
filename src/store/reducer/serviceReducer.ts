import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ServiceType {
  id?: string;
  serviceCode?: string;
  serviceName?: string;
  description?: string;
  activeStatus?: boolean;
}

interface ServiceState {
  services: ServiceType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  status: "idle",
  error: null,
};

export const getService = createAsyncThunk("services/getService", async () => {
  const response = await axios.get(
    "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/services.json"
  );
  const fetchedServices: ServiceType[] = [];
  for (let key in response.data) {
    fetchedServices.push({
      ...response.data[key],
      id: key,
    });
  }
  return fetchedServices;
});

export const getServiceById = createAsyncThunk(
  "services/getServiceById",
  async (id: string) => {
    const response = await axios.get(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/services/${id}.json`
    );
    const fetchedService: ServiceType = {
      ...response.data,
      id,
    };
    return fetchedService;
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (service: ServiceType) => {
    const response = await axios.post(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/services.json",
      service
    );
    const fetchedService: ServiceType = {
      ...service,
      id: response.data,
    };
    return fetchedService;
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async (service: ServiceType) => {
    const response = await axios.put(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/services/${service.id}.json`,
      service
    );
    const fetchedService: ServiceType = {
      ...service,
      id: response.data,
    };
    return fetchedService;
  }
);

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getService.fulfilled,
        (state, action: PayloadAction<ServiceType[]>) => {
          state.status = "idle";
          state.services = action.payload;
        }
      )
      .addCase(getService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch services";
      })
      .addCase(getServiceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getServiceById.fulfilled,
        (state, action: PayloadAction<ServiceType>) => {
          state.status = "idle";
          state.services = [action.payload];
        }
      )
      .addCase(getServiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch services";
      })
      .addCase(createService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createService.fulfilled,
        (state, action: PayloadAction<ServiceType>) => {
          state.status = "idle";
          state.services.push(action.payload);
        }
      )
      .addCase(createService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create service";
      })
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateService.fulfilled,
        (state, action: PayloadAction<ServiceType>) => {
          state.status = "idle";
          const serviceIndex = state.services.findIndex(
            (d) => d.id === action.payload.id
          );
          if (serviceIndex !== -1) {
            state.services[serviceIndex] = action.payload;
          }
        }
      )
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update service";
      });
  },
});

export default serviceSlice.reducer;
