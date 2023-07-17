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
import { setUserId } from "../../Utils/Common";

describe("Policy Setting", () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
  });

  test("renders without crashing", () => {
    render(<CompanyPolicies />, {
      wrapper: FarmStackProvider,
    });
  });

  test("input existenece and event triggering", () => {
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
  });

  test("adds a new policy on button click", () => {
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
    // const policyDescriptionInput = screen.getByRole("combobox", {
    //   name: "Block type",
    // });
    const uploadFileInput = container.querySelector(
      "#file-upload-drag-and-drop-upload-policy-file"
    );

    act(() => {
      fireEvent.change(policyNameInput, {
        target: { value: "Test Policy" },
      });
      // fireEvent.change(policyDescriptionInput, {
      //   value: "unstyled",
      // });
      fireEvent.change(uploadFileInput, {
        target: {
          files: [
            new File(["file content"], "test.pdf", { type: "application/pdf" }),
          ],
        },
      });
    });
    expect(policyNameInput.value).toBe("Test Policy");
    // expect(policyDescriptionInput.value).toBe("unstyled");
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
});
