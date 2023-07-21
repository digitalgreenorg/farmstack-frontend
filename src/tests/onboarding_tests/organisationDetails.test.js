import React from "react";
import { server } from "../../mocks/server";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setRoleLocal, setUserId } from "../../Utils/Common";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import OrganizationDetails from "../../Components/NewOnboarding/OrganizationDetails";
import { BrowserRouter as Router } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";

describe("Positive scenerio for organisation details in setting and onboarding", () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    // cleanup();
  });
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

  test("Checking for all the labels present in organisation detail component during onboarding", () => {
    render(
      <Router>
        <OrganizationDetails />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );

    // {props.isOrgSetting
    //   ? "Organisation settings"
    //   : " Organisation Details"}
    // {props.isOrgSetting
    //   ? "Manage and update your organization's details to reflect accurate and up-to-date information."
    //   : ""}
    // {props.isOrgSetting ? (
    //   ""
    // ) : (
    //   <div className={styles.sub_label}>
    //     Enter your organisation details, we will show to others!
    //   </div>
    // )}
    expect(screen.getByText("Organisation Details")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Enter your organisation details, we will show to others!"
      )
    ).toBeInTheDocument();
  });

  test("Checking for all the input and get call", async () => {
    setRoleLocal("datahub_admin");
    const setActiveStep = jest.fn();
    render(
      <Router>
        <OrganizationDetails setActiveStep={setActiveStep} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );

    const organisationNameElement = await screen.findByRole("textbox", {
      name: /organisation name/i,
    });
    expect(organisationNameElement.value).toBe("Digital green");

    const organisationEmailElement = await screen.findByRole("textbox", {
      name: /organisation mail id/i,
    });
    expect(organisationEmailElement.value).toBe("dg@digitalgreen.com");

    const organisationWebSiteLinkElement = await screen.findByRole("textbox", {
      name: /website link/i,
    });
    expect(organisationWebSiteLinkElement.value).toBe(
      "https://www.digitalgreen.org"
    );
    const organisationMobileNumberElement = await screen.findByRole("textbox", {
      name: /organisation contact number/i,
    });
    expect(organisationMobileNumberElement.value).toBe("+91 97380-19097");
    const organisationOrgAddressElement = await screen.findByRole("textbox", {
      name: /organisation address/i,
    });
    expect(organisationOrgAddressElement.value).toBe(
      "4th block, Koramangala, New Hp Petrol pump, Bangalore"
    );

    const countryElement = await screen.findByRole("button", {
      name: /Argentina/i,
    });
    expect(countryElement).toBeInTheDocument();

    const pinCodeElement = await screen.findByRole("textbox", {
      name: /pin code/i,
    });
    expect(pinCodeElement.value).toBe("12345678654321");
    const organisationDescriptionElement = await screen.findByLabelText(
      /organisation description/i
    );
    expect(organisationDescriptionElement).toBeInTheDocument();
    expect(organisationDescriptionElement.value).toBe(
      "Digital Green is a non-profit organization that was founded in 2006 and is based in Koramangala, Bangalore. The organization uses technology to empower smallholder farmers in developing countries by sharing agricultural knowledge and practices."
    );
    const submitButtonElement = await screen.findByRole("button", {
      name: /next/i,
    });
    expect(submitButtonElement).toBeInTheDocument();

    screen.debug();
    // expect(countryElement.value).toBe("Argentina");
  });

  test("Submitting the form", async () => {
    setRoleLocal("datahub_admin");
    const setActiveStep = jest.fn();
    render(
      <Router>
        <OrganizationDetails setActiveStep={setActiveStep} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );

    const organisationNameElement = await screen.findByRole("textbox", {
      name: /organisation name/i,
    });
    expect(organisationNameElement.value).toBe("Digital green");

    const organisationEmailElement = await screen.findByRole("textbox", {
      name: /organisation mail id/i,
    });
    expect(organisationEmailElement.value).toBe("dg@digitalgreen.com");

    const organisationWebSiteLinkElement = await screen.findByRole("textbox", {
      name: /website link/i,
    });
    expect(organisationWebSiteLinkElement.value).toBe(
      "https://www.digitalgreen.org"
    );
    const organisationMobileNumberElement = await screen.findByRole("textbox", {
      name: /organisation contact number/i,
    });
    expect(organisationMobileNumberElement.value).toBe("+91 97380-19097");
    const organisationOrgAddressElement = await screen.findByRole("textbox", {
      name: /organisation address/i,
    });
    expect(organisationOrgAddressElement.value).toBe(
      "4th block, Koramangala, New Hp Petrol pump, Bangalore"
    );

    const countryElement = await screen.findByRole("button", {
      name: /Argentina/i,
    });
    expect(countryElement).toBeInTheDocument();

    const pinCodeElement = await screen.findByRole("textbox", {
      name: /pin code/i,
    });
    expect(pinCodeElement.value).toBe("12345678654321");
    const organisationDescriptionElement = await screen.findByLabelText(
      /organisation description/i
    );
    expect(organisationDescriptionElement).toBeInTheDocument();
    expect(organisationDescriptionElement.value).toBe(
      "Digital Green is a non-profit organization that was founded in 2006 and is based in Koramangala, Bangalore. The organization uses technology to empower smallholder farmers in developing countries by sharing agricultural knowledge and practices."
    );
    const submitButtonElement = await screen.findByRole("button", {
      name: /next/i,
    });
    expect(submitButtonElement).toBeInTheDocument();
    fireEvent.click(submitButtonElement);
    screen.debug();
    // expect(countryElement.value).toBe("Argentina");
  });
});

describe("NEGATIVE SCENERIO for organisation details", () => {
  test("failing of get call", async () => {
    server.use(
      rest.get(`${undefined}${UrlConstant.org}:userId/`, (req, res, ctx) => {
        console.log("inside 1234 failed call");
        return res(
          ctx.status(401),
          ctx.json({
            code: "token_not_valid",
            access: "Given token not valid for any token type",
            messages: [
              {
                token_class: "AccessToken",
                token_type: "access",
                message: "Token is invalid or expired",
              },
            ],
            0: {
              token_class: "AccessToken",
              token_type: "access",
              message: "Token is invalid or expired",
            },
          })
        );
      })
    );
    setRoleLocal("datahub_admin");
    const setActiveStep = jest.fn();
    render(
      <Router>
        <OrganizationDetails setActiveStep={setActiveStep} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
});