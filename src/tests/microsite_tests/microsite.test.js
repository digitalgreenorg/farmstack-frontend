import "./matchMedia.mock";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GuestUserHome from "../../Views/GuestUser/GuestUserHomeNew";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("GuestUserHome Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the title correctly", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const titleElement = screen.getByText(/Explore true power of data/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the 'Get Started' button correctly", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const buttonElement = screen.getByText(/Get Started/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("clicking on the 'Get Started' button should navigate to the correct path", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const buttonElement = screen.getByText(/Get Started/i);
    fireEvent.click(buttonElement);
    expect(window.location.pathname).toBe("/home/get-started");
  });

  test("renders the 'Datasets' title correctly", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetsTitle = screen.getByText(/Datasets/i);
    expect(datasetsTitle).toBeInTheDocument();
  });

  test("renders dataset list", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetList = screen.getByTestId("dataset-list");
    expect(datasetList).toBeInTheDocument();
  });

  test("renders the 'Co-steward' title correctly", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const costewardTitle = screen.getByText(/Co-steward/i);
    expect(costewardTitle).toBeInTheDocument();
  });

  test("renders the 'Participants' title correctly", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const participantsTitle = screen.getByText(/Participants/i);
    expect(participantsTitle).toBeInTheDocument();
  });

  test("renders carousel for 'Co-steward'", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const costewardCarousel = screen.getByTestId("costeward-carousel");
    expect(costewardCarousel).toBeInTheDocument();
  });

  test("renders carousel for 'Participants'", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const participantsCarousel = screen.getByTestId("participants-carousel");
    expect(participantsCarousel).toBeInTheDocument();
  });

  test("renders the 'Maximise impact' title correctly", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const impactTitle = screen.getByText(/Maximise impact/i);
    expect(impactTitle).toBeInTheDocument();
  });

  test("clicking on the 'Get Started' button (at the bottom) should navigate to the correct path", () => {
    render(
      <Router>
        <GuestUserHome />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const buttonElement = screen.getByText(/Get Started/i);
    fireEvent.click(buttonElement);
    expect(window.location.pathname).toBe("/home/get-started");
  });

  // Add more test cases for other components and functionalities in the component
});
