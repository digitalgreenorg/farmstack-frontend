import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { setUserId } from "../../Utils/Common";
import StandardizationInOnbord from "../../Components/Standardization/StandardizationInOnbording";
import userEvent from "@testing-library/user-event";

describe("Datapoint Setting", () => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    cleanup();
  });
  test("renders Datapoint without crashing", () => {
    setUserId("sometoken");
    render(<StandardizationInOnbord />, {
      wrapper: FarmStackProvider,
    });
  });
  // test("input existenece", async () => {
  //   setUserId("sometoken");

  //   render(<StandardizationInOnbord inSettings={true} />, {
  //     wrapper: FarmStackProvider,
  //   });

  //   expect(
  //     screen.getByRole("textbox", {
  //       name: "Datapoint name",
  //     })
  //   ).toBeInTheDocument();
  //   expect(screen.getByLabelText("Datapoint description")).toBeInTheDocument();
  //   expect(screen.getByText(/Add/i)).toBeInTheDocument();
  // });
  test("renders list of datapoints", async () => {
    setUserId("sometoken");
    render(<StandardizationInOnbord inSettings={true} />, {
      wrapper: FarmStackProvider,
    });
    const datapoints = await screen.findAllByTestId("accordion");
    expect(datapoints).toHaveLength(2);
  });
  test("Add datapoint", async () => {
    setUserId("sometoken");
    render(<StandardizationInOnbord inSettings={true} />, {
      wrapper: FarmStackProvider,
    });
    const dataPointName = screen.getByRole("textbox", {
      name: "Datapoint name",
    });
    const dataPointDescription = screen.getByLabelText("Datapoint description");

    const addButton = screen.getByText(/Add/i);

    fireEvent.change(dataPointName, {
      target: { value: "sample datapoint" },
    });
    fireEvent.change(dataPointDescription, {
      target: { value: "sample datapoint description" },
    });
    fireEvent.click(addButton);

    const submitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    fireEvent.click(submitButton);

    const datapoints = await screen.findAllByTestId("accordion");
    // expect(datapoints).toBE(1);
  });
});
