const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    frecuencia: {
      type: String,
      required: true,
    },
    completado: {
      type: Boolean,
      default: false,
    },
    racha: {
      type: Number,
      default: 0,
    },
    ultimoCheck: {
      type: Date,
      default: null,
    },
    metaDias: {
      type: Number,
      default: 66,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);