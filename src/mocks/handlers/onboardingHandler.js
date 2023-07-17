import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";
import { getUserLocal } from "../../Utils/Common";
export const onboardingHandler = [
  // pass your url in the first parameter
  rest.get(
    "",
    // UrlConstant.base_url + UrlConstant.profile + getUserLocal() + "/",
    (req, res, ctx) => {
      console.log("inside onbaoding profile api");
      return res(
        ctx.status(200),
        ctx.json({
          id: getTokenLocal(),
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
  ),
];
