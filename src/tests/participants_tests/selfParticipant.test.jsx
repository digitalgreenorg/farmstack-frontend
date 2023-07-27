import React from "react";
import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { BrowserRouter as Router } from "react-router-dom";
import { setUserMapId } from "../../Utils/Common";
import { server } from "../../mocks/server";
import { rest } from "msw";
import ParticipantFormNew from "../../Components/Card/ParticipantForm/ParticipantFormNew";
import UrlConstant from "../../Constants/UrlConstants";
global.URL.createObjectURL = jest.fn(() => "mocked-object-url");
global.URL.revokeObjectURL = jest.fn();
describe("Self register module", () => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    cleanup();
  });
  test("renders Add participant component event triggering", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    const setIsCoStewardMock = jest.fn();
    render(
      <Router>
        <ParticipantFormNew  
        setIsCoSteward={setIsCoStewardMock}/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = screen.getByLabelText(/organisation name/i);
    fireEvent.change(orgName, { target: { value: "DG ORG" } });

    const orgEmail = screen.getByLabelText(/Orgnaisation email Id/);
    fireEvent.change(orgEmail, {
      target: { value: "eshrut@digitalgreen.org" },
    });

    const orgWebsite = screen.getByLabelText(/Website Link/i);
    fireEvent.change(orgWebsite, {
      target: { value: "https://www.digitalgreen.org" },
    });

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    fireEvent.change(orgAddress, { target: { value: "bangalore" } });

    const country = screen.getByLabelText(/Country/i);
    fireEvent.change(country, { target: { value: "India" } });

    const pincode = screen.getByLabelText(/PIN Code/i);
    fireEvent.change(pincode, { target: { value: "608001" } });

    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "John" } });

    const lastName = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastName, { target: { value: "David" } });

    const contactNumber = screen.getByLabelText(/Contact Number /i);
    fireEvent.change(contactNumber, { target: { value: "9344957735" } });

    const coStewardCheckbox = screen.getByLabelText(/Co-Steward/i);
    expect(coStewardCheckbox).toBeInTheDocument();
    fireEvent.change(coStewardCheckbox);
  });
  test("submit add part form", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    const setIsCoStewardMock = jest.fn();
    render(
      <Router>
        <ParticipantFormNew userType={false} 
        setIsCoSteward={setIsCoStewardMock}/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = screen.getByLabelText(/organisation name/i);
    fireEvent.change(orgName, { target: { value: "DG ORG" } });

    const orgEmail = screen.getByLabelText(/Orgnaisation email Id/);
    fireEvent.change(orgEmail, {
      target: { value: "eshrut@digitalgreen.org" },
    });

    const orgWebsite = screen.getByLabelText(/Website Link/i);
    fireEvent.change(orgWebsite, {
      target: { value: "https://www.digitalgreen.org" },
    });

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    fireEvent.change(orgAddress, { target: { value: "bangalore" } });

    const country = screen.getByLabelText(/Country/i);
    fireEvent.change(country, { target: { value: "India" } });

    const pincode = screen.getByLabelText(/PIN Code/i);
    fireEvent.change(pincode, { target: { value: "608001" } });

    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "John" } });

    const lastName = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastName, { target: { value: "David" } });

    const contactNumber = screen.getByLabelText(/Contact Number /i);
    fireEvent.change(contactNumber, { target: { value: "9344957735" } });

    const coStewardCheckbox = screen.getByLabelText(/Co-Steward/i);
    expect(coStewardCheckbox).toBeInTheDocument();
    fireEvent.change(coStewardCheckbox);

    const handleSubmitButton = screen.getByTestId("handle-submit-button");
    fireEvent.click(handleSubmitButton)

    const submitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    fireEvent.click(submitButton);

  });
  test("renders Add participant component event triggering of self part", async () => {
    render(
      <Router>
        <ParticipantFormNew userType={"guest"} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = screen.getByLabelText(/organisation name/i);
    fireEvent.change(orgName, { target: { value: "Dummy org" } });

    const orgWebsite = screen.getByLabelText(/Website Link/i);
    fireEvent.change(orgWebsite, {
      target: { value: "https://www.digitalgreen.org" },
    });
    const orgMail = screen.getByLabelText(/Orgnaisation email Id/i);
    fireEvent.change(orgMail, {
      target: { value: "dummy@gmail.com" },
    });

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    fireEvent.change(orgAddress, { target: { value: "Chennai" } });

    const country = screen.getByLabelText(/Country/i);
    fireEvent.change(country, { target: { value: "Anguilla" } });

    const pincode = screen.getByLabelText(/PIN Code/i);
    fireEvent.change(pincode, { target: { value: "234567456" } });

    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "test" } });

    const lastName = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastName, { target: { value: "testuser" } });

    // const emailId = screen.getByLabelText(/Mail Id/i);
    // fireEvent.change(emailId, { target: { value: "test@gmail.com" } });

    const contactNumber = screen.getByLabelText(/Contact Number /i);
    fireEvent.change(contactNumber, { target: { value: "+91 93449-57735" } });

  });
  test("submit self register form", async () => {
    render(
      <Router>
        <ParticipantFormNew userType={"guest"} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = screen.getByLabelText(/organisation name/i);
    fireEvent.change(orgName, { target: { value: "ekta dummy" } });

    const orgWebsite = screen.getByLabelText(/Website Link/i);
    fireEvent.change(orgWebsite, {
      target: { value: "https://www.digitalgreen.org" },
    });
    const orgMail = screen.getByLabelText(/Orgnaisation email Id/i);
    fireEvent.change(orgMail, {
      target: { value: "dummy@gmail.com" },
    });

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    fireEvent.change(orgAddress, { target: { value: "Chennai" } });

    const country = screen.getByLabelText(/Country/i);
    fireEvent.change(country, { target: { value: "Anguilla" } });

    const pincode = screen.getByLabelText(/PIN Code/i);
    fireEvent.change(pincode, { target: { value: "234567456" } });

    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "test" } });

    const lastName = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastName, { target: { value: "testuser" } });

    // const emailId = screen.getByLabelText(/Mail Id/i);
    // fireEvent.change(emailId, { target: { value: "test@gmail.com" } });

    const contactNumber = screen.getByLabelText(/Contact Number /i);
    fireEvent.change(contactNumber, { target: { value: "+91 93449-57735" } });

    const submitButtonElement = await screen.findByRole("button", {
      name: /Submit/i,
    });
    expect(submitButtonElement).toBeInTheDocument();
    fireEvent.click(submitButtonElement);
  });
   test("get all data for edit", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    render(
      <Router>
        <ParticipantFormNew isEditModeOn={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = await screen.findByRole("textbox", {
      name: /organisation name/i,
    });
    expect(orgName.value).toBe("ekta dummy");

    const orgEmail = await screen.findByRole("textbox", {
      name: /Orgnaisation email Id/i,
    });
    expect(orgEmail.value).toBe("ekta+part@digitalgreen.org");

    const orgWebsite = await screen.findByRole("textbox", {
      name: /Website Link/i,
    });
    expect(orgWebsite.value).toBe("https://www.google.com");

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    expect(orgAddress.value).toBe("patna");

    const country = await screen.findByRole("button", {
      name: /Country/i,
    });
    // expect(country.value).toBe("India");
    expect(country).toBeInTheDocument();

    const pincode = screen.getByLabelText(/PIN Code/i);
    expect(pincode.value).toBe("800001");

    const firstName = await screen.findByRole("textbox", {
      name: /First Name/i,
    });
    expect(firstName.value).toBe("ekta");

    // const lastName = await screen.findByRole("textbox", {
    //   name: /Last Name/i,
    // });
    // expect(lastName.value).toBe("part");

    // const lastName = screen.getByLabelText(/Last Name/i);
    // fireEvent.change(lastName, { target: { value: "David" } });

    // const contactNumber = screen.getByLabelText(/Contact Number /i);
    // fireEvent.change(contactNumber, { target: { value: "9344957735" } });

  });
  test("onclick of handlesubmit button", () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    render(
      <Router>
        <ParticipantFormNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const handleSubmitButton = screen.getByTestId("handle-submit-button");
    fireEvent.click(handleSubmitButton)
  })
  test("onclick of handlesubmit button", () => {
    render(
      <Router>
        <ParticipantFormNew userType={"guest"}/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const handleSubmitButton = screen.getByTestId("handle-submit-button");
    fireEvent.click(handleSubmitButton)
  })
  test("renders  participant form component change values event triggering on edit", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    render(
      <Router>
        <ParticipantFormNew isEditModeOn={true}/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = screen.getByLabelText(/organisation name/i);
    fireEvent.change(orgName, { target: { value: "ekta dummy" } });
    expect(orgName.value).toBe("ekta dummy");

    const orgWebsite = screen.getByLabelText(/Website Link/i);
    fireEvent.change(orgWebsite, {
      target: { value: "https://www.google.com" },
    });
    expect(orgWebsite.value).toBe("https://www.google.com");

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    fireEvent.change(orgAddress, { target: { value: "patna" } });
    expect(orgAddress.value).toBe("patna");

    const country = screen.getByLabelText(/Country/i);
    fireEvent.change(country, { target: { value: "India" } });
    expect(country.value).toBe("India");

    const pincode = screen.getByLabelText(/PIN Code/i);
    fireEvent.change(pincode, { target: { value: "800001" } });
    expect(pincode.value).toBe("800001");

    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "ekta" } });
    expect(firstName.value).toBe("ekta");

    const lastName = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastName, { target: { value: "part" } });
    expect(lastName.value).toBe("part");

    const contactNumber = screen.getByLabelText(/Contact Number /i);
    fireEvent.change(contactNumber, { target: { value: "+91 96114-57777" } });
    expect(contactNumber.value).toBe("+91 96114-57777");

    const SubmitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    fireEvent.click(SubmitButton);

  });
  test("edit and submit the form on edit", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    render(
      <Router>
        <ParticipantFormNew isEditModeOn={true}/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const orgName = screen.getByLabelText(/organisation name/i);
    fireEvent.change(orgName, { target: { value: "DG ORG" } });

    const orgWebsite = screen.getByLabelText(/Website Link/i);
    fireEvent.change(orgWebsite, {
      target: { value: "https://www.digitalgreen.org" },
    });

    const orgAddress = screen.getByLabelText(/Organisation Address /i);
    fireEvent.change(orgAddress, { target: { value: "bangalore" } });

    const country = screen.getByLabelText(/Country/i);
    fireEvent.change(country, { target: { value: "India" } });

    const pincode = screen.getByLabelText(/PIN Code/i);
    fireEvent.change(pincode, { target: { value: "608001" } });

    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "John" } });

    const lastName = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastName, { target: { value: "David" } });

    const contactNumber = screen.getByLabelText(/Contact Number /i);
    fireEvent.change(contactNumber, { target: { value: "9344957735" } });

    const submitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    fireEvent.click(submitButton);
  });
 
  test("click cancel button", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    render(
      <Router>
        <ParticipantFormNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const cancelButton = screen.getByRole("button", {
      name: /Cancel/i,
    });
    fireEvent.click(cancelButton);
  });
  test("click cancel button of self part", async () => {
    render(
      <Router>
        <ParticipantFormNew userType={"guest"} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const cancelButton = screen.getByRole("button", {
      name: /Cancel/i,
    });
    fireEvent.click(cancelButton);
  });
  test("click cancel button on edit", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    render(
      <Router>
        <ParticipantFormNew isEditModeOn={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const cancelButton = screen.getByRole("button", {
      name: /Cancel/i,
    });
    fireEvent.click(cancelButton);
  });
  test("check for self part button failure", async () => {
    server.use(
      rest.post(
        `${UrlConstant.base_url + UrlConstant.register_participant}`,
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json(
            {
              first_name: ["Invalid name"],
              last_name: ["Invalid last name"],
              email: ["email id not valid"],
              phone_number: ["Invalid formact"],
              name: ["Invalid org name"],
              org_email: ["Invalid email"],
              email: ["email id not valid"],
              website: ["Invalid website"],
            }
          ));
        }
      )
    );
    render(
      <Router>
        <ParticipantFormNew userType={"guest"} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("check for get list of costeward", async () => {
    server.use(
      rest.post(
        UrlConstant.base_url + "datahub/participant/get_list_co_steward/",
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <ParticipantFormNew userType={"guest"} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("get details view for edit", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    server.use(
      rest.get(
        UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <ParticipantFormNew isEditModeOn={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("update of part failure", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    server.use(
      rest.put(
        UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json()
          );
        }
      )
    );
    render(
      <Router>
        <ParticipantFormNew isEditModeOn={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("check for submit button failure", async () => {
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
    server.use(
      rest.post(
        `${UrlConstant.base_url + UrlConstant.participant}`,
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <ParticipantFormNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
});
