"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../features/habits/habitsSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.habits
  );

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Lista de Hábitos</h1>

      {loading && <p>Cargando hábitos...</p>}
      {error && <p>{error}</p>}

      <ul>
        {items.map((habit) => (
          <li key={habit._id}>
            {habit.nombre} - Frecuencia: {habit.frecuencia} - Completado:{" "}
            {habit.completado ? "Sí" : "No"}
          </li>
        ))}
      </ul>
    </main>
  );
}