"use strict";
const { Model, DataTypes,Op ,Todo} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((item) => console.log(item.displayableString()));

      console.log();

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((item) => console.log(item.displayableString()));

      console.log();

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((item) => console.log(item.displayableString()));
    }

    static async overdue() {
      const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: today }, // Tasks overdue
          completed: false,
        },
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format
      return await Todo.findAll({
        where: {
          dueDate: today, // Tasks due today
          completed: false,
        },
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: today }, // Tasks due later
          completed: false,
        },
      });
    }

    static async markAsComplete(id) {
      try {
        await Todo.update(
          { completed: true },
          {
            where: { id },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let today = new Date().toISOString().split("T")[0];
      if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
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
