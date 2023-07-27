import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

export const participantHandler = [
  // pass your url in the first parameter
    rest.post(
      UrlConstant.base_url + UrlConstant.register_participant,
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(
          {}
        ));
      }
    ),
    rest.post(
      UrlConstant.base_url + "datahub/participant/get_list_co_steward/",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(
          [
            {
                "user": "26192c83-4cd2-4926-b0e5-c77ea58008d0",
                "organization_name": "Jai's Demo Organization_1"
            },
            {
                "user": "686192d2-d3cc-4dfa-aefe-0f9848935e01",
                "organization_name": "JSN"
            },
            {
                "user": "fe79f0f3-5c7a-48be-abfc-4a86b6199515",
                "organization_name": "kanhaiya"
            },
            {
                "user": "65e08d53-5c47-4854-bd3f-a57e4e7ad691",
                "organization_name": "Kanhaiya"
            },
            {
                "user": "17e2bd9e-cfed-4f40-b788-063784fc7cda",
                "organization_name": "Kanhaiya Participant Org"
            },
            {
                "user": "2fb4be13-a6c8-4f95-8f78-c45320005180",
                "organization_name": "monika org costeward"
            },
            {
                "user": "4131d9e6-bdae-47cb-9ad9-01fe6690095e",
                "organization_name": "nilesh+10@digitalgreen.org"
            },
            {
                "user": "81931fc3-ecc8-4d76-b7b2-f8f2a77dc713",
                "organization_name": "nilesh+12@digitalgreen.org"
            },
            {
                "user": "3e85eef0-9fb9-491f-9bb7-658bb1aea089",
                "organization_name": "NS"
            },
            {
                "user": "3ddd3e85-c0f5-44d7-a151-f282702ff7ca",
                "organization_name": "org"
            },
            {
                "user": "7d23cedc-c205-4b3b-978d-a6a18b9cd582",
                "organization_name": "sdfghj"
            },
            {
                "user": "56695d23-37f2-4cc1-9abb-9051f7a84761",
                "organization_name": "shru costeward org and something new to check the space"
            },
            {
                "user": "bed3b6e7-ffec-4460-ae3c-8dd5c85a806a",
                "organization_name": "Test 2"
            },
            {
                "user": "7d8bf883-a027-4b4a-acd4-771955464e54",
                "organization_name": "Titan"
            },
            {
                "user": "054d6fc9-cc55-4b8a-85e2-6456fb6bcd14",
                "organization_name": null
            }
        ]
        ));
      }
    ),
    rest.get(
      UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(
          {
            "id": "d0bb3072-4f42-4e72-835f-9416e1df1ec2",
            "user_id": "dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
            "organization_id": "a4e60876-a249-4c45-b13a-7993c2572e27",
            "user": {
                "id": "dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
                "email": "ekta+part@digitalgreen.org",
                "first_name": "ekta",
                "last_name": "part",
                "phone_number": "+91 96114-57777",
                "role": 3,
                "status": true,
                "subscription": null,
                "profile_picture": null,
                "on_boarded": true,
                "on_boarded_by": null,
                "approval_status": true
            },
            "organization": {
                "id": "a4e60876-a249-4c45-b13a-7993c2572e27",
                "name": "ekta dummy",
                "org_email": "ekta+part@digitalgreen.org",
                "address": {
                    "city": "",
                    "address": "patna",
                    "country": "India",
                    "pincode": "800001"
                },
                "phone_number": "+91 96114-57777",
                "logo": "/media/organizations/logos/download_y5chEtC.png",
                "hero_image": null,
                "org_description": "dhgdhh",
                "website": "https://www.google.com",
                "status": true
            },
            "dataset_count": 0,
            "connector_count": 0,
            "number_of_participants": 0
        }
        ));
      }
    ),
    rest.put(
      UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(
          {
            "id": "d0bb3072-4f42-4e72-835f-9416e1df1ec2",
            "user_id": "dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
            "organization_id": "a4e60876-a249-4c45-b13a-7993c2572e27",
            "user": {
                "id": "dccf135e-cdc3-4412-aa79-a89db0dfa6bc",
                "email": "ekta+part@digitalgreen.org",
                "first_name": "ekta",
                "last_name": "part",
                "phone_number": "+91 96114-57777",
                "role": 3,
                "status": true,
                "subscription": null,
                "profile_picture": null,
                "on_boarded": true,
                "on_boarded_by": null,
                "approval_status": true
            },
            "organization": {
                "id": "a4e60876-a249-4c45-b13a-7993c2572e27",
                "name": "ekta dummy",
                "org_email": "ekta+part@digitalgreen.org",
                "address": {
                    "city": "",
                    "address": "patna",
                    "country": "India",
                    "pincode": "800001"
                },
                "phone_number": "+91 96114-57777",
                "logo": "/media/organizations/logos/download_y5chEtC.png",
                "hero_image": null,
                "org_description": "dhgdhh",
                "website": "https://www.google.com",
                "status": true
            },
            "dataset_count": 0,
            "connector_count": 0,
            "number_of_participants": 0
        }
        ));
      }
    ),
    rest.post(
      UrlConstant.base_url + UrlConstant.participant,
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(
          {}
        ));
      }
    ),
];
