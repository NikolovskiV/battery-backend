const createSimulation = (req, res, next) => {
  const { market, application, items, current, serviceLife } = req.body;
  res
    .status(201)
    .json({
      message: "Simulation is received by the backend",
      market,
      application,
      items,
      current,
      serviceLife,

    });
};

exports.createSimulation = createSimulation;
