import { createContext, ReactNode, useContext, useState } from "react";

export interface Todo {
  id: string;
  completed: boolean;
  description: string;
}

interface TodosContextType {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: string) => void;
  toggleCompletion: (id: string) => void;
}

interface Props {
  children: ReactNode;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const useTodos = () => useContext(TodosContext)!;

export const TodosProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const toggleCompletion = (id: string) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, deleteTodo, toggleCompletion }}>
      {children}
    </TodosContext.Provider>
  );
};
