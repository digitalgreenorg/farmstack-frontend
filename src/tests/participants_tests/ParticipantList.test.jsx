import React from "react";
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import "@testing-library/jest-dom"
import ParticipantsAndCoStewardNew from "../../Views/ParticipantCoSteward/ParticipantAndCoStewardNew";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

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
    test("render list of costewards", () => {
    const textMatcher = screen.queryByTestId("test_id_string");
    expect(textMatcher).not.toBeNull();
  });

//check for invite btn
  test("render invite btn exists", () => {
    render(<CoStewardAndParticipantsCard />);
  
    const inviteBtn = screen.getByTestId('invite-btn');
    screen.debug()
  
      expect(inviteBtn).toBeInTheDocument();
  });

  //check add part button
  // test.only("render invite btn exists", () => {
  //   render(<CoStewardAndParticipantsCard />);
  //     const addParticipantBtn = screen.getByRole('button', { name: 'add-new-participants'});
  //     expect(addParticipantBtn).toBeInTheDocument();
  // });

  test("render add new participant button", () => {
    const addNewPartButton = screen.queryAllByTestId("title");
    expect(addNewPartButton).not.toBeNull()
  })

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
//render list of cards of participant

// test("render list of cards of participant in grid mode", () => {
//   render(<CoStewardAndParticipantsCard />);

//     const cardElements = screen.getByTestId("test-id-list"); 
//   expect(cardElements).toHaveLength(coStewardOrParticipantsList.length);

//     cardElements?.forEach((card, index) => {
//       const organizationName = screen.getByText(
//         coStewardOrParticipantsList[index]?.card.organization?.name
//       );
//       expect(organizationName).toBeInTheDocument();

//       const datasetCount = screen.getByText(
//         coStewardOrParticipantsList[index]?.card.dataset_count
//       );
//       expect(datasetCount).toBeInTheDocument();

//       const participantName = screen.getByText(
//         coStewardOrParticipantsList[index]?.card.user?.first_name
//       );
//       expect(participantName).toBeInTheDocument();
//     });
// });

//get list of costeward
// test("render list of cards of costeward in grid mode", () => {
//   render(<CoStewardAndParticipantsCard />); 

//   const cardElements = screen.getAllByRole("row"); 

//   expect(cardElements.length).toBe(coStewardOrParticipantsList.length); 

//   cardElements?.forEach((item, index) => {
//     const costewardOrganizationName = screen.getByText(
//       coStewardOrParticipantsList[index]?.item.organization?.name
//     );
//     expect(costewardOrganizationName).toBeInTheDocument();

//     const datasetCount = screen.getByText(
//       coStewardOrParticipantsList[index]?.item.dataset_count
//     );
//     expect(datasetCount).toBeInTheDocument();

//     const NoOfParticipant = screen.getByText(
//       coStewardOrParticipantsList[index]?.item.number_of_participants
//     );
//     expect(NoOfParticipant).toBeInTheDocument();
//   });
// });
//getlist of new request
// test("render list of cards of new request in grid mode", () => {
//   render(<CoStewardAndParticipantsCard />);

//   const cardElements = screen.getAllByTestId("test-id-list");
//   expect(cardElements.length).toBeGreaterThan(0);

//   cardElements?.forEach((card, index) => {
//     const requestOrgName = screen.getByText(
//       coStewardOrParticipantsList[index]?.card.organization?.name
//     );
//     expect(requestOrgName).toBeInTheDocument();

//     const userName = screen.getByText(
//       coStewardOrParticipantsList[index]?.card.user?.first_name
//     );
//     expect(userName).toBeInTheDocument();

//     const userEmail = screen.getByText(
//       coStewardOrParticipantsList[index]?.card.user?.email
//     );
//     expect(userEmail).toBeInTheDocument();
//   });
// });


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
describe('render the costeward', () => {
  it('renders the correct columns for the "Co-steward" title', () => {
    const title = 'Co-steward';
    const isCosteward = true;

    const coStewardOrParticipantsList = [
      {
        user_id: 'user1',
        organization: { name: 'Org1' },
        dataset_count: 2,
        number_of_participants: 3,
      },
      // Add more test data as needed
    ];

    render(<coStewardOrParticipantsList coStewardOrParticipantsList={coStewardOrParticipantsList} title={title} isCosteward={isCosteward} />);

    const rows = screen.findByRole('row');
    rows.forEach((row, index) => {
      const cols = row.querySelectorAll('Col');
      if (title === 'Co-steward' || isCosteward) {
        expect(cols.length).toBe(3);
        expect(cols[0].textContent).toBe(coStewardOrParticipantsList[index].organization.name);
        expect(cols[1].textContent).toBe(String(coStewardOrParticipantsList[index].dataset_count));
        expect(cols[2].textContent).toBe(String(coStewardOrParticipantsList[index].number_of_participants));
      } else {
        // Add assertions for other title cases as needed
      }
    });
  });
});
