import React from "react";
import { server } from "../../mocks/server";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setUserId } from "../../Utils/Common";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import OrganizationDetails from "../../Components/NewOnboarding/OrganizationDetails";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(() => {
  cleanup();
});
beforeEach(() => {
  // cleanup();
});

describe("Positive scenerio for organisation details in setting and onboarding", async () => {
  console.log("something");
  test("Component rendered successfully", () => {
    render(
      <Router>
        <OrganizationDetails />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
});
