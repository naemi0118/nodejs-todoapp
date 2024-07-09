const express = require("express");
const app = express();
const router = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./Public/"));

const PORT = 5000;

// ルーティング設計
app.use("/api/v1/tasks", router);

// データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_HEROKU_URL || process.env.MONGODB_URL); // envファイルに格納したDBのURLを呼び出す変数
    app.listen(
      process.env.PORT || PORT,
      console.log("サーバーが起動しました！")
    );
  } catch (err) {
    console.log(err);
  }
};

start();
