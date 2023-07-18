import { rest } from "msw";
import { server } from "../../mocks/server";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setUserId } from "../../Utils/Common";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import OrganizationDetails from "../../Components/NewOnboarding/OrganizationDetails";

afterEach(() => {
  cleanup();
});

describe("Positive scenerio for organisation details in setting and onboarding", () => {
  test("Component rendered successfully", () => {
    render(<OrganizationDetails />, {
      wrapper: FarmStackProvider,
    });
  });
});
