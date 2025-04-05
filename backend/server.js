const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Anand24:Anand24@cluster0.n5mskdu.mongodb.net/Todo-app?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
