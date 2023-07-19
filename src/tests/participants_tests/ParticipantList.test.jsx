import React from "react";
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import "@testing-library/jest-dom"
import ParticipantsAndCoStewardNew from "../../Views/ParticipantCoSteward/ParticipantAndCoStewardNew";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { createMemoryHistory } from 'history';

describe('render the labels and buttons', () => {
  beforeEach(() =>
    render(
      <FarmStackProvider>
        <ParticipantsAndCoStewardNew />
        <CoStewardAndParticipantsCard />
      </FarmStackProvider>
    )
  );
  //check for Costeward label
    test("render tab labels", () => {
     render(<ParticipantsAndCoStewardNew />, {wrapper: FarmStackProvider });
      const spanElement = screen.queryAllByTestId(/Participant/i);
      expect(spanElement).not.toBeNull();
  });

//check for invite btn
  test("render invite btn exists", () => {
    render(<CoStewardAndParticipantsCard />);
  
    const inviteBtn = screen.getByTestId('invite-btn');  
      expect(inviteBtn).toBeInTheDocument();
  });

  //check add part button
  test("render add part btn exists", () => {
    render(<CoStewardAndParticipantsCard />);
      const addParticipantBtn = screen.queryAllByTestId('add-new-participants');
      expect(addParticipantBtn).not.toBeNull();
  });

  //check loadmore button
  test("render loadmore button ", () => {
    const loadmoreButton = screen.queryAllByTestId("load-more-btn");
    expect(loadmoreButton).not.toBeNull()
  })

  test("render list view exist", () => {
    const viewType = screen.getAllByText(/List/i)
    expect(viewType).not.toBeNull()
  })
  test("render grid view exist", () => {
    const viewType = screen.getAllByText(/grid/i)
    expect(viewType).not.toBeNull()
  })

  describe("rendering costeward list", () => {
    it("renders the list items correctly", () => {
      const mockData = [
        {
          user_id: 1,
          organization: { name: "Organization 1" },
          dataset_count: 10,
          number_of_participants: 5,
        },
      ];
  
      const component = render(<CoStewardAndParticipantsCard coStewardOrParticipantsList={mockData} />);
      const listItems = component.queryAllByTestId("list-item");
      listItems.forEach((item, index) => {
        const organizationName = item.queryByTestId(`organization-name-${index}`);
        const datasetCount = item.queryByTestId(`dataset-count-${index}`);
        const numberOfParticipants = item.queryByTestId(`number-of-participants-${index}`);
  
        expect(organizationName.textContent).toBe(mockData[index].organization.name);
        expect(datasetCount.textContent).toBe(mockData[index].dataset_count.toString());
        expect(numberOfParticipants.textContent).toBe(
          mockData[index].number_of_participants.toString()
        );
      });
    });
  });

  describe("rendering participant list", () => {
    it("renders the list items correctly", () => {
      const mockData = [
        {
          user_id: 7,
          organization: { name: "demo org of participant 5" },
          dataset_count: 3,
          root_user: { first_name: "Kumar"},
        },
      ];
  
      const component = render(<CoStewardAndParticipantsCard coStewardOrParticipantsList={mockData} />);
      const listItems = component.queryAllByTestId("list-item");
      listItems.forEach((item, index) => {
        const partOrganizationName = item.queryByTestId(`part-organization-name-${index}`);
        const datasetCount = item.queryByTestId(`part-dataset-count-${index}`);
        const rootUser = item.queryByTestId(`root-user-${index}`);
  
        expect(partOrganizationName.textContent).toBe(mockData[index].organization.name);
        expect(datasetCount.textContent).toBe(mockData[index].dataset_count.toString());
        expect(rootUser.textContent).toBe(
          mockData[index].user_id.first_name
        );
      });
    });
  });

  describe("rendering new participant request list", () => {
    it("renders the list items correctly", () => {
      const mockData = [
        {
          user_id: 10,
          organization: { name: "DG ORG" },
          user: {first_name: "Kumar"},
          user: {email : "kumar@dg.org"},
        },
      ];
  
      const component = render(<CoStewardAndParticipantsCard coStewardOrParticipantsList={mockData} />);
      const listItems = component.queryAllByTestId("list-item");
      listItems.forEach((item, index) => {
        const requestUserOrganizationName = item.queryByTestId(`part-organization-name-${index}`);
        const requestUserName = item.queryByTestId(`part-dataset-count-${index}`);
        const requestUserEmail = item.queryByTestId(`root-user-${index}`);
  
        expect(requestUserOrganizationName.textContent).toBe(mockData[index].organization.name);
        expect(requestUserName.textContent).toBe(mockData[index].user.first_name);
        expect(requestUserEmail.textContent).toBe(
          mockData[index].user_id.email
        );
      });
    });
  });

  describe('invite button routing correctly', () => {
    test('onClick event should navigate to "/datahub/participants/invite"', () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(<CoStewardAndParticipantsCard history={history} />);
      const button = getByTestId('invite-btn');
      fireEvent.click(button);
      expect(history.location.pathname).toBe('/datahub/participants/invite');
    });
  
  });

// test("clicking the invite participants button navigates to the invite page", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <CoStewardAndParticipantsCard />
//     </Router>
//   );

//   const inviteButton = screen.getByRole('button', { name:"+ Invite Participants"})

//   fireEvent.click(inviteButton);
//   screen.debug()

//   expect(history.push).toBe("/datahub/participants/invite");
// });
});

//   //loadmore button
// test("clicking Load more button calls handleLoadMoreButton function", async () => {
//   const handleLoadMoreButton = jest.fn();
//   render(<CoStewardAndParticipantsCard handleLoadMoreButton={handleLoadMoreButton} />);

//   await screen.findByTestId("load-more-btn"); // Wait for the element to be available

//   fireEvent.click(screen.getByTestId("load-more-btn"));

//   expect(handleLoadMoreButton).toHaveBeenCalled();
// });

// test("render title of costeward tab", () => {
//     render(<ParticipantsAndCoStewardNew />)
//     const linkElement = screen.getByText('Co-steward')
//     expect(linkElement).toBeInTheDocument()
//     // screen.debug()
//     expect(getAllByText('Co-steward')).toBeInTheDocument()

//     // const sum=1+2;
//     // expect(sum).toEqual(3)
// })
// describe('',()=>{
  // test("render title of costeward tab", () => {
  //   // render(<ParticipantsAndCoStewardNew />);
  //   const { getByText } = render(<ParticipantsAndCoStewardNew />);

  // // Find the load more button and simulate a click event
  // const loadMoreButton = getByText("Load More");
  // fireEvent.click(loadMoreButton);

  // });
  
//   // test("clicking Load more button calls handleLoadMoreButton function", () => {
//   //   render(<CoStewardAndParticipantsCard />);
//   //   const handleLoadMoreButton = jest.fn();
//   //   fireEvent.click(screen.getByRole("button", { name: /Load more/i }));
//   //   expect(handleLoadMoreButton).toHaveBeenCalled();
//   // });

// })
// describe('render the costeward', () => {
//   it('renders the correct columns for the "Co-steward" title', () => {
//     const title = 'Co-steward';
//     const isCosteward = true;

//     const coStewardOrParticipantsList = [
//       {
//         user_id: 'user1',
//         organization: { name: 'Org1' },
//         dataset_count: 2,
//         number_of_participants: 3,
//       },
//       // Add more test data as needed
//     ];

//     render(<coStewardOrParticipantsList coStewardOrParticipantsList={coStewardOrParticipantsList} title={title} isCosteward={isCosteward} />);

//     const rows = screen.findByRole('row');
//     rows.forEach((row, index) => {
//       const cols = row.querySelectorAll('Col');
//       if (title === 'Co-steward' || isCosteward) {
//         expect(cols.length).toBe(3);
//         expect(cols[0].textContent).toBe(coStewardOrParticipantsList[index].organization.name);
//         expect(cols[1].textContent).toBe(String(coStewardOrParticipantsList[index].dataset_count));
//         expect(cols[2].textContent).toBe(String(coStewardOrParticipantsList[index].number_of_participants));
//       } else {
//         // Add assertions for other title cases as needed
//       }
//     });
//   });
// });
