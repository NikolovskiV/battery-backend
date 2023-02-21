const router = require("express").Router();
const Statistics = require("../models/statisticsModel");

router.post("/", async (req, res) => {
    try {
        const { market, application, items, current, serviceLife, timestamp } = req.body;

        const newStatistics = new Statistics({
            market,
            application,
            items,
            current,
            serviceLife,
            timestamp
        });

        const savedStatistics = await newStatistics.save();

        res.json(savedStatistics);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }

});

router.get("/", async (req, res) => {
    try {
        const statistics = await Statistics.find();
        res.json(statistics);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
