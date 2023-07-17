import React from "react";
import { render, screen } from "@testing-library/react";
import GuestUserHome from "./GuestUserHomeNew";

describe("GuestUserHome", () => {
  test("renders the title correctly", () => {
    render(<GuestUserHome />);
    const titleElement = screen.getByText(/Explore true power of data/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the 'Get Started' button", () => {
    render(<GuestUserHome />);
    const buttonElement = screen.getByRole("button", { name: /Get Started/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders the dataset list", () => {
    render(<GuestUserHome />);
    const datasetListElement = screen.getByTestId("dataset-list");
    expect(datasetListElement).toBeInTheDocument();
  });

  test("renders the co-steward participants section", () => {
    render(<GuestUserHome />);
    const costewardSectionElement = screen.getByText(/Co-steward/i);
    expect(costewardSectionElement).toBeInTheDocument();
  });

  test("renders the participants section", () => {
    render(<GuestUserHome />);
    const participantsSectionElement = screen.getByText(/Participants/i);
    expect(participantsSectionElement).toBeInTheDocument();
  });
});
