import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ParticipantAndCoStewardDetailsNew from "../../Views/ParticipantCoSteward/ParticipantAndCoStewardDetailsNew";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { MemoryRouter, Route } from "react-router-dom";

describe("Participant view detail test cases", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[
          "/datahub/participants/view/dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
        ]}
      >
        <Route path="/datahub/participants/view/:id">
          <ParticipantAndCoStewardDetailsNew />
        </Route>
      </MemoryRouter>,
      { wrapper: FarmStackProvider }
    );
  });

  describe("breadcrumb exists", () => {
    it("should render breadcrumb label", () => {
      const breadcrumLabel = screen.getAllByTestId("label-breadcrumb");
      expect(breadcrumLabel).not.toBeNull();
    });
  });
  screen.debug();

})
describe('Typography Component org', () => {
  render(<ParticipantAndCoStewardDetailsNew />, {
        wrapper: FarmStackProvider,
      });
      const orgHead = screen.getAllByTestId("org_Name")
      expect(orgHead).toBeInTheDocument()
  });
  // describe("check for logo", () => {
  //     const logoPath = '/media/organizations/logos/download_y5chEtC.png';
  //     render( <ParticipantAndCoStewardDetailsNew logoPath={logoPath}/>, { wrapper: FarmStackProvider } )
  //     const imageElement = screen.getByAltText('Logo');
  //     expect(imageElement).toBeInTheDocument();
  //     expect(imageElement).toHaveAttribute('src', logoPath);
  //     })

// describe("check for logo", () => {
//   const logoPath = "/media/organizations/logos/download_y5chEtC.png";
//   render(<ParticipantAndCoStewardDetailsNew logoPath={logoPath} />, {
//     wrapper: FarmStackProvider,
//   });
//   const imageElement = screen.getByAltText("Logo");
//   expect(imageElement).toBeInTheDocument();
//   expect(imageElement).toHaveAttribute("src", logoPath);

//   test("renders component without logo", () => {
//     render(<ParticipantAndCoStewardDetailsNew organisationName="Sample Org" />);

//     // Expect the first letter of the organisation name to be rendered
//     const firstLetterElement = screen.getByText("S");
//     expect(firstLetterElement).toBeInTheDocument();
//   });
// });
// describe("check for org name", () => {
//     const mockOrganisationName = 'Test Organization';

//     test('renders the correct organization name', () => {
//       // Render the component with the mocked data
//       const { getByText } = render(<ParticipantAndCoStewardDetailsNew organisationName={mockOrganisationName} />);
    
//       // Assert that the rendered component contains the provided organization name
//       const organisationNameElement = getByText(mockOrganisationName);
//       expect(organisationNameElement).not.toBeNull();
//     });
//     screen.debug()
// })