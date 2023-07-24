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
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";


describe("Participant view detail test cases", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[
          "/datahub/participants/view/dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
        ]}
      >
        <Router path="/datahub/participants/view/:id">
          <ParticipantAndCoStewardDetailsNew />
        </Router>
      </MemoryRouter>,
      { wrapper: FarmStackProvider }
    );
  });

  it("should render participant details correctly", () => {
    expect(screen.getByText("Organisation Name")).toBeInTheDocument();

    expect(screen.getByText("Website Link")).toBeInTheDocument();

    expect(screen.getByText("Country")).toBeInTheDocument();

    expect(screen.getByText("Address")).toBeInTheDocument();

    expect(screen.getByText("First Name")).toBeInTheDocument();

    expect(screen.getByText("Contact Number")).toBeInTheDocument();

    expect(screen.getByText("Last Name")).toBeInTheDocument();

    expect(screen.getByText("Participant details")).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
  });

  // it('should render participant details correctly with values', () => {
  //   render(
  //     <Router>
  //       <ParticipantAndCoStewardDetailsNew  />
  //     </Router>,
  //     {
  //       wrapper: FarmStackProvider,
  //     }
  //   );
  //   const OrgName = screen.getByTestId("org_Name");
  //   expect(OrgName).toBeInTheDocument();
  //   fireEvent.change(imageElement, { target: {value  : "" }})
  // //  const imageElement = screen.getByAltText("Logo");
  // //  expect(imageElement).toBeInTheDocument();
  // //  fireEvent.change(imageElement, { target: {value  : "" }})
  // //   expect(imageElement).toHaveAttribute("src", logoPath);
  // });

});
// describe("Participant view detail test cases", () => {
//   beforeEach(() => {
//     render(
//       <MemoryRouter
//         initialEntries={[
//           "/datahub/participants/view/dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
//         ]}
//       >
//         <Router path="/datahub/participants/view/:id">
//           <ParticipantAndCoStewardDetailsNew />
//         </Router>
//       </MemoryRouter>,
//       { wrapper: FarmStackProvider }
//     );
//     describe('ParticipantDetails Component with values', () => {
//       it('should render participant details correctly', async () => {
//         render(
//           <Router>
//             <ParticipantAndCoStewardDetailsNew />
//           </Router>,
//           {
//             wrapper: FarmStackProvider,
//           }
//         );
//         await screen.findByText('Organisation Name');
    
//         expect(screen.getByText('RandomOrgName')).toBeInTheDocument();
//       });
//     });
//   });
// });

// describe('ParticipantDetails Component with values', () => {
//   it('should render participant details correctly', async () => {
//     // Render the component
//     render(
//       <Router>
//         <ParticipantAndCoStewardDetailsNew />
//       </Router>,
//       {
//         wrapper: FarmStackProvider,
//       }
//     );

//     // Wait for the GET request to be mocked and resolved
//     // In this case, the useEffect in ParticipantAndCoStewardDetailsNew will trigger the GET request.
//     // Since the test is now async, we need to wait for the request to complete.
//     await screen.findByText('Organisation Name');

//     // Assert the presence of the randomly generated organisationName
//     expect(screen.getByText('RandomOrgName')).toBeInTheDocument();

//     // The rest of your test code...
//   });

//   // Other test cases...
// });
//   //   const mockHistory = { push: jest.fn() };

//   // // Mock the props for the component
//   // const mockProps = {
//   //   isParticipantRequest: false,
//   //   userTypeCosteward: false,
//   //   user: 'some_user',
//   //   isCostewardsParticipant: false,
//   //   history: mockHistory,
//   //   organisationName: 'Test Organization',
//   //   id: 'test_id',
//   // };

//   // test('renders Delete and Edit buttons when conditions are met', () => {
//   //   const { getByText } = render(<ParticipantAndCoStewardDetailsNew  {...mockProps} />, { wrapper: FarmStackProvider });

//   //   // Check if both Delete and Edit buttons are rendered
//   //   expect(getByText(/Delete Co-steward/i)).toBeInTheDocument();
//   //   expect(getByText(/Edit Co-steward/i)).toBeInTheDocument();
//   // });

//   // test('does not render Delete and Edit buttons when conditions are not met', () => {
//   //   const { queryByText } = render(
//   //     <ParticipantAndCoStewardDetailsNew {...mockProps} isParticipantRequest={true} />, { wrapper: FarmStackProvider }
//   //   );

//   //   // Check if both Delete and Edit buttons are not rendered
//   //   expect(queryByText(/Delete Co-steward/i)).toBeNull();
//   //   expect(queryByText(/Edit Co-steward/i)).toBeNull();
//   // });

//   // test('calls handleDeletePopper when Delete button is clicked', () => {
//   //   const { getByText } = render(<ParticipantAndCoStewardDetailsNew {...mockProps} />, { wrapper: FarmStackProvider });
//   //   const deleteButton = getByText(/Delete Co-steward/i);

//   //   // Simulate a click on the Delete button
//   //   fireEvent.click(deleteButton);

//   //   // Check if handleDeletePopper is called
//   //   expect(mockProps.handleDeletePopper).toHaveBeenCalled();
//   // });

//   // test('calls history.push with the correct path when Edit button is clicked', () => {
//   //   const { getByText } = render(<ParticipantAndCoStewardDetailsNew {...mockProps} isCosteward={true} />, { wrapper: FarmStackProvider });
//   //   const editButton = getByText(/Edit Co-steward/i);

//   //   // Simulate a click on the Edit button
//   //   fireEvent.click(editButton);

//   //   // Check if history.push is called with the correct path
//   //   expect(mockHistory.push).toHaveBeenCalledWith('/datahub/costeward/edit/test_id');
//   // });

//   // })

//   // describe("check for logo", () => {
//   //     const logoPath = '/media/organizations/logos/download_y5chEtC.png';
//   //     render( <ParticipantAndCoStewardDetailsNew logoPath={logoPath}/>, { wrapper: FarmStackProvider } )
//   //     const imageElement = screen.getByAltText('Logo');
//   //     expect(imageElement).toBeInTheDocument();
//   //     expect(imageElement).toHaveAttribute('src', logoPath);
//   //     })

//   // describe("check for logo", () => {
//   //   const logoPath = "/media/organizations/logos/download_y5chEtC.png";
//   //   render(<ParticipantAndCoStewardDetailsNew logoPath={logoPath} />, {
//   //     wrapper: FarmStackProvider,
//   //   });
//   //   const imageElement = screen.getByAltText("Logo");
//   //   expect(imageElement).toBeInTheDocument();
//   //   expect(imageElement).toHaveAttribute("src", logoPath);

//   //   test("renders component without logo", () => {
//   //     render(<ParticipantAndCoStewardDetailsNew organisationName="Sample Org" />);

//   //     // Expect the first letter of the organisation name to be rendered
//   //     const firstLetterElement = screen.getByText("S");
//   //     expect(firstLetterElement).toBeInTheDocument();
//   //   });
//   // });
//   // describe("check for org name", () => {
//   //     const mockOrganisationName = 'Test Organization';

//   //     test('renders the correct organization name', () => {
//   //       // Render the component with the mocked data
//   //       const { getByText } = render(<ParticipantAndCoStewardDetailsNew organisationName={mockOrganisationName} />);

//   //       // Assert that the rendered component contains the provided organization name
//   //       const organisationNameElement = getByText(mockOrganisationName);
//   //       expect(organisationNameElement).not.toBeNull();
//   //     });
//   //     screen.debug()
// });
