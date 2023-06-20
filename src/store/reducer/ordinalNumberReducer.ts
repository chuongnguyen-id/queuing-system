import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface OrdinalNumberType {
  id?: string;
  stt?: string;
  fullname?: string;
  service?: string;
  issueDate?: Date;
  expirationDate?: Date;
  dateStatus?: string;
  source?: string;
  userId?: String;
}

interface OrdinalNumberState {
  ordinalNumbers: OrdinalNumberType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: OrdinalNumberState = {
  ordinalNumbers: [],
  status: "idle",
  error: null,
};

export const getOrdinalNumber = createAsyncThunk(
  "ordinalNumbers/getOrdinalNumber",
  async () => {
    const response = await axios.get(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/ordinalNumbers.json"
    );
    const fetchedOrdinalNumbers: OrdinalNumberType[] = [];
    for (let key in response.data) {
      fetchedOrdinalNumbers.push({
        ...response.data[key],
        id: key,
      });
    }
    return fetchedOrdinalNumbers;
  }
);

export const getOrdinalNumberById = createAsyncThunk(
  "ordinalNumbers/getOrdinalNumberById",
  async (id: string) => {
    const response = await axios.get(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/ordinalNumbers/${id}.json`
    );
    const fetchedOrdinalNumber: OrdinalNumberType = {
      ...response.data,
      id,
    };
    return fetchedOrdinalNumber;
  }
);

export const createOrdinalNumber = createAsyncThunk(
  "ordinalNumbers/createOrdinalNumber",
  async (ordinalNumber: OrdinalNumberType) => {
    const response = await axios.post(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/ordinalNumbers.json",
      ordinalNumber
    );
    const fetchedOrdinalNumber: OrdinalNumberType = {
      ...ordinalNumber,
      id: response.data,
    };
    return fetchedOrdinalNumber;
  }
);

export const ordinalNumberSlice = createSlice({
  name: "ordinalNumbers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdinalNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getOrdinalNumber.fulfilled,
        (state, action: PayloadAction<OrdinalNumberType[]>) => {
          state.status = "idle";
          state.ordinalNumbers = action.payload;
        }
      )
      .addCase(getOrdinalNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch ordinalNumbers";
      })
      .addCase(getOrdinalNumberById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getOrdinalNumberById.fulfilled,
        (state, action: PayloadAction<OrdinalNumberType>) => {
          state.status = "idle";
          state.ordinalNumbers = [action.payload];
        }
      )
      .addCase(getOrdinalNumberById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch ordinalNumbers";
      })
      .addCase(createOrdinalNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createOrdinalNumber.fulfilled,
        (state, action: PayloadAction<OrdinalNumberType>) => {
          state.status = "idle";
          state.ordinalNumbers.push(action.payload);
        }
      )
      .addCase(createOrdinalNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create ordinalNumber";
      });
  },
});

export default ordinalNumberSlice.reducer;
