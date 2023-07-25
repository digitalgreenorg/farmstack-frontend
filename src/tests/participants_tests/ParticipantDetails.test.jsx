import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ParticipantAndCoStewardDetailsNew from "../../Views/ParticipantCoSteward/ParticipantAndCoStewardDetailsNew";
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
  afterEach(() => cleanup());
  test("should render participant details correctly", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    expect(screen.getByText("Organisation Name")).toBeInTheDocument();

    expect(screen.getByText("Website Link")).toBeInTheDocument();

    expect(screen.getByText("Country")).toBeInTheDocument();

    expect(screen.getByText("Address")).toBeInTheDocument();

    expect(screen.getByText("First Name")).toBeInTheDocument();

    expect(screen.getByText("Contact Number")).toBeInTheDocument();

    expect(screen.getByText("Last Name")).toBeInTheDocument();

    expect(screen.getByText("Participant details")).toBeInTheDocument();
  });
  test("onclick of breadcrumb button", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const breadcrubmButton = screen.getByTestId("route-breadcrubm-button");
    fireEvent.click(breadcrubmButton);
  });
  test("onclick of view dataset button", () => {
    // const data = [
    //   {
    //     created_at: "2023-06-20T04:48:23.719871Z",
    //     category: {
    //       "Periculture": [
    //           "asdf"
    //       ],
    //       "sericulture": [
    //           "add"
    //       ],
    //       "Horticulture": [
    //           "GDHFDHGDFHGF"
    //       ],
    //       "subsistence and commercial": [
    //           "dddd"
    //       ]
    //   },
    //   name: "paddy dataset",
    //   name: "SHRU. orggggg",
    //   category:"",
    //   city:"",
    //   updated_at:""

    //   },
    //   {
    //     id: 2,
    //     name: "sample org",
    //     dataset_count: 4,
    //     number_of_participants: 20,
    //   },
    // ];
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const breadcrubmButton = screen.getByTestId("view-dataset-detail");
    fireEvent.click(breadcrubmButton);
  });
  test("onclick of buttons", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    // const deletePopper = screen.getByTestId("delete-popper-test");
    // fireEvent.click(deletePopper)

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
  });
  test("onclick of reject, approve, back", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew isParticipantRequest={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const backButton = screen.getByTestId("back-button-test");
    fireEvent.click(backButton);
  //   const approveButton = screen.getByTestId("approve-button-test");
  //   fireEvent.click(approveButton);
  // });

  //   const rejectButton = screen.getByTestId("reject-button-test");
  //   fireEvent.click(rejectButton);
    })

  test("onclick of back button with no request", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const backButton = screen.getByTestId("back-con-button");
    fireEvent.click(backButton);
  });
  test("render view details failed", () => {
    server.use(
      rest.get(
        `${UrlConstant.base_url}${UrlConstant.participant}:id/`,
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("render view details failed when onboarded_by", () => {
    server.use(
      rest.get(
        UrlConstant.base_url + UrlConstant.participant + "?on_boarded_by=" + ":id",
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  test("render view details failed when delete", () => {
    server.use(
      rest.delete(
        UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
});
test("render view details failed when delete", () => {
  server.use(
    rest.post(
      UrlConstant.base_url + UrlConstant.costeward_onboarded_dataset,
      (req, res, ctx) => {
        return res(ctx.status(400), ctx.json());
      }
    )
  );
  render(
    <Router>
      <ParticipantAndCoStewardDetailsNew />
    </Router>,
    {
      wrapper: FarmStackProvider,
    }
  );
});
test("render loadmore button failed", () => {
  server.use(
    rest.post(
      "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/?page=2",
      (req, res, ctx) => {
        return res(ctx.status(400), ctx.json());
      }
    )
  );
  render(
    <Router>
      <ParticipantAndCoStewardDetailsNew />
    </Router>,
    {
      wrapper: FarmStackProvider,
    }
  );
});

describe("render ParticipantAndCoSteward", () => {
  test("render all values", async () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const name = await screen.findByText("ekta");
     expect(name).toBeInTheDocument()
    const website = await screen.findByText("https://www.google.com");
    expect(website).toBeInTheDocument()
    const lastName = await screen.findByText("part");
    expect(lastName).toBeInTheDocument()
    const contact = await screen.findByText("+91 96114-57777");
    expect(contact).toBeInTheDocument()
    const address = await screen.findByText("patna");
    expect(address).toBeInTheDocument()
    const country = await screen.findByText("India") 
    expect(country).toBeInTheDocument()
    const orgName = await screen.findByText("ekta dummy")
    expect(orgName).toBeInTheDocument()
  });
});
