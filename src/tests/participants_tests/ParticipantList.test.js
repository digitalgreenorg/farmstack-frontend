import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom"
import ParticipantsAndCoStewardNew from "../../Views/ParticipantCoSteward/ParticipantAndCoStewardNew";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";


describe('', () => {
  beforeEach(() =>
    render(
      <FarmStackProvider>
        <ParticipantsAndCoStewardNew />
      </FarmStackProvider>
    )
  );
    test("render list of costewards", () => {
    const textMatcher = screen.queryByTestId("test_id_string");
    expect(textMatcher).not.toBeNull();
  });

//render list of cards
test("render list of cards", () => {
  render(<CoStewardAndParticipantsCard />); 

  const cardElements = screen.getAllByRole("row"); 

  expect(cardElements.length).toBe(coStewardOrParticipantsList.length); 

  cardElements?.forEach((card, index) => {
    const organizationName = screen.getByText(
      coStewardOrParticipantsList[index]?.organization?.name
    );
    expect(organizationName).toBeInTheDocument();

    const datasetCount = screen.getByText(
      coStewardOrParticipantsList[index]?.dataset_count
    );
    expect(datasetCount).toBeInTheDocument();

    const participantName = screen.getByText(
      coStewardOrParticipantsList[index]?.user?.first_name
    );
    expect(participantName).toBeInTheDocument();
  });
});
  //loadmore button
test("clicking Load more button calls handleLoadMoreButton function", async () => {
  const handleLoadMoreButton = jest.fn();
  render(<CoStewardAndParticipantsCard handleLoadMoreButton={handleLoadMoreButton} />);

  await screen.findByTestId("load-more-btn"); // Wait for the element to be available

  fireEvent.click(screen.getByTestId("load-more-btn"));

  expect(handleLoadMoreButton).toHaveBeenCalled();
});

});

