import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_URL = "https://proyecto-final1-d8r8.onrender.com";
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const response = await fetch(`${API_URL}/habits`);
  if (!response.ok) {
    throw new Error("Error al obtener hábitos");
  }
  return await response.json();
});

export const markHabitDone = createAsyncThunk(
  "habits/markHabitDone",
  async (id: string) => {
    const response = await fetch(`${API_URL}/habits/${id}/done`, {
      method: "PATCH",
    });

    const data = await response.json();
    return data;
  }
);

interface Habit {
  _id: string;
  nombre: string;
  frecuencia?: string;
  completado?: boolean;
  racha?: number;
  ultimoCheck?: string | null;
  metaDias?: number;
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
      })
      .addCase(markHabitDone.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (habit) => habit._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default habitsSlice.reducer;