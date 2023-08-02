import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import DataSets from "../../Components/Datasets_New/DataSets";
import { server } from "../../mocks/server";
import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";
import { setTokenLocal, setUserId, setUserMapId } from "../../Utils/Common";
import DatasetRequestTable from "../../Components/Datasets_New/DatasetRequestTable/DatasetRequestTable";

describe("Dataset request", () => {
  beforeAll(() => cleanup());
  afterAll(() => cleanup());
  setUserMapId("6ceb943a-2b97-4084-b467-a613a063a477");

  test("Render dataset request component without error", async () => {
    render(
      <Router>
        <DatasetRequestTable />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    let toggleButton = await screen.findByTestId(
      "dataset-requests-receive-and-sent-toggle-test"
    );
    screen.debug(toggleButton);
    expect(toggleButton).toBeInTheDocument();
  });

  test("All received request", async () => {
    render(
      <Router>
        <DatasetRequestTable />
      </Router>,
      { wrapper: FarmStackProvider }
    );

    const actionButtonInReceivedRequest = await screen.findByTestId(
      "dataset-request-recevied-approve-btn2-test"
    );
    // Check if action is there in DOM
    expect(actionButtonInReceivedRequest).toBeInTheDocument();

    fireEvent.click(actionButtonInReceivedRequest);

    const tillDateInput = await screen.findByLabelText("Till");

    screen.debug(tillDateInput);
    fireEvent.change(tillDateInput, { target: { value: "05/10/2023" } });

    const finalApproveButton = await screen.findByTestId(
      "dataset-request-recevied-approve-btn-test"
    );
    expect(finalApproveButton).toBeEnabled();
  });
});
