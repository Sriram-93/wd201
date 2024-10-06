// createTodo.js
const { connect } = require('./connectDB');
const Todo = require('./TodoModel');

const createTodo = async () => {
  await connect();
  try {
    const todo=await Todo.addTask({
      title: "Complete Assignment",
      dueDate: "2024-10-06",
      completed: false
    });
    console.log(`Created todo with ID: ${todo.id}`);
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

const countItems =async ()=>{
  try{
    const total = await Todo.count();
    console.log(`found ${total} in the table`);
  }catch(error){
    console.error(error);
  }
}
const getAllTodos = async () => {
  try {
      const todos = await Todo.findAll();
      const todoList = todos.map(todo => todo.displayString()).join("\n");
      console.log(todoList);
  } catch (error) {
      console.error(error);
  }
};
const updateItem = async (id) => {
  try {
      const todo = await Todo.update(
          { completed: true }, // The field to update
          { where: { id: id } } // Condition to find the specific item by ID
      );
      console.log(todo.displayableString()); // Assuming 'displayableString' exists for updated todo
  } catch (error) {
      console.error(error);
  }
};
const deleteItem = async (id) => {
  try {
      const result = await Todo.destroy({
          where: { id: id } // Condition to find the specific item by ID
      });
      
     console.log(`deleted ${result} rows!`);
  } catch (error) {
      console.error(error);
  }
};


(async () => {
  await createTodo();
  //await countItems();
  await getAllTodos();
  //await deleteItem(5);
  //await getAllTodos();
})();
