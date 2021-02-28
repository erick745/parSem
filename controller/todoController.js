import mongoose from "../connection/connect.js";
import TodoModel from "../models/todoModel.js";
var todo = new TodoModel();
class TodoController {
  constructor() {}

  async createTodo(req, res) {
    var body = req.body;
    var result = await todo.createTodo(body);
    res.status(200).json({ serverResponse: result });
  }
  async deleteTodo(req, res) {
    var id = req.params.id;
    var result = await todo.deleteTodo(id);
    res.status(200).json({ serverResponse: result });
  }
  async updateTodo(req, res) {
    var id = req.params.id;
    var body = req.body;
    var result = await todo.updateTodo(id, body);
    res.status(200).json({ serverResponse: result });
  }
  async getTodo(req, res) {
    var key = null;
    var keysearch = null;
    if (req.params.key != null) {
      key = req.params.key;
      keysearch = {};
      keysearch["name"] = key;
    }

    console.log(keysearch);
    var result = await todo.getTodo(keysearch);
    console.log("----------------todo CONTROLLER--------------------------");
    console.log(result);
    console.log("----------------END CONTROLLER--------------------------");
    res.status(200).json({ serverResponse: result });
  }
}
export default TodoController;
