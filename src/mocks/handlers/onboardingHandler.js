import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";
import { getUserLocal } from "../../Utils/Common";
import settingController from "../controllers/setting.controller";

const getBaseUrl = () => {
  return process.env.REACT_APP_BASEURL;
};
export const onboardingHandler = [
  // pass your url in the first parameter
  rest.get(`${getBaseUrl()}${UrlConstant.profile}:userId/`, (req, res, ctx) => {
    // console.log(`${getBaseUrl()}${UrlConstant.profile}:userId/`);
    const { userId } = req.params;
    console.log(userId, "error_in_get");
    if (userId == "error_in_get") {
      return res(
        ctx.status(401),
        ctx.json({
          code: "token_not_valid",
          access: "Given token not valid for any token type",
          messages: [
            {
              token_class: "AccessToken",
              token_type: "access",
              message: "Token is invalid or expired",
            },
          ],
          0: {
            token_class: "AccessToken",
            token_type: "access",
            message: "Token is invalid or expired",
          },
        })
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          id: "id",
          email: "dgemail@digitalgreen.org",
          first_name: "digital",
          last_name: "green",
          phone_number: "+91 9898989898",
          role: 1,
          subscription: null,
          profile_picture: null,
          on_boarded: true,
          approval_status: true,
          on_boarded_by: null,
        })
      );
    }
  }),
  rest.put(
    `${UrlConstant.base_url}${UrlConstant.profile}:userId/`,
    (req, res, ctx) => {
      const { userId } = req.params;
      // console.log(req, "req");
      if (userId === "error") {
        console.log(userId, "put call");

        return res(
          ctx.status(400),
          ctx.json({
            email: ["This field may not be blank."],
            phone_number: ["This field may not be blank."],
            first_name: ["This field may not be blank."],
            last_name: ["This field may not be blank."],
          })
        );
      } else if (userId === "status403") {
        // console.log(userId, "put call");

        return res(
          ctx.status(403),
          ctx.json({
            detail: ["Something went wrong"],
          })
        );
      } else if (userId == "token_failure") {
        return res(
          ctx.status(400),
          ctx.json({
            code: "token_not_valid",
            detail: "Given token not valid for any token type",
            messages: [
              {
                token_class: "AccessToken",
                token_type: "access",
                message: "Token is invalid or expired",
              },
            ],
            0: {
              token_class: "AccessToken",
              token_type: "access",
              message: "Token is invalid or expired",
            },
          })
        );
      } else {
        return res(
          ctx.status(201),
          ctx.json({
            message: "updated user details",
            response: {
              approval_status: true,
              email: "dgemail@digitalgreen.org",
              first_name: "digital",
              last_name: "green",
              phone_number: "+91 98989-89898",
              on_boarded: true,
              on_boarded_by: null,
              profile_picture: null,
              role: 1,
            },
          })
        );
      }
    }
  ),
  rest.get(`${getBaseUrl()}${UrlConstant.refesh}`, () => {}),
];
