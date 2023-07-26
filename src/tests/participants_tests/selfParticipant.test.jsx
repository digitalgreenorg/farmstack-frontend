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

describe("Self register module", () => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    cleanup();
  });

  test("renders Add participant component event triggering", async () => {
    render(
      <Router>
        <ParticipantFormNew />
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
  });
  test("get all data", async () => {
    render(
      <Router>
        <ParticipantFormNew />
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

    const SubmitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    fireEvent.click(SubmitButton);
  });


  test("click cancel button", async() => {
    
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
  })
  test("check for self part button failure", async () => {
    server.use(
      rest.post(
        `${UrlConstant.base_url + UrlConstant.register_participant}`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              first_name: ["Invalid name"],
              name: ["Name already exist"],
              website: ["Invalid website link"],
              selectedCosteward: ["Invalid"],
            })
          );
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
  test("check for get list of costeward", async () => {
    server.use(
      rest.post(
        UrlConstant.base_url + "datahub/participant/get_list_co_steward/",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              first_name: ["Invalid name"],
              name: ["Name already exist"],
              website: ["Invalid website link"],
              selectedCosteward: ["Invalid"],
            })
          );
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
  test("get details view for edit", async () => {
    server.use(
      rest.get(
        UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              first_name: ["Invalid name"],
              name: ["Name already exist"],
              website: ["Invalid website link"],
              selectedCosteward: ["Invalid"],
            })
          );
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
  test("update of part", async () => {
    server.use(
      rest.put(
        UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              first_name: ["Invalid name"],
              name: ["Name already exist"],
              website: ["Invalid website link"],
              selectedCosteward: ["Invalid"],
            })
          );
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
