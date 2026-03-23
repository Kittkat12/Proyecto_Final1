const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");
const authMiddleware = require("../../middleware/authMiddleware");


// Habito****Seman#1
router.post("/", authMiddleware, async (req, res) => {
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


// Semana4 marcar como done
router.patch("/:id/done", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ mensaje: "Hábito no encontrado" });
    }

    const hoy = new Date();
    const ultimoCheck = habit.ultimoCheck ? new Date(habit.ultimoCheck) : null;

    if (!ultimoCheck) {
      habit.racha = 1;
    } else {
      const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      const ultimoSoloFecha = new Date(
        ultimoCheck.getFullYear(),
        ultimoCheck.getMonth(),
        ultimoCheck.getDate()
      );

      const diferenciaTiempo = hoySoloFecha - ultimoSoloFecha;
      const diferenciaDias = diferenciaTiempo / (1000 * 60 * 60 * 24);

      if (diferenciaDias === 0) {
        return res.json(habit);
      } else if (diferenciaDias === 1) {
        habit.racha += 1;
      } else {
        habit.racha = 1;
      }
    }

    habit.completado = true;
    habit.ultimoCheck = hoy;

    const habitActualizado = await habit.save();
    res.json(habitActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;