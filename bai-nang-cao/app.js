const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/addUser.html`);
});

app.get("/api/v1/users", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    res.json({
      users: users,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "Invalid path",
    });
  }
});

app.get("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let user = users.find((e, i) => e.id === Number(id));
    if (!user) {
      res.json({
        message: "user not found",
      });
    } else {
      res.json({
        user: user,
      });
    }
    console.log(user);
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "Invalid path",
    });
  }
});

app.post("/api/v1/users", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    const { user, count } = req.body;
    const newUser = {
      id: users.length + 1,
      user: user,
      count: count,
    };

    users.push(newUser);

    fs.writeFileSync("./data/users.json", JSON.stringify(users));

    res.json({
      status: "success",
      message: "Người dùng đã được tạo thành công.",
      user: newUser,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    res.status(500).json({
      status: "fail",
      message: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.",
      error: error.message,
    });
  }
});


app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
