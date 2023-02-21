const express = require("express");
const { Battery } = require("../models/batteryModel.js");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");

const batteryRouter = express.Router();

batteryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const batterys = await Battery.find({});
    res.send(batterys);
  })
);


// USE TO UPLOAD BATTERY ON MONGO DB

// batteryRouter.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     await Battery.remove({});
//     const createdBattery = await Battery.insertMany(data.batterys);
//     res.send({ createdBattery });
//   })
// );

batteryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const battery = await Battery.findById(req.params.id);
    if (battery) {
      res.send(battery);
    } else {
      res.status(404).send({ message: "Battery Not Found" });
    }
  })
);

batteryRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const battery = new Battery({
      name: "sample name" + Date.now(),
      image: "/images/picture-1.jpeg",
      type: "sample type",
      chemistry: "sample name",
      model: "sample model",
      family: "sample family",
      supplier: "sample supplier",
      capacity: 0,
      maxCurrent: 0,
      weight: 0,
      height: 0,
      diameter: 0,
      nominalVoltage: 0,
      outdoor: "sample outdoor",
      minTemperature: 0,
      maxTemperature: 0,
    });
    const createdBattery = await battery.save();
    res.send({ message: "Battery Created", battery: createdBattery });
  })
);

batteryRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const batteryId = req.params.id;
    const battery = await Battery.findById(batteryId);
    if (battery) {
      battery.name = req.body.name;
      battery.image = req.body.image;
      battery.type = req.body.type;
      battery.chemistry = req.body.chemistry;
      battery.model = req.body.model;
      battery.family = req.body.family;
      battery.supplier = req.body.supplier;
      battery.capacity = req.body.capacity;
      battery.maxCurrent = req.body.maxCurrent;
      battery.weight = req.body.weight;
      battery.height = req.body.height;
      battery.diameter = req.body.diameter;
      battery.nominalVoltage = req.body.nominalVoltage;
      battery.outdoor = req.body.outdoor;
      battery.minTemperature = req.body.minTemperature;
      battery.maxTemperature = req.body.maxTemperature;
      const updatedBattery = await battery.save();
      res.send({ message: "Batteri Update", battery: updatedBattery });
    } else {
      res.status(404).send({ message: "Battery Not Found" });
    }
  })
);

batteryRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const battery = await Battery.findById(req.params.id);
    if (battery) {
      const deleteBattery = await battery.remove();
      res.send({ message: "Battery Deleted", battery: deleteBattery });
    } else {
      res.status(404).send({ message: "Battery Not Found" });
    }
  })
);

// batteryRouter.get("/filtedata", async (req, res) => {
//     console.log(req.params.id);
//     const battery = await Battery.findById(req.params.id);
//     if (battery) {
//         res.send(battery);
//     } else {
//         res.status(404).send({ message: 'Battery Not Found' });
//     }
// })

batteryRouter.post(
  "/filter",
  expressAsyncHandler(async (req, res) => {
    console.log("This is Filter api", req.body);
    // const battery = await Battery.find("626e8178b4eb01b3dcd6cfe0");
    Battery.find(
      {
        outdoor: req.body.outdoor,
        family: req.body.family,
      },
      function (err, data) {
        if (err) {
          err.status = 406;
          return next(err);
        }
        console.log(data);
        return res.status(200).json({
          message: " success.",
          data: data,
        });
      }
    );
  })
);

// batteryRouter.get(`/`, async (req, res) => {
//     const batteryList = await Battery.find();

//     if (!batteryList) {
//         res.status(500).json({ success: false })
//     }
//     res.send(batteryList);
// })

// batteryRouter.post(`/`, (req, res) => {
//     const battery = new Battery({
//         name: req.body.name,
//         image: req.body.image,
//         type: req.body.type,
//         chemistry: req.body.chemistry,
//         model: req.body.model,
//         family: req.body.family,
//         supplier: req.body.supplier,
//         capacity: req.body.capacity,
//         maxCurrent: req.body.maxCurrent,
//         width: req.body.width,
//         diameter: req.body.diameter,
//         nominalVoltage: req.body.nominalVoltage,
//         outdoor: req.body.outdoor,
//         minTemperature: req.body.minTemperature,
//         maxTemperature: req.body.maxTemperature,
//     })
//     battery.save().then((createdBattery => {
//         res.status(201).json(createdBattery)
//     })).catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// })

module.exports = batteryRouter;
