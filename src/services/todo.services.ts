import { Todo } from "./../entities/todo";
import TodoPorts from "@/ports/todo.ports";

export default class TodoService {
  #_todoPorts: TodoPorts;

  constructor() {
    this.#_todoPorts = new TodoPorts();
  }

  async getTodo() {
    const response = await this.#_todoPorts.getAllTodo();
    const data = response.data;

    let todos: Todo[] = [];

    if (!Array.isArray(data)) return false;

    todos = data.filter(this.checkDataIsTodo);

    const countTodo = todos.filter((item) => item.completed === false).length;

    return {
      data: todos,
      count: countTodo,
    };
  }

  async createATodo(todo: Todo) {
    const check = this.checkDataIsTodo(todo);

    if (!check) return false

    const response = await this.#_todoPorts.createTodo(todo)

    if (response.statusText === "Created") return true

    return false
  }

  async updateTodo(todo: Todo) {
    const check = this.checkDataIsTodo(todo);

    if (!check) return false

    const response = await this.#_todoPorts.updateTodo(todo)

    if (response.statusText === "OK") return true
    return false
  }

  async deleteTodo(idTodo: string) {
    const response = await this.#_todoPorts.deleteTodo(idTodo);
    return response
  }

  checkDataIsTodo(data: any): data is Todo {
    return (
      typeof data.title === "string" &&
      typeof data.content === "string" &&
      typeof data.completed === "boolean" &&
      typeof data.createdAt === "string" &&
      typeof data.endDateTime === "string" &&
      typeof data.marked === "boolean" &&
      typeof data.location === "string" 
    );
  }
}
