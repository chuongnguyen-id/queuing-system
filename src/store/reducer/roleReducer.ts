import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface RoleType {
  id?: string;
  roleName?: string;
  description?: string;
}

interface RoleState {
  roles: RoleType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  status: "idle",
  error: null,
};

export const getRole = createAsyncThunk("roles/getRole", async () => {
  const response = await axios.get(
    "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/roles.json"
  );
  const fetchedRoles: RoleType[] = [];
  for (let key in response.data) {
    fetchedRoles.push({
      ...response.data[key],
      id: key,
    });
  }
  return fetchedRoles;
});

export const getRoleById = createAsyncThunk(
  "roles/getRoleById",
  async (id: string) => {
    const response = await axios.get(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/roles/${id}.json`
    );
    const fetchedService: RoleType = {
      ...response.data,
      id,
    };
    return fetchedService;
  }
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (role: RoleType) => {
    const response = await axios.post(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/roles.json",
      role
    );
    const fetchedRole: RoleType = {
      ...role,
      id: response.data,
    };
    return fetchedRole;
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (role: RoleType) => {
    const response = await axios.put(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/roles/${role.id}.json`,
      role
    );
    const fetchedRole: RoleType = {
      ...role,
      id: response.data,
    };
    return fetchedRole;
  }
);

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getRole.fulfilled,
        (state, action: PayloadAction<RoleType[]>) => {
          state.status = "idle";
          state.roles = action.payload;
        }
      )
      .addCase(getRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch roles";
      })
      .addCase(getRoleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getRoleById.fulfilled,
        (state, action: PayloadAction<RoleType>) => {
          state.status = "idle";
          state.roles = [action.payload];
        }
      )
      .addCase(getRoleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch services";
      })
      .addCase(createRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createRole.fulfilled,
        (state, action: PayloadAction<RoleType>) => {
          state.status = "idle";
          state.roles.push(action.payload);
        }
      )
      .addCase(createRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create role";
      })
      .addCase(updateRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateRole.fulfilled,
        (state, action: PayloadAction<RoleType>) => {
          state.status = "idle";
          const roleIndex = state.roles.findIndex(
            (d) => d.id === action.payload.id
          );
          if (roleIndex !== -1) {
            state.roles[roleIndex] = action.payload;
          }
        }
      )
      .addCase(updateRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update role";
      });
  },
});

export default roleSlice.reducer;
