import "./matchMedia.mock";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GuestUserLegalNew from "../../Views/GuestUser/GuestUserLegalNew";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("legal policy component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("policy tab title check", () => {
    render(
      <Router>
        <GuestUserLegalNew />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    // let policyTitle = screen.getByText("Legal Policies");
    // expect(policyTitle).toBeInTheDocument;
  });

  //   test("Click to download policy file", () => {
  //     render(
  //       <Router>
  //         <GuestUserLegalNew />
  //       </Router>,
  //       { wrapper: FarmStackProvider }
  //     );
  //     let downlaodPolicyButton = screen.getByTestId(
  //       "legal-policy-download-document-test"
  //     );
  //     const mockSaveAs = jest.fn();
  //     FileSaver.saveAs = mockSaveAs;
  //     fireEvent.click(downlaodPolicyButton);
  //     expect(mockSaveAs).toHaveBeenCalledTimes(1);
  //     // it will download a file
  //   });
  // test("Click to view policy file", () => {
  //   render(
  //     <Router>
  //       <GuestUserLegalNew />
  //     </Router>,
  //     { wrapper: FarmStackProvider }
  //   );
  //   let viewPolicyButton = screen.getByTestId(
  //     "legal-policy-view-document-test"
  //   );
  //   // It should open a new tab on click of viewPolicyButton
  //   const mockWindowOpen = jest.fn();
  //   window.open = mockWindowOpen;

  //   // Simulate the click event
  //   fireEvent.click(viewPolicyButton);

  //   // Assert that window.open method is called with the expected URL and target (_blank)
  //   expect(mockWindowOpen).toHaveBeenCalledTimes(1);
  // });
});
