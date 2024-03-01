import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Weather from "../index";

jest.mock("axios");

describe("Weather", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        name: "Vancouver",
        main: {
          temp: 8,
          humidity: 30,
        },
        weather: [{ description: "Light rain" }],
        wind: {
          speed: 4.1,
        },
      },
    });
  });

  test("renders Weather component", () => {
    render(<Weather />);
    expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("fetches weather data successfully", async () => {
    render(<Weather />);
    userEvent.type(screen.getByPlaceholderText("Enter city name"), "New York");
    userEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Vancouver")).toBeInTheDocument();
      expect(screen.getByText("8°C")).toBeInTheDocument();
      expect(screen.getByText("Light rain")).toBeInTheDocument();
      expect(screen.getByText("Humidity")).toBeInTheDocument();
      expect(screen.getByText("30%")).toBeInTheDocument();
      expect(screen.getByText("Wind")).toBeInTheDocument();
      expect(screen.getByText("4.1 m/s")).toBeInTheDocument();
    });
  });

  test("handles API error when fetching data fails", async () => {
    axios.get.mockRejectedValueOnce({
        response: {
            data: {
                message: 'City Not Found'
            }
        }
    });
    render(<Weather />);
    userEvent.type(
      screen.getByPlaceholderText("Enter city name"),
      "Invalid City"
    );
    userEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("City Not Found")).toBeInTheDocument();
    });
  });
});
