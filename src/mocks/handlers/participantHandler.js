import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

export const participantHandler = [
  // pass your url in the first parameter
    rest.post(
      UrlConstant.base_url + UrlConstant.register_participant,
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(
          {
            id: "a2b12bae-389c-4d56-b11a-7233fa466050",
            created_at: "2023-07-24T19:12:41.117381Z",
            updated_at: "2023-07-24T19:12:41.117409Z",
            user: "f8c58cf7-0523-4cc3-ad34-ae999b4de99b",
            organization: "bb92b790-e810-462d-b5db-c40139ffa8fe"
        }
        ));
      }
    ),
];
