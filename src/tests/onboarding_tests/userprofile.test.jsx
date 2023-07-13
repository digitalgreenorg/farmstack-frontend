import React, { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileDetails from "../../Components/NewOnboarding/ProfileDetails";
import OnBoarding from "../../Views/Pages/HomeScreen/OnBoarding";
import FarmStackProvider, {
  FarmStackContext,
} from "../../Components/Contexts/FarmStackContext";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UrlConstant from "../../Constants/UrlConstants";

describe("User profile", () => {
  beforeEach(() =>
    render(
      <FarmStackProvider>
        <ProfileDetails />
      </FarmStackProvider>
    )
  );
  test("rendered correctly", () => {
    // render(
    //   <FarmStackProvider>
    //     <ProfileDetails />
    //   </FarmStackProvider>
    // );
  });

  test("input existance and event triggering", () => {
    // render(
    //   <FarmStackProvider>
    //     <ProfileDetails />
    //   </FarmStackProvider>
    // );
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
});
