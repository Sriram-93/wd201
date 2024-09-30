/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const formattedDate = (d) => d.toISOString().split("T")[0];
  const today = new Date();
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => item.dueDate < formattedDate(today));
  };

  const dueToday = () => {
    return all.filter((item) => item.dueDate === formattedDate(today));
  };

  const dueLater = () => {
    return all.filter((item) => item.dueDate > formattedDate(today));
  };

  const toDisplayableList = (list) => {
    return list
      .map((item) => {
        let checkbox = item.completed ? `[x]` : `[ ]`;
        let displaydate = item.dueDate === today ? `` : `${item.dueDate}`;
        return `${checkbox} ${item.title} ${displaydate}`;
      })
      .join("\n");
  };
  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
