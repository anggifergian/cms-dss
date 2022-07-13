const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname + '/app')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})