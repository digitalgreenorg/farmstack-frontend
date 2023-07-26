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
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";

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
  test("onclick of breadcrumb", () => {
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

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
  });
  test("onclick of delete popper", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew
        />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const deletePopper = screen.getByTestId("delete-popper-test");
    screen.debug()
    fireEvent.click(deletePopper);
  });
  test("onclick of back", () => {
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
  });
  test("onclick of approveButton", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew isParticipantRequest={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const approveButton = screen.getByTestId("approve-button-test");
    fireEvent.click(approveButton);
  });
  test("onclick of rejectButton", () => {
    render(
      <Router>
        <ParticipantAndCoStewardDetailsNew isParticipantRequest={true} />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const rejectButton = screen.getByTestId("reject-button-test");
    fireEvent.click(rejectButton);
  });
  // test("onclick of loadmore", () => {
  //   render(
  //     <Router>
  //       <ParticipantAndCoStewardDetailsNew
  //       datasetLoadMoreUrl={true} />
  //     </Router>,
  //     {
  //       wrapper: FarmStackProvider,
  //     }
  //   );
  //   const loadMoreButton = screen.getByTestId("load-more-button-test");
  //   fireEvent.click(loadMoreButton);
  // });
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
        UrlConstant.base_url +
          UrlConstant.participant +
          "?on_boarded_by=" +
          ":id",
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
test("render Approve button failed", () => {
  server.use(
    rest.put(
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
    expect(name).toBeInTheDocument();
    const website = await screen.findByText("https://www.google.com");
    expect(website).toBeInTheDocument();
    const lastName = await screen.findByText("part");
    expect(lastName).toBeInTheDocument();
    const contact = await screen.findByText("+91 96114-57777");
    expect(contact).toBeInTheDocument();
    const address = await screen.findByText("patna");
    expect(address).toBeInTheDocument();
    const country = await screen.findByText("India");
    expect(country).toBeInTheDocument();
    const orgName = await screen.findByText("ekta dummy");
    expect(orgName).toBeInTheDocument();
  });
});
