import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  cleanup,
  logRoles,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CompanyPolicies from "../../Components/NewOnboarding/CompanyPolicies";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import FileUploaderMain from "../../Components/Generic/FileUploader";
import HTTPService from "../../Services/HTTPService";
import axios from "axios";

describe("Policy Setting", () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <FarmStackProvider>
        <CompanyPolicies />
      </FarmStackProvider>
    );
  });

  test("input existenece and event triggering", () => {
    render(
      <FarmStackProvider>
        <CompanyPolicies />
      </FarmStackProvider>
    );

    expect(
      screen.getByRole("textbox", {
        name: "Policy name",
      })
    ).toBeInTheDocument();

    const policyDescriptionElement = screen.getByRole("combobox", {
      name: "Block type",
    });
    expect(policyDescriptionElement).toBeInTheDocument();
  });

  test("adds a new policy on button click", () => {
    let isVisible = false;
    const callLoader = jest.fn();
    const callToast = jest.fn();
    const { container } = render(
      <FarmStackProvider value={{ callLoader, callToast }}>
        <CompanyPolicies
          isPolicySettings={true}
          isVisible={isVisible}
          initialKey={0}
        />
      </FarmStackProvider>
    );

    const addButton = screen.getByText(/Add New Policy/i);
    expect(addButton).toBeInTheDocument();

    act(() => {
      userEvent.click(addButton);
      isVisible = true;
    });

    const policyNameInput = screen.getByRole("textbox", {
      name: "Policy name",
    });
    const policyDescriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    console.log(policyDescriptionInput);
    // const policyDescriptionInput = screen.getByRole("combobox", {
    //   name: "Block type",
    // });
    const uploadFileInput = container.querySelector(
      "#file-upload-drag-and-drop-upload-policy-file"
    );

    fireEvent.change(policyNameInput, {
      target: { value: "Test Policy" },
    });
    fireEvent.change(policyDescriptionInput, {
      key: "Test policy description",
    });
    fireEvent.change(uploadFileInput, {
      target: {
        files: [
          new File(["file content"], "test.pdf", { type: "application/pdf" }),
        ],
      },
    });
    console.log(policyDescriptionInput);
    expect(policyNameInput.value).toBe("Test Policy");
    // expect(policyDescriptionInput).toBe(true);
    expect(uploadFileInput.files[0].name).toBe("test.pdf");
    expect(uploadFileInput.files[0].type).toBe("application/pdf");
    // const addButtonInForm = screen.getByText("Add");
    // fireEvent.click(addButtonInForm);

    // await waitFor(() => {
    //   expect(
    //     screen.getByText("Policy details added successfully!")
    //   ).toBeInTheDocument();
    // });
  });
});
