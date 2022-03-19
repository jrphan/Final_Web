const authRoute = require("./auth");
const departmentRoute = require("./department");
const userRoute = require("./user");
const postRoute = require("./post");
const commentRoute = require("./comment");
const notifyRoute = require("./notify");
const multer = require("multer");

function route(app) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      return await res.status(200).json("File uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  });

  app.use("/api/notify", notifyRoute);
  app.use("/api/post", postRoute);
  app.use("/api/comment", commentRoute);
  app.use("/api/user", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/department", departmentRoute);
  app.get("/", (req, res) => {
    res.send("home");
  });
}

module.exports = route;
