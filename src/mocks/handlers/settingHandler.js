import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

export const settingHandler = [
  rest.get(
    UrlConstant.base_url + UrlConstant.datahub_policy,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: "d17263d0-b9a3-4f50-bd75-66d000eeda4c",
            created_at: "2023-07-14T11:23:36.506894Z",
            updated_at: "2023-07-14T11:23:36.506921Z",
            name: "jiohujgvbv",
            description: "<p>kojilkbhv</p>",
            file: null,
          },
          {
            id: "d17263d0-b9a3-4f50-bd75-66d000eedane",
            created_at: "2023-07-14T11:23:36.506894Z",
            updated_at: "2023-07-14T11:23:36.506921Z",
            name: "kanhaiya",
            description: "<p>dsghvj</p>",
            file: null,
          },
        ])
      );
    }
  ),
  rest.post(
    UrlConstant.base_url + UrlConstant.datahub_policy,
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({
          id: "d17263d0-b9a3-4f50-bd75-66d000eeda4c",
          created_at: "2023-07-14T11:23:36.506894Z",
          updated_at: "2023-07-14T11:23:36.506921Z",
          name: "kannu",
          description: "<p>kojilkbhv</p>",
          file: null,
        })
      );
    }
  ),
  rest.get(
    UrlConstant.base_url + UrlConstant.standardization_get_data,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: "8d098de5-2178-4fb9-a257-d9d09a5707ab",
            datapoint_category: "Pochanki",
            datapoint_description: "PochankiGatka",
            datapoint_attributes: {},
          },
        ])
      );
    }
  ),
];
