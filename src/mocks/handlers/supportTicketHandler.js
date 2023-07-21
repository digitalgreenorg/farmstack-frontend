import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

export const supportTicketHandler = [
  rest.post(
    UrlConstant.base_url + UrlConstant.support_ticket_tab,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          count: 3,
          next: "https://datahubethdev.farmstack.co/be/participant/support_ticket/list_tickets/?page=2",
          previous: null,
          results: [
            {
              id: "e1fa439e-5216-4459-89ff-a446b13aef62",
              user_map: {
                id: "4a38d1b1-868d-4bbf-950a-db62d9350f50",
                user: {
                  first_name: "monika",
                  last_name: "chandran",
                  phone_number: "+91 23456-78909",
                  role: 6,
                },
                organization: {
                  name: "shru costeward org and something new to check the space",
                  hero_image: null,
                  phone_number: "+91 23456-78909",
                  logo: "/media/organizations/logos/bitter_VVN9G1p.jpeg",
                },
              },
              created_at: "2023-06-08T03:22:52.837095Z",
              updated_at: "2023-07-19T08:51:11.454693Z",
              ticket_title: "6 tickets",
              description: "sdfr",
              category: "others",
              ticket_attachment: null,
              status: "open",
            },
            {
              id: "a290f396-01b6-4530-a01b-f5ba2b9126f6",
              user_map: {
                id: "4a38d1b1-868d-4bbf-950a-db62d9350f50",
                user: {
                  first_name:
                    "monikasdfrgthygtrfedfrgthyjuhgfergthyjukjyhgfdsfgthyjuyhgfdwefrgthyjuhgfdsfghyjuyhtgrfedwefrgthyjuk",
                  last_name: "chandran",
                  phone_number: "+91 23456-78909",
                  role: 6,
                },
                organization: {
                  name: "shru costeward org and something new to check the space",
                  hero_image: null,
                  phone_number: "+91 23456-78909",
                  logo: "/media/organizations/logos/bitter_VVN9G1p.jpeg",
                },
              },
              created_at: "2023-06-08T03:22:21.832032Z",
              updated_at: "2023-06-09T12:58:02.663128Z",
              ticket_title: "3 tickets",
              description: "df",
              category: "user_accounts",
              ticket_attachment: null,
              status: "open",
            },
          ],
        })
      );
    }
  ),
];
