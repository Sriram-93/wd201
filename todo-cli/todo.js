const todoList = () => {
    all = [];
    const add = (todoItem) => {
      all.push(todoItem);
    };
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      return all.filter(
        (item) => item.dueDate < today.toISOString().slice(0, 10)
      );
    };
  
    const dueToday = () => {
      return all.filter(
        (item) => item.dueDate === today.toISOString().slice(0, 10)
      );
    };
  
    const dueLater = () => {
      return all.filter(
        (item) => item.dueDate > today.toISOString().slice(0, 10)
      );
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
  