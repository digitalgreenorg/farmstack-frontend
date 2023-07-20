import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";
import { getUserLocal } from "../../Utils/Common";
const getBaseUrl = () => {
  return process.env.REACT_APP_BASEURL;
};

export const micrositeHandler = [
  // pass your url in the first parameter
  rest.post(
    `${getBaseUrl()}${UrlConstant.costeward_onboarded_dataset}`,
    (req, res, ctx) => {
      console.log("microsite onboarding dataset", req);
      return res(
        ctx.status(200),
        ctx.json({
          count: 58,
          next: "https://datahubethdev.farmstack.co/be/microsite/datasets/dataset_filters/?page=2",
          previous: null,
          results: [
            {
              id: "f8b8a49b-1298-4cfa-a2a7-9948c26274f4",
              user_id: "d8d99521-30da-4809-8ebb-160ac1f9029f",
              organization_id: "2e7c48b3-4ca0-4d8a-a8af-0d69d99011f0",
              organization: {
                org_email: "nilesh+participant@digitalgreen.org",
                org_description: "dfgfdg",
                name: "nilesh+participant",
                logo: "/media/organizations/logos/d2fo-home-img_DjWEIqN.jpeg",
                address: {
                  city: "",
                  address: "nilesh+participant@digitalgreen.org",
                  country: "Armenia",
                  pincode: "123456",
                },
                phone_number: "+91 12345-67899",
              },
              user: {
                last_name: "",
                first_name: "nilesh+participant@digitalgreen.org",
                email: "nilesh+participant@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-07-19T10:39:28.705904Z",
              updated_at: "2023-07-19T10:40:33.790844Z",
              name: "Datastet1",
              description: "deseb",
              category: {},
              geography: {},
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "152d9d44-2207-4328-8c2a-0fed99ec9118",
            },
          ],
        })
      );
    }
  ),
];
