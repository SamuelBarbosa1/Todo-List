const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://samuel:trav1234@cluster0.qnuva5l.mongodb.net/"
  )
  .then(() => {
    console.log("Conectado ao MongoDb");
  })
  .catch((error) => {
    console.log("Erro ao conectar no mongoDb", error);
  });

app.listen(port, () => {
  console.log("Server esta rodando na porta 3000");
});

const User = require("./models/user");
const Todo = require("./models/todo");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    ///check if email is already registered
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log("Email já registrado");
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(202).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.log("Erro ao registrar o usuário", error);
    res.status(404).json({ message: "Registro falhou" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email inválido" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Login falhou", error);
    res.status(500).json({ message: "Falha no login" });
  }
});