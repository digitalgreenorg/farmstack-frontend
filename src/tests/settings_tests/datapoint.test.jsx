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
  test("input existenece", async () => {
    setUserId("sometoken");

    render(<StandardizationInOnbord isSettings={true} />, {
      wrapper: FarmStackProvider,
    });

    expect(
      screen.getByRole("textbox", {
        name: "Datapoint name",
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Datapoint description")).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
  });
  test("renders list of datapoints", async () => {
    setUserId("sometoken");
    render(<StandardizationInOnbord isSettings={true} />, {
      wrapper: FarmStackProvider,
    });
    // const policies = await screen.findAllByTestId("accordion");
    // expect(policies).toHaveLength(2);
    // expect(policies[0]).toHaveTextContent("jiohujgvbv");
  });
});
