import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const response = await fetch("http://localhost:3000/habits");
  const data = await response.json();
  return data;
});

interface Habit {
  _id: string;
  nombre: string;
  frecuencia?: string;
  completado?: boolean;
}

interface HabitsState {
  items: Habit[];
  loading: boolean;
  error: string | null;
}

const initialState: HabitsState = {
  items: [],
  loading: false,
  error: null,
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHabits.rejected, (state) => {
        state.loading = false;
        state.error = "Error al obtener hábitos";
      });
  },
});

export default habitsSlice.reducer;