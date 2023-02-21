const mongoose = require("mongoose");

const batteryNewSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    family: { type: String, required: true },
    chemistry: { type: String, required: true },
    supplier: { type: String, required: true },
    capacity: { type: Number, required: true },
    maxCurrent: { type: Number, required: true },
    model: { type: String, required: false },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    diameter: { type: Number, required: true },
    nominalVoltage: { type: Number, required: true },
    outdoor: { type: String, required: true },
    minTemperature: { type: Number, required: true },
    maxTemperature: { type: Number, required: true },
},
    {
        timestamps: true,
    }

);

exports.Battery = mongoose.model("Battery", batteryNewSchema);