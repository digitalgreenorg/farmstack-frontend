import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import GuestUserContactNew from "../../Views/GuestUser/GuestUserContactNew";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { BrowserRouter as Router } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("render all values", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  // jest.mock(`${UrlConstant.base_url}${UrlConstant.microsite_contact_form}`, () => ({
  //   addNewGuestUserData: jest.fn(),
  // }));
  afterEach(() => cleanup());
  test("render contact form correctly", () => {
    render(
      <Router>
        <GuestUserContactNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("should render contact us field labels correctly", async() => {
    render(
      <Router>
        <GuestUserContactNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const firstName = screen.getByPlaceholderText("Enter your first name");
    fireEvent.change(firstName, { target: { value: "shruthi" } });

    const lastName = screen.getByPlaceholderText("Enter your last name");
    fireEvent.change(lastName, { target: { value: "monika" } });

    const mailId = screen.getByPlaceholderText("Enter your email address");
    fireEvent.change(mailId, { target: { value: "test@gmail.com" } });

    const contactNumber = screen.getByPlaceholderText("Contact Number");
    fireEvent.change(contactNumber, { target: { value: "9344957735" } });
    // const contactNumberErrorMessage = screen.queryByText('Invalid phone number');
    // expect(contactNumberErrorMessage).toBeNull();

    const query = screen.getByPlaceholderText("Describe your query");
    fireEvent.change(query, {
      target: {
        value: "    how to become a participant under particular costeward    ",
      },
    });
    fireEvent.blur(query);

    const becomeParticipantRadio = screen.getByLabelText(
      "Become a Participant (Data Provider / Consumer)"
    );
    fireEvent.click(becomeParticipantRadio);

    const otherQueriesRadio = screen.getByLabelText(
      "Other queries (Describe your query in detail)"
    );
    fireEvent.click(otherQueriesRadio);

    const submitButton = screen.getByTestId("submit-button-test")
    fireEvent.click(submitButton);
    // expect(addNewGuestUserData).toHaveBeenCalledTimes(1);
  });
  //   test("should handle valid phone number", () => {
  //     render(
  //       <Router>
  //         <GuestUserContactNew />
  //       </Router>,
  //       {
  //         wrapper: FarmStackProvider,
  //       }
  //     );
  
  //     const phoneNumberInput = screen.getByLabelText("Contact Number");
  //     fireEvent.change(phoneNumberInput, { target: { value: "+123456789" } });
  
  //     // Assertions
  //     expect(phoneNumberInput.value).toBe("+123456789");
  //     expect(screen.queryByText("Invalid phone number")).toBeNull(); // Error message should not be displayed
  //   });

  // test("should handle invalid phone number", () => {
  //   render(
  //     <Router>
  //       <GuestUserContactNew />
  //     </Router>,
  //     {
  //       wrapper: FarmStackProvider,
  //     }
  //   );

  //   const phoneNumberInput = screen.getByLabelText("Contact Number");
  //   fireEvent.change(phoneNumberInput, { target: { value: "invalid_number" } });

  //   // Assertions
  //   expect(phoneNumberInput.value).toBe("invalid_number");
  //   expect(screen.getByText("Invalid phone number")).toBeInTheDocument(); // Error message should be displayed
  // });

test("onclick of cancel button", async () => {
  render(
    <Router>
      <GuestUserContactNew />
    </Router>,
    {
      wrapper: FarmStackProvider,
    }
  )
    const cancelButton = screen.getByTestId("cancel-button-test")
    fireEvent.click(cancelButton);

})
  test("submit button failure", async () => {
    server.use(
      rest.post(
        UrlConstant.base_url + UrlConstant.microsite_contact_form,
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({
            first_name: ["invalid name"]
          }));
        }
      )
    );
    render(
      <Router>
        <GuestUserContactNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("submit button failure", async () => {
    server.use(
      rest.get(
        UrlConstant.base_url + UrlConstant.guest_organization_details,
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <GuestUserContactNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const submitButton = screen.getByTestId('submit-button-test');
    fireEvent.click(submitButton);
  
    // // Wait for the error messages to be displayed after the API call fails
    // await screen.findByText('Invalid first name');
    // await screen.findByText('Invalid last name');
    // await screen.findByText('Invalid email');
  });

  test("get all data of  datahubadmin", async () => {
    render(
      <Router>
        <GuestUserContactNew/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const firstName = screen.getByPlaceholderText("Enter your first name");
    expect(firstName.value).toBe("asdfg");

    const lastName = screen.getByPlaceholderText("Enter your last name");
    expect(lastName.value).toBe("");

    // const orgAddress = screen.getByLabelText(/Organisation Address /i);
    // expect(orgAddress.value).toBe("patna");

    // const country = await screen.findByRole("button", {
    //   name: /Country/i,
    // });
    // // expect(country.value).toBe("India");
    // expect(country).toBeInTheDocument();

    // const pincode = screen.getByLabelText(/PIN Code/i);
    // expect(pincode.value).toBe("800001");

    // const firstName = await screen.findByRole("textbox", {
    //   name: /First Name/i,
    // });
    // expect(firstName.value).toBe("ekta");

  });

  test('should handle API call failure and set error messages', async () => {
      render(
        <Router>
        <GuestUserContactNew/>
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const submitButton = screen.getByTestId("submit-button-test")
    fireEvent.click(submitButton);
    expect('Your query is submitted! Thank you.').toBeInTheDocument();
  
    // // Verify that the error messages are set as expected
    // expect(screen.queryByText('Invalid first name')).toBeInTheDocument();
    // expect(screen.queryByText('Invalid last name')).toBeInTheDocument();
    // expect(screen.queryByText('Invalid email')).toBeInTheDocument();
    // ... Add more assertions for other error messages
  });
});
