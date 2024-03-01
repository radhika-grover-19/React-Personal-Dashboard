import "./App.scss";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import { TodosProvider } from "./components/ToDoList/ToDoContext";

const ToDoList = lazy(() => import("./components/ToDoList"));
const Weather = lazy(() => import("./components/Weather"));

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <UserProfile />
          <TodosProvider>
            <nav>
              <ul>
                <li>
                  <Link to="/todo">Manage To-Dos</Link>
                </li>
                <li>
                  <Link to="/weather">Check Weather</Link>
                </li>
              </ul>
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/todo" element={<ToDoList />} />
                <Route path="/weather" element={<Weather />} />
              </Routes>
            </Suspense>
          </TodosProvider>
        </header>
      </div>
    </Router>
  );
}

export default App;
