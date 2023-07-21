import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";
const getBaseUrl = () => {
  return process.env.REACT_APP_BASEURL;
};

export const participantHandler = [
  // pass your url in the first parameter
    rest.get(
      `${getBaseUrl()}${UrlConstant.participant}:userId/`,
      (req, res, ctx) => {
        const { userId } = req.params;
        if(userId == "error_in_get") {
          return res(
            ctx.status(400),
            ctx.json({
              message: ["bad request"],
            })
          );
        } else {
        return res(ctx.status(200), ctx.json({
          id: "d0bb3072-4f42-4e72-835f-9416e1df1ec2",
          user_id: "dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
          organization_id: "a4e60876-a249-4c45-b13a-7993c2572e27",
          user: {
              id: "dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
              email: "ekta+part@digitalgreen.org",
              first_name: "ekta",
              last_name: "part",
              phone_number: "+91 96114-57777",
              role: 3,
              status: true,
              subscription: null,
              profile_picture: null,
              on_boarded: true,
              on_boarded_by: null,
              approval_status: true
          },
          organization: {
              id: "a4e60876-a249-4c45-b13a-7993c2572e27",
              name: "ekta dummy",
              org_email: "ekta+part@digitalgreen.org",
              address: {
                  city: "",
                  address: "patna",
                  country: "India",
                  pincode: "800001"
              },
              phone_number: "+91 96114-57777",
              logo: "/media/organizations/logos/download_y5chEtC.png",
              hero_image: null,
              org_description: "dhgdhh",
              website: "https://www.google.com",
              status: true
          },
          dataset_count: 0,
          connector_count: 0,
          number_of_participants: 0
      }

        ));
    }
      }
    ),
];
