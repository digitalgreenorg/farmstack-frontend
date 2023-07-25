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
import userEvent from "@testing-library/user-event";
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
      test("renders Add Support component without crashing", async() => {
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
    
        // let emailId = await screen.findByRole("textbox", {
        //   name: /Mail Id/i,
        // });
        // expect(emailId.value).toBe("dgemail@digitalgreen.org");
        // const orgMail = screen.getByLabelText(/Mail Id/i); 
        // fireEvent.change(orgMail, { target: { value: "shruthi@dg.org" } });
        const orgWebsite = screen.getByLabelText(/Website Link/i); 
        fireEvent.change(orgWebsite, { target: { value: "https://www.digitalgreen.org" } });

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
        })
        fireEvent.click(SubmitButton)
        const cancelButton = screen.getByRole("button", {
          name: /Cancel/i,
        })
        fireEvent.click(cancelButton)
      });

      test("check for self part button failure", async() => {
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
        const orgName = screen.getByLabelText(/organisation name/i); 
        fireEvent.change(orgName, { target: { value: "DG ORG" } });
    
        // let emailId = await screen.findByRole("textbox", {
        //   name: /Mail Id/i,
        // });
        // expect(emailId.value).toBe("dgemail@digitalgreen.org");
        // const orgMail = screen.getByLabelText(/Mail Id/i); 
        // fireEvent.change(orgMail, { target: { value: "shruthi@dg.org" } });
        const orgWebsite = screen.getByLabelText(/Website Link/i); 
        fireEvent.change(orgWebsite, { target: { value: "https://www.digitalgreen.org" } });

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
        })
        fireEvent.click(SubmitButton)
        const cancelButton = screen.getByRole("button", {
          name: /Cancel/i,
        })
        fireEvent.click(cancelButton)
      });
})
