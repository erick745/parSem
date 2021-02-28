import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
class TodoModel {
  constructor() {
    var Schema = mongoose.Schema;
    this.todoSchema = new Schema({
      name: { type: String, required: true },

      description: { type: String },

      date: {
        type: Date,
        default: Date.now,
      },

      hour: { type: String },

      done: {
        type: Boolean,
        default: false,
      },
    });
    if (modelenum["todo"] == null) {
      this.mymodel = mongoose.model("todo", this.todoSchema);
      modelenum["todo"] = this.mymodel;
    } else {
      this.mymodel = modelenum["todo"];
    }
  }
  getModel() {
    return this.mymodel;
  }
  getSchema() {
    return this.todoSchema;
  }
  createTodo(tododata) {
    var todoNuevo = new this.mymodel(tododata);
    var error = todoNuevo.validateSync();
    return new Promise((resolve, reject) => {
      if (error) {
        console.log("ERROR: ------------- Name es obligatorio --------------");
        resolve(error);
        return;
      }
      todoNuevo.save().then((docs) => {
        console.log("MSG: ------------- Elemento Todo Creado --------------");
        resolve(docs);
      });
    });
  }
  async deleteTodo(id) {
    const result = await this.mymodel.remove({ _id: id });
    console.log("MSG: ------------- Elemento Todo Eliminado --------------");
    return result;
  }
  async updateTodo(id, updatedata) {
    const result = await this.mymodel.update({ _id: id }, { $set: updatedata });
    console.log("MSG: ------------- Elemento Todo Actualizado --------------");
    return result;
  }

  async hechoTodo(id) {
    const result = await this.mymodel.update(
      { _id: id },
      { $set: { done: true } }
    );
    console.log("MSG: ------------- Elemento Realizado (True) --------------");
    return result;
  }
  async getTodo(key) {
    var filter = {};
    if (key != null) {
      filter = key;
    }
    const result = await this.mymodel.find(filter);
    console.log("---------- MODEL -----------");
    console.log(result);
    console.log("---------- END MODEL -----------");

    return result;
  }
}
export default TodoModel;
