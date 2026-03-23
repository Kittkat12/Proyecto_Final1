const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// Habito****Seman#1
router.post("/", async (req, res) => {
  try {
    const nuevoHabit = new Habit(req.body);
    const habitGuardado = await nuevoHabit.save();
    res.status(201).json(habitGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ver todos los hábitos
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cambio de hábito
router.put("/:id", async (req, res) => {
  try {
    const habitActualizado = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!habitActualizado) {
      return res.status(404).json({ mensaje: "Hábito no encontrado" });
    }

    res.json(habitActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Borrar hábito
router.delete("/:id", async (req, res) => {
  try {
    const habitEliminado = await Habit.findByIdAndDelete(req.params.id);

    if (!habitEliminado) {
      return res.status(404).json({ mensaje: "Hábito no encontrado" });
    }

    res.json({ mensaje: "Hábito eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;