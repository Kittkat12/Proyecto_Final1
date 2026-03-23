"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, markHabitDone } from "../features/habits/habitsSlice";
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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Lista de Hábitos
        </h1>

        {loading && <p className="mb-4 text-blue-600">Cargando hábitos...</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <div className="space-y-4">
          {items.map((habit) => {
            const racha = habit.racha || 0;
            const metaDias = habit.metaDias || 66;
            const porcentaje = Math.min((racha / metaDias) * 100, 100);

            return (
              <div
                key={habit._id}
                className="rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {habit.nombre}
                </h2>

                <p className="mt-1 text-gray-600">
                  Frecuencia: {habit.frecuencia || "No definida"}
                </p>

                <p className="mt-1 text-gray-600">
                  Completado: {habit.completado ? "Sí" : "No"}
                </p>

                <p className="mt-1 text-gray-600">Racha: {racha} día(s)</p>

                <div className="mt-4">
                  <p className="mb-1 text-sm text-gray-600">
                    Progreso del hábito: {racha}/{metaDias} días
                  </p>
                  <div className="h-4 w-full rounded-full bg-red-200">
                    <div
                      className="h-4 rounded-full bg-yellow-400"
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(markHabitDone(habit._id))}
                  className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Done
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}