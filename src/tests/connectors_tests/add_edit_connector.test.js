import React from "react";
import { server } from "../../mocks/server";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
  findByTestId,
  getByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import {
  isLoggedInUserParticipant,
  setRoleLocal,
  setUserId,
  setUserMapId,
} from "../../Utils/Common";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { BrowserRouter as Router } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import AddConnector from "../../Views/Connector_New/AddConnector";

global.URL.createObjectURL = jest.fn(() => "mocked-object-url");
global.URL.revokeObjectURL = jest.fn();

describe("Listing part of the connectors", () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    // cleanup();
  });

  //DATAHUB ADMIN SIDE test cases
  test("Component rendered successfully and checking for the labels", async () => {
    //adding a new connector isEditModeOn={false} connectorIdForView={false}
    setUserId("0f76cb90-2394-499b-9b60-bf4cad3751a4");
    render(
      <Router>
        <AddConnector />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );

    const statusOfConnector = screen.getByTestId(
      /label-for-state-of-connector/i
    );
    expect(statusOfConnector).toHaveTextContent("New connector");

    //asserting the option to be available in the organisation list select option
    const orgListSelectInput =
      screen.getByPlaceholderText(/select organisation/i);
    expect(orgListSelectInput).toBeInTheDocument();

    fireEvent.change(orgListSelectInput, {
      target: { value: "5c6d28fb-8603-417c-95db-ecf2e85f4f07" },
    });
    screen.debug(orgListSelectInput);
    console.log(
      "🚀 ~ file: add_edit_connector.test.js:63 ~ test ~ orgListSelectInput:",
      orgListSelectInput.value
    );

    // screen.debug(orgListSelectInput);
    // const option1 = await screen.findAllByTestId(
    //   /connectors-select-orgnisation-id-option/i
    // );
    // expect(option1).toBeInTheDocument();
  });
  //   test("Component rendered successfully and checking for the labels", async () => {
  //     //adding a new connector isEditModeOn={false} connectorIdForView={false}
  //     setUserId("0f76cb90-2394-499b-9b60-bf4cad3751a4");
  //     render(
  //       <Router>
  //         <AddConnector />
  //       </Router>,
  //       {
  //         wrapper: FarmStackProvider,
  //       }
  //     );

  //     const statusOfConnector = screen.getByTestId(
  //       /label-for-state-of-connector/i
  //     );
  //     expect(statusOfConnector).toHaveTextContent("New connector");
  //   });
});
