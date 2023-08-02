import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

export const datasetRequestHandler = [
  rest.post(
    `${UrlConstant.base_url}datahub/new_dataset_v2/requested_datasets/`,
    (req, res, ctx) => {
      console.log("🚀 ~ file: datasetRequestHandler.js:8 ~ req:", req);
      return res(
        ctx.status(200),
        ctx.json({
          sent: [
            {
              approval_status: "requested",
              updated_at: "2023-08-01T01:50:27.476157Z",
              accessibility_time: null,
              dataset_id: "6a697b90-d153-4979-8580-541aaad92243",
              dataset_name: "privet dataset w2",
              file_name: "Copy_of_Saharapada_FPC_Members_1.xlsx",
              organization_name: "nilesh+13@digitalgreen.org",
              organization_email: "nilesh13@digitalgreen.org",
            },
          ],
          recieved: [
            {
              id: "252ff7eb-5b03-41fd-918e-e0fdc0ed9e3a",
              approval_status: "requested",
              accessibility_time: null,
              updated_at: "2023-08-01T01:52:46.934827Z",
              dataset_id: "41f883c7-ae19-4173-b7b9-9ad655655dd3",
              dataset_name: "privet dataset test",
              file_name: "Copy_of_Saharapada_FPC_Members_1.xlsx",
              organization_name: "nilesh+13@digitalgreen.org",
              organization_email: "nilesh13@digitalgreen.org",
            },
          ],
        })
      );
    }
  ),
  rest(
    `${UrlConstant.base_url}datahub/usage_policies/${id}/`,
    (req, res, ctx) => {
      const id = req.param.id;
      console.log(
        "🚀 ~ file: datasetRequestHandler.js:43 ~ rest ~ req.param:",
        req.param
      );
      return res(cts.status(200), ctx.json());
    }
  ),
];
