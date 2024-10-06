"use strict";
const { Model, DataTypes, Op } = require("sequelize");

module.exports = (sequelize) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");
      const allItems = await Todo.findAll();
      const overdueItems = allItems.filter(item => item.dueDate < new Date().toISOString().split("T")[0]);
      const dueTodayItems = allItems.filter(item => item.dueDate === new Date().toISOString().split("T")[0]);
      const dueLaterItems = allItems.filter(item => item.dueDate > new Date().toISOString().split("T")[0]);

      console.log("Overdue");
      overdueItems.forEach((item) => console.log(item.displayableString()));

      console.log();

      console.log("Due Today");
      dueTodayItems.forEach((item) => console.log(item.displayableString()));

      console.log();

      console.log("Due Later");
      dueLaterItems.forEach((item) => console.log(item.displayableString()));
    }
    static async markAsComplete(id) {
      try {
        await Todo.update(
          { completed: true },
          { where: { id: id } }
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? '[x]' : '[ ]';
      let today = new Date().toISOString().split("T")[0];
      if (this.completed) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else if (this.dueDate < today) {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      } else if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
