import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  logDOM,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileDetails from "../../Components/NewOnboarding/ProfileDetails";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";

import { setUserId } from "../../Utils/Common";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import OnBoarding from "../../Views/Pages/HomeScreen/OnBoarding";

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("User profile", () => {
  userEvent.setup();
  test("rendered correctly", async () => {
    render(<ProfileDetails />, { wrapper: FarmStackProvider });
  });

  test("input existance and event triggering", async () => {
    render(<ProfileDetails isAccountSetting={false} />, {
      wrapper: FarmStackProvider,
    });

    //checking the element existence and onchange event
    const firstNameElement = screen.getByRole("textbox", {
      name: "First Name",
    });
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

  test("getting all the value by get and checking and submitting the same", async () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    setUserId("sometoken");
    render(<ProfileDetails setActiveStep={setActiveStep} />, {
      wrapper: FarmStackProvider,
    });

    let firstName = await screen.findByRole("textbox", { name: /first name/i });
    expect(firstName.value).toBe("digital");

    let lastName = await screen.findByRole("textbox", { name: /last name/i });
    expect(lastName.value).toBe("green");
    let emailId = await screen.findByRole("textbox", {
      name: /Enter mail id/i,
    });
    expect(emailId.value).toBe("dgemail@digitalgreen.org");
    let phoneNumber = await screen.findByRole("textbox", {
      name: /Contact Number/i,
    });
    expect(phoneNumber.value).toBe("+91 98989-89898");

    const submitOrNextButton = screen.getByRole("button", {
      name: "Next",
    });
    expect(submitOrNextButton).toBeInTheDocument();
    fireEvent.click(submitOrNextButton);
    expect(step).toBe(1);
  });

  test("checking for all the labels inside onboarding profile detail step", () => {
    render(<ProfileDetails isAccountSetting={false} />, {
      wrapper: FarmStackProvider,
    });
    const finishLater = screen.getByRole("button", {
      name: /finish later/i,
    });
    expect(finishLater).toHaveTextContent("Finish later");

    const AccountSettingLabel = screen.getByText(/Profile Details/);
    expect(AccountSettingLabel.textContent).toBe("Profile Details");
    // try {

    // } catch (error) {

    // }
    // fireEvent.click(finishLater);
  });

  test("submitting the form without data", async () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    act(() => {
      setUserId("userid");
    });
    render(<ProfileDetails setActiveStep={setActiveStep} />, {
      wrapper: FarmStackProvider,
    });

    let firstName = await screen.findByRole("textbox", { name: /first name/i });
    expect(firstName.value).toBe("digital");

    let lastName = await screen.findByRole("textbox", { name: /last name/i });
    expect(lastName.value).toBe("green");
    let emailId = await screen.findByRole("textbox", {
      name: /Enter mail id/i,
    });
    expect(emailId.value).toBe("dgemail@digitalgreen.org");
    let phoneNumber = await screen.findByRole("textbox", {
      name: /Contact Number/i,
    });
    expect(phoneNumber.value).toBe("+91 98989-89898");

    const submitOrNextButton = screen.getByRole("button", {
      name: "Next",
    });
    setUserId("error");
    expect(submitOrNextButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(submitOrNextButton);
    });
    expect(step).toBe(1);
  });

  test("preset email id in the localstorage", () => {
    act(() => {
      localStorage.setItem("email", "someemail@digitalgreen.org");
    });
    render(<ProfileDetails />, {
      wrapper: FarmStackProvider,
    });
    act(() => {
      localStorage.getItem("email");
    });
  });

  test("if error not related with the key value wrong i.e related with token", async () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    act(() => {
      setUserId("userid");
    });
    render(<ProfileDetails setActiveStep={setActiveStep} />, {
      wrapper: FarmStackProvider,
    });

    let firstName = await screen.findByRole("textbox", { name: /first name/i });
    expect(firstName.value).toBe("digital");

    let lastName = await screen.findByRole("textbox", { name: /last name/i });
    expect(lastName.value).toBe("green");
    let emailId = await screen.findByRole("textbox", {
      name: /Enter mail id/i,
    });
    expect(emailId.value).toBe("dgemail@digitalgreen.org");
    let phoneNumber = await screen.findByRole("textbox", {
      name: /Contact Number/i,
    });
    expect(phoneNumber.value).toBe("+91 98989-89898");

    const submitOrNextButton = screen.getByRole("button", {
      name: "Next",
    });
    setUserId("token_failure");
    expect(submitOrNextButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(submitOrNextButton);
    });
    expect(step).toBe(1);
  });
  test("if error not related with the key value wrong i.e status 403", async () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    act(() => {
      setUserId("userid");
    });
    render(<ProfileDetails setActiveStep={setActiveStep} />, {
      wrapper: FarmStackProvider,
    });

    let firstName = await screen.findByRole("textbox", { name: /first name/i });
    expect(firstName.value).toBe("digital");

    let lastName = await screen.findByRole("textbox", { name: /last name/i });
    expect(lastName.value).toBe("green");
    let emailId = await screen.findByRole("textbox", {
      name: /Enter mail id/i,
    });
    expect(emailId.value).toBe("dgemail@digitalgreen.org");
    let phoneNumber = await screen.findByRole("textbox", {
      name: /Contact Number/i,
    });
    expect(phoneNumber.value).toBe("+91 98989-89898");

    const submitOrNextButton = screen.getByRole("button", {
      name: "Next",
    });
    setUserId("status403");
    expect(submitOrNextButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(submitOrNextButton);
    });
    expect(step).toBe(1);
  });

  test("checking for the labels in account setting", () => {
    render(<ProfileDetails isAccountSetting={true} />, {
      wrapper: FarmStackProvider,
    });
    const AccountSetting = screen.getByText("Account settings");
    expect(AccountSetting).toHaveTextContent("Account settings");
  });

  test("submit in the account settings", async () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    setUserId("sometoken");
    render(
      <ProfileDetails isAccountSetting={true} setActiveStep={setActiveStep} />,
      {
        wrapper: FarmStackProvider,
      }
    );

    let firstName = await screen.findByRole("textbox", { name: /first name/i });
    expect(firstName.value).toBe("digital");

    let lastName = await screen.findByRole("textbox", { name: /last name/i });
    expect(lastName.value).toBe("green");
    let emailId = await screen.findByRole("textbox", {
      name: /Enter mail id/i,
    });
    expect(emailId.value).toBe("dgemail@digitalgreen.org");
    let phoneNumber = await screen.findByRole("textbox", {
      name: /Contact Number/i,
    });
    expect(phoneNumber.value).toBe("+91 98989-89898");

    const submitOrNextButton = screen.getByRole("button", {
      name: "Submit",
    });
    expect(submitOrNextButton).toBeInTheDocument();
    fireEvent.click(submitOrNextButton);
    expect(step).toBe(1);
  });

  test("getting error while", () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    setUserId("error_in_get");
    render(
      <ProfileDetails isAccountSetting={true} setActiveStep={setActiveStep} />,
      {
        wrapper: FarmStackProvider,
      }
    );
  });

  test("giving wrong phone number", () => {
    let step = 1;
    const setActiveStep = () => {
      return step++;
    };
    setUserId("token");
    render(
      <ProfileDetails isAccountSetting={true} setActiveStep={setActiveStep} />,
      {
        wrapper: FarmStackProvider,
      }
    );
    const contactNumberElement = screen.getByPlaceholderText("Contact Number");
    expect(contactNumberElement).toBeInTheDocument();
    userEvent.type(contactNumberElement, "+91 198204-6218");
    userEvent.type(contactNumberElement, "+91 98204-6218");
  });
});
