const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));