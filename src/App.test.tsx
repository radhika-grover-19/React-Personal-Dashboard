import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { ReactNode } from 'react';

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    BrowserRouter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  };
});

// Mocks for lazy-loaded components
jest.mock("./components/ToDoList", () => {
  return function DummyToDoList() {
    return <div>Your To-Dos</div>;
  };
});

jest.mock("./components/Weather", () => {
  return function DummyWeather() {
    return <div>Weather Forecast</div>;
  };
});

describe("App", () => {
  test("renders UserProfile and navigation links", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Manage To-Dos")).toBeInTheDocument();
    expect(screen.getByText("Check Weather")).toBeInTheDocument();
    expect(screen.getByText("Welcome, Edna Davis")).toBeInTheDocument();
  });

  test("navigates to ToDoList component on route /todo", async () => {
    render(
      <MemoryRouter initialEntries={["/todo"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Your To-Dos")).toBeInTheDocument();
    });
  });

  test("navigates to Weather component on route /weather", async () => {
    render(
      <MemoryRouter initialEntries={["/weather"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Weather Forecast")).toBeInTheDocument();
    });
  });
});
