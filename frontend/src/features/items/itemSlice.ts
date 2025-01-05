import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../schemes/itemSchema";
import axios from "axios";

const API_URL = import.meta.env.VITE_ITEM_API_URL;

interface ItemState {
  items: Item[];
  item: Item | null;
  itemLoading: boolean;
  itemSuccess: boolean;
  itemMessage: string;
}

const initialState: ItemState = {
  items: [],
  item: null,
  itemLoading: false,
  itemSuccess: false,
  itemMessage: "",
};

export const getItems = createAsyncThunk("items/getItems", async () => {
  const response = await axios.get<Item[]>(`${API_URL}/`);

  return response.data;
});

export const getItem = createAsyncThunk("items/getItem", async (id: number) => {
  const response = await axios.get<Item>(`${API_URL}/${id}`);

  return response.data;
});

export const addItem = createAsyncThunk("items/addItem", async (item: Item) => {
  const response = await axios.post<Item>(`${API_URL}/`, item);

  return response.data;
});

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (item: Item) => {
    const response = await axios.put<Item>(`${API_URL}/${item.id}`, item);

    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.itemSuccess = true;
        state.itemLoading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, { error }) => {
        state.itemSuccess = false;
        state.itemLoading = false;
        state.itemMessage = "[getItems]: Failed to get the data. " + error.message;
      })
      .addCase(getItem.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.itemSuccess = true;
        state.itemLoading = false;
        state.item = action.payload;
      })
      .addCase(getItem.rejected, (state, { error }) => {
        state.itemSuccess = false;
        state.itemLoading = false;
        state.itemMessage = "[getItem]: Failed to get the data. " + error.message;
      })
      .addCase(addItem.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.itemSuccess = true;
        state.itemLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, { error }) => {
        state.itemSuccess = false;
        state.itemLoading = false;
        state.itemMessage = "[addItem]: Failed to add the data. " + error.message;
      })
      .addCase(updateItem.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.itemSuccess = true;
        state.itemLoading = false;

        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, { error }) => {
        state.itemSuccess = false;
        state.itemLoading = false;
        state.itemMessage =
          "[updateItem]: Failed to update the data. " + error.message;
      })
      .addCase(deleteItem.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.itemSuccess = true;
        state.itemLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, { error }) => {
        state.itemSuccess = false;
        state.itemLoading = false;
        state.itemMessage =
          "[deleteItem]: Failed to delete the data. " + error.message;
      });
  },
});

export default itemsSlice.reducer;
