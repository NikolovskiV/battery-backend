const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema(
    {
        market: { type: String, required: true },
        application: { type: String, required: true },
        items: { type: String, required: true },
        current: { type: String, required: true },
        serviceLife: { type: String, required: true },
        time: { type: Date, default: Date.now }
    }
);

const Statistics = mongoose.model("statistics", statisticsSchema);

module.exports = Statistics;