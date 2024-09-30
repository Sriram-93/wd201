/* eslint-disable no-undef */
const todoList = require("../todo");
let todos;
todos = todoList();
describe("Todolist Test Suite", () => {
  test("Should add new todo", () => {
    const todoItemsCount = todos.all.length; // Use todos.all to get the count
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });

    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should test overdue todos", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const yesterday = formattedDate(
      new Date(dateToday.setDate(dateToday.getDate() - 1)),
    );
    const overDueTodoItemsCount = todos.overdue().length;
    const overdueAdd = {
      title: "learn wd201",
      dueDate: yesterday,
      completed: false,
    };
    todos.add(overdueAdd);
    expect(todos.overdue().length).toEqual(overDueTodoItemsCount + 1);
  });

  test("Should test due today todos", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const today = formattedDate(dateToday);

    const DueTodoItemsCount = todos.dueToday().length;
    const dueAdd = { title: "learn wd201", dueDate: today, completed: false };
    todos.add(dueAdd);
    expect(todos.dueToday().length).toEqual(DueTodoItemsCount + 1);
  });

  test("Should test due later todos", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const tomorrow = formattedDate(
      new Date(dateToday.setDate(dateToday.getDate() + 1)),
    ); // Change to +1 for tomorrow

    const DueTodoItemsCount = todos.dueLater().length;
    const dueAdd = {
      title: "learn wd201",
      dueDate: tomorrow,
      completed: false,
    };
    todos.add(dueAdd);
    expect(todos.dueLater().length).toEqual(DueTodoItemsCount + 1);
  });
});
