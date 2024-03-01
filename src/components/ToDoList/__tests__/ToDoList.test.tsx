import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ToDoList from '../index';
import { useTodos } from '../ToDoContext';

jest.mock('../ToDoContext', () => ({
  useTodos: jest.fn(),
}));

const mockAddTodo = jest.fn();
const mockDeleteTodo = jest.fn();
const mockToggleCompletion = jest.fn();

const mockTodos = [
  { id: '1', description: 'Book physician appointment', completed: false },
  { id: '2', description: 'Hit the gym', completed: true },
];

describe('ToDoList', () => {
  beforeEach(() => {
    useTodos.mockImplementation(() => ({
      todos: mockTodos,
      addTodo: mockAddTodo,
      deleteTodo: mockDeleteTodo,
      toggleCompletion: mockToggleCompletion,
    }));
  });

  test('renders ToDoList component with initial todos', () => {
    render(<ToDoList />);

    expect(screen.getByText('Your To-Dos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter To-do')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
    expect(screen.getByText('Book physician appointment')).toBeInTheDocument();
    expect(screen.getByText('Hit the gym')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<ToDoList />);
    userEvent.type(screen.getByPlaceholderText('Enter To-do'), 'New Todo');
    userEvent.click(screen.getByText('Add To-do'));

    expect(mockAddTodo).toHaveBeenCalledWith({
      id: expect.any(String),
      description: 'New Todo',
      completed: false,
    });
  });

  test('toggles todo completion', () => {
    render(<ToDoList />);
    const toggleCheckbox = screen.getAllByRole('checkbox')[0];
    userEvent.click(toggleCheckbox);

    expect(mockToggleCompletion).toHaveBeenCalledWith(mockTodos[0].id);
  });

  test('deletes a todo', () => {
    render(<ToDoList />);
    const deleteButtons = screen.getAllByText('Delete');
    userEvent.click(deleteButtons[0]);

    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
