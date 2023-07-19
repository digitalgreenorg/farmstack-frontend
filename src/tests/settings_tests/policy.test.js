import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  act,
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CompanyPolicies from "../../Components/NewOnboarding/CompanyPolicies";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { setUserId } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import { server } from "../../mocks/server";
import { rest } from "msw";

jest.mock("../../Components/Generic/FileUploader", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked FileUploaderMain</div>),
}));

describe("Settings module", () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders without crashing", () => {
    render(<CompanyPolicies />, {
      wrapper: FarmStackProvider,
    });
  });

  test("input existenece", () => {
    render(<CompanyPolicies isPolicySettings={true} isVisible={true} />, {
      wrapper: FarmStackProvider,
    });

    expect(
      screen.getByRole("textbox", {
        name: "Policy name",
      })
    ).toBeInTheDocument();

    const policyDescriptionElement = screen.getByRole("combobox", {
      name: "Block type",
    });
    expect(policyDescriptionElement).toBeInTheDocument();
    // const addButton = screen.getByText("button", {
    //   name: "Add New Policy",
    // });
  });

  test("adds a new policy on button click", async () => {
    userEvent.setup();
    let isVisible = false;
    const { container } = render(
      <CompanyPolicies
        isPolicySettings={true}
        isVisible={isVisible}
        initialKey={0}
      />,
      {
        wrapper: FarmStackProvider,
      }
    );

    const addButton = screen.getByText(/Add New Policy/i);
    expect(addButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(addButton);
      isVisible = true;
    });

    const policyNameInput = screen.getByRole("textbox", {
      name: "Policy name",
    });
    expect(policyNameInput).toBeInTheDocument();
    const policyDescriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(policyDescriptionInput).toBeInTheDocument();
    const uploadFileInput = container.querySelector(
      "#file-upload-drag-and-drop-upload-policy-file"
    );

    fireEvent.change(policyNameInput, {
      target: { value: "Test Policy" },
    });
    expect(policyNameInput.value).toBe("Test Policy");
    let value = /this is the value/i;
    // act(async () => {
    //   await userEvent.type(
    //     policyDescriptionInput,
    //     RichTextEditor.createValueFromString(value, "html")
    //   );
    // });
    // expect(policyDescriptionInput).toHaveValue(value);

    // fireEvent.change(uploadFileInput, {
    //   target: {
    //     files: [
    //       new File(["file content"], "test.pdf", { type: "application/pdf" }),
    //     ],
    //   },
    // });
    // expect(uploadFileInput.files[0].name).toBe("test.pdf");
    // expect(uploadFileInput.files[0].type).toBe("application/pdf");

    // const addButtonInForm = screen.getByText("Add");
    // act(() => {
    //   fireEvent.click(addButtonInForm);
    // });
    // const policy = await screen.findByText("kannu");
  });
  test("renders list of policies", async () => {
    setUserId("sometoken");
    render(
      <CompanyPolicies
        isPolicySettings={true}
        isVisible={false}
        initialKey={0}
      />,
      {
        wrapper: FarmStackProvider,
      }
    );
    const policies = await screen.findAllByTestId("accordion");
    expect(policies).toHaveLength(2);
    expect(policies[0]).toHaveTextContent("jiohujgvbv");
  });
  test("renders list of policies failure", async () => {
    server.use(
      rest.get(`${undefined}${UrlConstant.datahub_policy}`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json());
      })
    );
    setUserId("sometoken");
    render(
      <Router>
        <CompanyPolicies
          isPolicySettings={true}
          isVisible={false}
          initialKey={0}
        />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
  });
  // test("renders FileUploaderMain with the correct props", () => {
  //   const mockCreateObjectURL = jest.fn();
  //   URL.createObjectURL = mockCreateObjectURL;

  //   // Set up the mock implementation of URL.createObjectURL
  //   mockCreateObjectURL.mockReturnValue("mocked-object-url");
  //   setUserId("sometoken");
  //   render(
  //     <CompanyPolicies
  //       isPolicySettings={true}
  //       isVisible={true}
  //       initialKey={0}
  //     />,
  //     {
  //       wrapper: FarmStackProvider,
  //     }
  //   );
  //   expect(FileUploaderMain).toHaveBeenCalledTimes(10);
  //   const [props] = FileUploaderMain.mock.calls[0];
  //   expect(props).toMatchObject({
  //     isMultiple: false,
  //     fileTypes: ["pdf", "doc"],
  //     handleChange: expect.any(Function),
  //     maxSize: 25,
  //     setSizeError: expect.any(Function),
  //     id: "upload-policy-file",
  //   });
  //   // const handleUploadPolicy = FileUploaderMain.mock.calls[0][0].handleChange;

  //   // const file = new File(["file content"], "example.pdf", {
  //   //   type: "application/pdf",
  //   // });
  //   // handleUploadPolicy(file);
  //   // expect(handleUploadPolicy).toHaveBeenCalledWith(file);
  // });

  test("calls handleUploadPolicy with the file when handleChange is triggered", () => {
    setUserId("sometoken");
    let isVisible = true;
    render(
      <Router>
        <CompanyPolicies
          isPolicySettings={true}
          isVisible={isVisible}
          initialKey={0}
        />
      </Router>,
      {
        wrapper: FarmStackProvider,
      }
    );
    const addButton = screen.getByText(/Add New Policy/i);
    expect(addButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(addButton);
      isVisible = true;
    });
    const inputFile = screen.getByText(/file/i);
    const file = new File(["file content"], "example.pdf", {
      type: "application/pdf",
    });
    fireEvent.change(inputFile, { target: { files: [file] } });
  });
});
