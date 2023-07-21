import React from "react";
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

    fireEvent.change(uploadFileInput, {
      target: {
        files: [
          new File(["file content"], "test.pdf", { type: "application/pdf" }),
        ],
      },
    });
    expect(uploadFileInput.files[0].name).toBe("test.pdf");
    expect(uploadFileInput.files[0].type).toBe("application/pdf");

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
});
