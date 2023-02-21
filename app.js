const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routesUrls = require('./routes/routes')
const simulationRoutes = require("./routes/simulation-routes")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const batteryRouter = require("./routes/batteryRouter")
const uploadRouter = require("./routes/uploadRouter")


dotenv.config()
//MongoDB 


mongoose.connect(process.env.DATABASE_ACCESS, (error) => {
  if (error) return console.error(error);
  console.log("Connected to MongoDB")
});

//Server connection
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://battery-front.onrender.com/",
  credentials: true,
})
);

//  USE TO UPLOAD BATTERY ON THE MongoDB
// app.use('/api/seed', batteryRouter)
app.use('/api/uploads', uploadRouter);
app.use("/auth", require("./routes/userRouter"));
app.use("/statistics", require("./routes/statisticsRouter"));
app.use("/backend/simulations", simulationRoutes);
app.use('/app', routesUrls);
app.use('/api/bateries', batteryRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

