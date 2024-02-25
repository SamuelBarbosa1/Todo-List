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
const moment = require("moment");

mongoose
  .connect("mongodb+srv://samuel:trav1234@cluster0.qnuva5l.mongodb.net/")
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

    ///Verifique seu email
    const existingUser = await User.findOne({ email });
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

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });

    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }

    user?.todos.push(newTodo._id);
    await user.save();

    res
      .status(200)
      .json({ message: "Tarefa adicionada com sucesso", todo: newTodo });
  } catch (error) {
    res.status(200).json({ message: "Tarefa não adicionada" });
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ error: "Algo deu errado" });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res
      .status(200)
      .json({ message: "Tarefa marcado como concluido", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Algo deu errado" });
  }
});

app.get("/todos/completed/:date", async (req, res) => {
  try {
    const date = req.params.date;

    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`), // COMEÇAR NA DATA SELECIONADA
        $lt: new Date(`${date}T23:59:59.999Z`), // FIM NA DATA SELECIONADA
      },
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ error: "Algo deu errado" });
  }
});

app.get("/todos/count", async (req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed", // completo
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending", // pedente
    }).exec();

    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    res.status(500).json({ error: "Falha na rede" });
  }
});

// finalizado
