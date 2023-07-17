import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileDetails from "../../Components/NewOnboarding/ProfileDetails";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { act } from "react-dom/test-utils";
import { getUserLocal, setUserId } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";

// jest.mock("axios");x
const userId = "0f76cb90-2394-499b-9b60-bf4cad3751a4";
describe("User profile", () => {
  // beforeEach(() => render(<ProfileDetails />, { wrapper: FarmStackProvider }));
  test("rendered correctly", () => {
    render(<ProfileDetails />, { wrapper: FarmStackProvider });
  });

  test("input existance and event triggering", () => {
    render(<ProfileDetails />, { wrapper: FarmStackProvider });
    //checking the element existence and onchange event
    const firstNameElement = screen.getByPlaceholderText("First Name");
    expect(firstNameElement).toBeInTheDocument();
    fireEvent.change(firstNameElement, { target: { value: "John" } });
    expect(firstNameElement.value).toBe("John");

    const lastNameElement = screen.getByPlaceholderText("Last Name");
    expect(lastNameElement).toBeInTheDocument();
    fireEvent.change(lastNameElement, { target: { value: "Doe" } });
    expect(lastNameElement.value).toBe("Doe");

    const emailElement = screen.getByPlaceholderText(/Enter mail id/i);
    expect(emailElement).toBeInTheDocument();
    fireEvent.change(emailElement, {
      target: { value: "johndoe@digitalgreen.org" },
    });
    expect(emailElement.value).toBe("johndoe@digitalgreen.org");

    const contactNumberElement = screen.getByPlaceholderText("Contact Number");
    expect(contactNumberElement).toBeInTheDocument();
    fireEvent.change(contactNumberElement, {
      target: { value: "91 9812301231" },
    });
    expect(contactNumberElement.value).toBe("+91 98123-01231");
  });

  test("email field is disabled", async () => {
    render(<ProfileDetails />, { wrapper: FarmStackProvider });
    const emailElement = screen.getByPlaceholderText(/Enter mail id/i);
    expect(emailElement).toBeDisabled();
  });

  test("value", async () => {
    setUserId("sometoken");
    const token = getUserLocal();
    let url = UrlConstant;
    render(<ProfileDetails />, { wrapper: FarmStackProvider });
    // act(async () => {
    let firstName = await screen.findByRole("textbox", { name: /first name/i });
    expect(firstName.value).toBe("digital");
    let lastName = await screen.findByRole("textbox", { name: /last name/i });
    expect(lastName.value).toBe("green");
    // let emailId = await screen.findByRole("textbox", { name: //i });
    // expect(lastName.value).toBe("green");
    // });
    // screen.debug();
    expect(true);
  });
});
