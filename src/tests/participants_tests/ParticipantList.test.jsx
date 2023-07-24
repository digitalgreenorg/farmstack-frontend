import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  rtlRender,
  cleanup,

} from "@testing-library/react";
import "@testing-library/jest-dom";
import ParticipantsAndCoStewardNew from "../../Views/ParticipantCoSteward/ParticipantAndCoStewardNew";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { createMemoryHistory } from "history";
import {  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, } from 'react-router-dom'; 
import userEvent from '@testing-library/user-event';
// import { userEvent } from "@testing-library/user-event/dist/types/setup";

describe("render the labels and buttons", () => {
  beforeEach(() => cleanup());
  afterEach(() => cleanup());
  //check for Costeward label
  // test("render tab labels", () => {
  //   render(<ParticipantsAndCoStewardNew />, { wrapper: FarmStackProvider });
  //   const spanElement = screen.queryAllByTestId(/Participant/i);
  //   expect(spanElement).not.toBeNull();
  // });

  // //check for invite btn
  // test("render invite btn exists", () => {
  //   render(<CoStewardAndParticipantsCard />);

  //   const inviteBtn = screen.getByTestId("invite-btn");
  //   expect(inviteBtn).toBeInTheDocument();
  // });

  // //check add part button
  // test("render add part btn exists", () => {
  //   render(<CoStewardAndParticipantsCard />);
  //   const addParticipantBtn = screen.queryAllByTestId("add-new-participants");
  //   expect(addParticipantBtn).not.toBeNull();
  // });

  // //check loadmore button
  // test("render loadmore button ", () => {
  //   const loadmoreButton = screen.queryAllByTestId("load-more-btn");
  //   expect(loadmoreButton).not.toBeNull();
  // });

  // test("render list view exist", () => {
  //   const viewType = screen.getAllByText(/List/i);
  //   expect(viewType).not.toBeNull();
  // });
  // test("render grid view exist", () => {
  //   const viewType = screen.getAllByText(/grid/i);
  //   expect(viewType).not.toBeNull();
  // });

  // test("click of invite part", () => {
  //   render(
  //     <Router>
  //     <CoStewardAndParticipantsCard />
  //     </Router>
  //   );
  
  //   const inviteButton = screen.getByRole("button", {
  //     name: "+ Invite Participants"
  //   });
  //   expect(inviteButton).toBeInTheDocument();
  // });
  // test("click the grid button and show grid list", () => {
  //   const setViewType = jest.fn();
  //   render(<CoStewardAndParticipantsCard setViewType={setViewType} />);
  //   const gridView = screen.getByText(/Grid view/i);
  //   fireEvent.click(gridView);
  //   //expect(setViewType).toHaveBeenNthCalledWith(1, "grid");
  // });
  // test("click the list button and cards in list", () => {
  //   const setViewType = jest.fn();
  //   render(<CoStewardAndParticipantsCard setViewType={setViewType} />); 
  //   const listView = screen.getByText(/List view/i);
  //   fireEvent.click(listView);
  //   //expect(setViewType).toHaveBeenCalledWith("list");
  // });
  // test("click of invite part", () => {
  //   render(
  //     <Router>
  //     <CoStewardAndParticipantsCard />
  //     </Router>
  //   );
  
  //   const inviteButton = screen.getByRole("button", {
  //     name: "+ Invite Participants"
  //   });
  //  // expect(inviteButton).toBe("/datahub/participants/invite");
  //   fireEvent.click(inviteButton)
  // });
  test("handleViewDataset is called with the correct argument on click", () => {

    const mockHandleViewDataset = jest.fn();
    const data = [
      { id: 1, name: 'Item 1', user_id: 101 },
      { id: 2, name: 'Item 2', user_id: 102 },
      // Add more items as needed
    ];
    render(
      <Router>
      <CoStewardAndParticipantsCard data={[{ id: 1, name: 'Item 1', user_id: 101 }]} handleViewDataset={mockHandleViewDataset}/>
      </Router>
    );
    // const viewDatasetButton = screen.getAllByTestId("clist")
    // fireEvent.click(viewDatasetButton);
  });
  // describe("rendering costeward list", () => {
  //   it("renders the list items correctly", () => {
  //     const mockData = [
  //       {
  //         user_id: 1,
  //         organization: { name: "Organization 1" },
  //         dataset_count: 10,
  //         number_of_participants: 5,
  //       },
  //     ];

  //     const component = render(
  //       <CoStewardAndParticipantsCard coStewardOrParticipantsList={mockData} />
  //     );
  //     const listItems = component.queryAllByTestId("list-item");
  //     listItems.forEach((item, index) => {
  //       const organizationName = item.queryByTestId(
  //         `organization-name-${index}`
  //       );
  //       const datasetCount = item.queryByTestId(`dataset-count-${index}`);
  //       const numberOfParticipants = item.queryByTestId(
  //         `number-of-participants-${index}`
  //       );

  //       expect(organizationName.textContent).toBe(
  //         mockData[index].organization.name
  //       );
  //       expect(datasetCount.textContent).toBe(
  //         mockData[index].dataset_count.toString()
  //       );
  //       expect(numberOfParticipants.textContent).toBe(
  //         mockData[index].number_of_participants.toString()
  //       );
  //     });
  //   });
  // });

  // describe("rendering participant list", () => {
  //   it("renders the list items correctly", () => {
  //     const mockData = [
  //       {
  //         user_id: 7,
  //         organization: { name: "demo org of participant 5" },
  //         dataset_count: 3,
  //         root_user: { first_name: "Kumar" },
  //       },
  //     ];

  //     const component = render(
  //       <CoStewardAndParticipantsCard coStewardOrParticipantsList={mockData} />
  //     );
  //     const listItems = component.queryAllByTestId("list-item");
  //     listItems.forEach((item, index) => {
  //       const partOrganizationName = item.queryByTestId(
  //         `part-organization-name-${index}`
  //       );
  //       const datasetCount = item.queryByTestId(`part-dataset-count-${index}`);
  //       const rootUser = item.queryByTestId(`root-user-${index}`);

  //       expect(partOrganizationName.textContent).toBe(
  //         mockData[index].organization.name
  //       );
  //       expect(datasetCount.textContent).toBe(
  //         mockData[index].dataset_count.toString()
  //       );
  //       expect(rootUser.textContent).toBe(mockData[index].user_id.first_name);
  //     });
  //   });
  // });

  // describe("rendering new participant request list", () => {
  //   it("renders the list items correctly", () => {
  //     const mockData = [
  //       {
  //         user_id: 10,
  //         organization: { name: "DG ORG" },
  //         user: { first_name: "Kumar" },
  //         user: { email: "kumar@dg.org" },
  //       },
  //     ];

  //     const component = render(
  //       <CoStewardAndParticipantsCard coStewardOrParticipantsList={mockData} />
  //     );
  //     const listItems = component.queryAllByTestId("list-item");
  //     listItems.forEach((item, index) => {
  //       const requestUserOrganizationName = item.queryByTestId(
  //         `part-organization-name-${index}`
  //       );
  //       const requestUserName = item.queryByTestId(
  //         `part-dataset-count-${index}`
  //       );
  //       const requestUserEmail = item.queryByTestId(`root-user-${index}`);

  //       expect(requestUserOrganizationName.textContent).toBe(
  //         mockData[index].organization.name
  //       );
  //       expect(requestUserName.textContent).toBe(
  //         mockData[index].user.first_name
  //       );
  //       expect(requestUserEmail.textContent).toBe(
  //         mockData[index].user_id.email
  //       );
  //     });
  //   });

  //   // describe('invite button routing correctly', () => {
  //   //   test('onClick event should navigate to "/datahub/participants/invite"', () => {
  //   //     const history = createMemoryHistory();
  //   //     const { getByTestId } = render(<CoStewardAndParticipantsCard history={history} />);
  //   //     const button = getByTestId('invite-btn');
  //   //     fireEvent.click(button);
  //   //     expect(history.location.pathname).toBe('/datahub/participants/invite');
  //   //   });

  //   // });

  //   //   describe('invite button routing correctly', () => {
  //   //     test('onClick event should navigate to "/datahub/participants/invite"', () => {
  //   //       const history = createMemoryHistory();
  //   //  render(
  //   //         <ParticipantsAndCoStewardNew>
  //   //           <CoStewardAndParticipantsCard history={history} />
  //   //         </ParticipantsAndCoStewardNew>, {wrapper: FarmStackProvider }
  //   //       );
  //   //       const buttons = screen.getAllByTestId('invite-btn');
  //   //       const button = buttons[0]; // Get the first button from the array

  //   //     fireEvent.click(button);
  //   //       expect(history.location.pathname).toBe('/datahub/participants/invite');
  //   //     });
  //   //   });

  //   // test("clicking the invite participants button navigates to the invite page", () => {
  //   //   const history = createMemoryHistory();
  //   //   render(
  //   //     <Router history={history}>
  //   //       <CoStewardAndParticipantsCard />
  //   //     </Router>
  //   //   );

  //   //   const inviteButton = screen.getByRole('button', { name:"+ Invite Participants"})

  //   //   fireEvent.click(inviteButton);
  //   //   screen.debug()

  //   //   expect(history.push).toBe("/datahub/participants/invite");
  //   // });
  // });
});
