import React from "react";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import FarmStackProvider from "../../Components/Contexts/FarmStackContext";
import { server } from "../../mocks/server";
import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";
import { setTokenLocal, setUserId } from "../../Utils/Common";
import AddDataSet from "../../Components/Datasets_New/AddDataSet";
import UploadFile from "../../Components/Datasets_New/TabComponents/UploadFile";

const createFileList = (file) => {
  return {
    0: file,
    length: 1,
    item: (index) => file,
    [Symbol.iterator]: function* () {
      yield file;
    },
  };
};

describe("Add dataset module for admin", () => {
  beforeEach(() => {
    cleanup();
    setTokenLocal("sometoken");
    setUserId("someuserid");
    localStorage.setItem("role", JSON.stringify("datahub_admin"));
  });
  afterEach(() => cleanup());

  test("render add dataset component", () => {
    render(
      <Router>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
  });
  test("trigger breadcrum element", () => {
    render(
      <Router history={history}>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const breadcrumbBtn = screen.getByTestId("goPrevRoute");
    fireEvent.click(breadcrumbBtn);
  });
  //   Basic Details
  test("Add Dataset in BasicDetails module with constantly update", () => {
    render(
      <Router history={history}>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetNameField = screen.getByPlaceholderText(/Dataset Name/i);
    fireEvent.change(datasetNameField, { target: { value: "sample dataset" } });

    const datasetDescription = screen.getByPlaceholderText(
      /Dataset description not more than 512 character/i
    );
    fireEvent.change(datasetDescription, {
      target: { value: "sample dataset description" },
    });

    const constantlyUpdateCheckbox = screen.getByRole("checkbox");
    fireEvent.click(constantlyUpdateCheckbox);

    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);
  });
  test("Add Dataset in BasicDetails module with date", () => {
    render(
      <Router history={history}>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetNameField = screen.getByPlaceholderText(/Dataset Name/i);
    fireEvent.change(datasetNameField, { target: { value: "sample dataset" } });

    const datasetDescription = screen.getByPlaceholderText(
      /Dataset description not more than 512 character/i
    );
    fireEvent.change(datasetDescription, {
      target: { value: "sample dataset description" },
    });

    const startDate = screen.getByRole("textbox", {
      name: /start date/i,
    });
    fireEvent.change(startDate, { target: { value: "20/11/2022" } });

    const endDate = screen.getByRole("textbox", {
      name: /end date/i,
    });
    fireEvent.change(endDate, { target: { value: "20/04/2023" } });

    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);
  });
  test("Add Dataset in BasicDetails module with failure", () => {
    server.use(
      rest.post(
        UrlConstant.base_url + UrlConstant.add_basic_dataset,
        (req, res, ctx) => {
          return res(ctx.status(400), ctx.json());
        }
      )
    );
    render(
      <Router history={history}>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetNameField = screen.getByPlaceholderText(/Dataset Name/i);
    fireEvent.change(datasetNameField, { target: { value: "sample dataset" } });

    const datasetDescription = screen.getByPlaceholderText(
      /Dataset description not more than 512 character/i
    );
    fireEvent.change(datasetDescription, {
      target: { value: "sample dataset description" },
    });

    const constantlyUpdateCheckbox = screen.getByRole("checkbox");
    fireEvent.click(constantlyUpdateCheckbox);

    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);
  });
  // Upload or imports
  test("Add Dataset in BasicDetails > Upload or Imports module", async () => {
    jest.setTimeout(10000);
    render(
      <Router history={history}>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetNameField = screen.getByPlaceholderText(/Dataset Name/i);
    fireEvent.change(datasetNameField, { target: { value: "sample dataset" } });

    const datasetDescription = screen.getByPlaceholderText(
      /Dataset description not more than 512 character/i
    );
    fireEvent.change(datasetDescription, {
      target: { value: "sample dataset description" },
    });

    const constantlyUpdateCheckbox = screen.getByRole("checkbox");
    fireEvent.click(constantlyUpdateCheckbox);

    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);

    const text = await screen.findByText(/Upload or imports/i);
    expect(text).toBeInTheDocument();

    const testFile = new File(["dummy content"], "testfile.png", {
      type: "image/png",
    });
    const fileList = createFileList(testFile);
    const fileInput = screen.getByLabelText(/Drop files here/i);
    fireEvent.change(fileInput, { target: { files: fileList } });

    const fileName = await screen.findAllByText(/testfile.png/i);
    expect(fileName[0]).toBeInTheDocument();

    const uploadBtn = await screen.findByText("Upload");
    fireEvent.click(uploadBtn);

    const listtext = await screen.findByText(/List of files/i);
    expect(listtext).toBeInTheDocument();

    const isFiles = await screen.findAllByText(/testfile.png/i);
    expect(isFiles[0]).toBeInTheDocument();

    const mysqlDbTab = screen.getByTestId("add_dataset_upload_type_mysql");
    fireEvent.click(mysqlDbTab);

    const databaseNameField = screen.getByPlaceholderText("Database name");
    fireEvent.change(databaseNameField, { target: { value: "suitecrm" } });

    const userNameField = screen.getByPlaceholderText("User name");
    fireEvent.change(userNameField, { target: { value: "readonly" } });

    const passwordField = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordField, { target: { value: "KLxnnme.C_2GR#G" } });

    const urlField = screen.getByPlaceholderText("Database host URL");
    fireEvent.change(urlField, {
      target: {
        value:
          "copiamexiconoetlparadigitalgreen.cskysn2rpea7.us-east-2.rds.amazonaws.com",
      },
    });

    const portField = screen.getByPlaceholderText("Port");
    fireEvent.change(portField, { target: { value: "3306" } });

    const connectBtn = screen.getByText("Connect");
    fireEvent.click(connectBtn);

    const selectMySqlTableElement = await screen.findByPlaceholderText(
      "Select table"
    );
    fireEvent.change(selectMySqlTableElement, {
      target: { value: "AELevantamiento" },
    });
    expect(selectMySqlTableElement).toHaveValue("AELevantamiento");

    const columnCheckbox = await screen.findByRole("checkbox", {
      name: /id/i,
    });
    fireEvent.click(columnCheckbox);

    const chip = screen.getByTestId("upload_dataset_colum");
    expect(chip).toBeInTheDocument();

    const mySqlExportFileName = screen.getByPlaceholderText("File name");
    fireEvent.change(mySqlExportFileName, { target: { value: "samplesql" } });

    const importBtn = screen.getByText("Import");
    fireEvent.click(importBtn);

    const restApiTab = screen.getByTestId("add_dataset_upload_type_rest_api");
    fireEvent.click(restApiTab);

    const apiUrl = screen.getByPlaceholderText("API");
    fireEvent.change(apiUrl, { target: { value: "samplesql" } });

    const selectAuthType = await screen.findByPlaceholderText("Auth Type");
    fireEvent.change(selectAuthType, {
      target: { value: "NO_AUTH" },
    });
    expect(selectAuthType).toHaveValue("NO_AUTH");

    const importFilenameField = screen.getByPlaceholderText("API");
    fireEvent.change(importFilenameField, { target: { value: "sampleapi" } });

    const apiImportBtn = screen.getByTestId("restapi_import_btn");
    fireEvent.click(apiImportBtn);

    fireEvent.click(nextBtn);
  });
  // Standardise
  test("Add Dataset in BasicDetails > Upload or Imports module > Standardise", async () => {
    jest.setTimeout(10000);
    render(
      <Router history={history}>
        <AddDataSet />
      </Router>,
      { wrapper: FarmStackProvider }
    );
    const datasetNameField = screen.getByPlaceholderText(/Dataset Name/i);
    fireEvent.change(datasetNameField, { target: { value: "sample dataset" } });

    const datasetDescription = screen.getByPlaceholderText(
      /Dataset description not more than 512 character/i
    );
    fireEvent.change(datasetDescription, {
      target: { value: "sample dataset description" },
    });

    const constantlyUpdateCheckbox = screen.getByRole("checkbox");
    fireEvent.click(constantlyUpdateCheckbox);

    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);

    const text = await screen.findByText(/Upload or imports/i);
    expect(text).toBeInTheDocument();

    const testFile = new File(["dummy content"], "testfile.png", {
      type: "image/png",
    });
    const fileList = createFileList(testFile);
    const fileInput = screen.getByLabelText(/Drop files here/i);
    fireEvent.change(fileInput, { target: { files: fileList } });

    const fileName = await screen.findAllByText(/testfile.png/i);
    expect(fileName[0]).toBeInTheDocument();

    const uploadBtn = await screen.findByText("Upload");
    fireEvent.click(uploadBtn);

    const listtext = await screen.findByText(/List of files/i);
    expect(listtext).toBeInTheDocument();

    const isFiles = await screen.findAllByText(/testfile.png/i);
    expect(isFiles[0]).toBeInTheDocument();

    const mysqlDbTab = screen.getByTestId("add_dataset_upload_type_mysql");
    fireEvent.click(mysqlDbTab);

    const databaseNameField = screen.getByPlaceholderText("Database name");
    fireEvent.change(databaseNameField, { target: { value: "suitecrm" } });

    const userNameField = screen.getByPlaceholderText("User name");
    fireEvent.change(userNameField, { target: { value: "readonly" } });

    const passwordField = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordField, { target: { value: "KLxnnme.C_2GR#G" } });

    const urlField = screen.getByPlaceholderText("Database host URL");
    fireEvent.change(urlField, {
      target: {
        value:
          "copiamexiconoetlparadigitalgreen.cskysn2rpea7.us-east-2.rds.amazonaws.com",
      },
    });

    const portField = screen.getByPlaceholderText("Port");
    fireEvent.change(portField, { target: { value: "3306" } });

    const connectBtn = screen.getByText("Connect");
    fireEvent.click(connectBtn);

    const selectMySqlTableElement = await screen.findByPlaceholderText(
      "Select table"
    );
    fireEvent.change(selectMySqlTableElement, {
      target: { value: "AELevantamiento" },
    });
    expect(selectMySqlTableElement).toHaveValue("AELevantamiento");

    const columnCheckbox = await screen.findByRole("checkbox", {
      name: /id/i,
    });
    fireEvent.click(columnCheckbox);

    const chip = screen.getByTestId("upload_dataset_colum");
    expect(chip).toBeInTheDocument();

    const mySqlExportFileName = screen.getByPlaceholderText("File name");
    fireEvent.change(mySqlExportFileName, { target: { value: "samplesql" } });

    const importBtn = screen.getByText("Import");
    fireEvent.click(importBtn);

    const restApiTab = screen.getByTestId("add_dataset_upload_type_rest_api");
    fireEvent.click(restApiTab);

    const apiUrl = screen.getByPlaceholderText("API");
    fireEvent.change(apiUrl, { target: { value: "samplesql" } });

    const selectAuthType = await screen.findByPlaceholderText("Auth Type");
    fireEvent.change(selectAuthType, {
      target: { value: "NO_AUTH" },
    });
    expect(selectAuthType).toHaveValue("NO_AUTH");

    const importFilenameField = screen.getByPlaceholderText("API");
    fireEvent.change(importFilenameField, { target: { value: "sampleapi" } });

    const apiImportBtn = screen.getByTestId("restapi_import_btn");
    fireEvent.click(apiImportBtn);

    fireEvent.click(nextBtn);

    const selectStandardiseElement = await screen.findByPlaceholderText(
      "File name"
    );
    fireEvent.change(selectStandardiseElement, {
      target: { value: "cc70ff0d-f54d-4890-80c4-22e91d3e34b1" },
    });

    const accordionTitle = await screen.findByTestId("accordion_component");
    fireEvent.click(accordionTitle);
  });
});
