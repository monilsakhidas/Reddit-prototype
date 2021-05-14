const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { mongoDB } = require("./utils/config");
const { auth } = require("./utils/passport");
const passport = require("passport");
const redis = require("redis");
const client = redis.createClient({ detect_buffers: true });
client.on("error", function (error) {
  console.error(error);
});

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273_reddit",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Making public folder for saving all the files
app.use(express.static("public"));

// Using Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
auth();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 1,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err) => {
  if (err) {
    console.log(err);
    console.log("MongoDB Connection Failed");
  } else {
    console.log("MongoDB Connected Backend");
  }
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use("/user", require("./Routes/user"));
app.use("/community", require("./Routes/community"));
app.use("/post", require("./Routes/post"));
app.use("/chat", require("./Routes/chat"));
app.use("/communityAnalytics", require("./Routes/communityAnalytics"));

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

module.exports = app;
