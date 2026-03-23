const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    frecuencia: {
      type: String,
      default: "diaria"
    },
    completado: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Habit", habitSchema);