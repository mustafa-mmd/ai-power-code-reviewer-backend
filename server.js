const app = require("./src/app"); 
require("dotenv").config()
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
