import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

export const participantHandler = [
  // pass your url in the first parameter
  rest.get(
    UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
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
            approval_status: true,
          },
          organization: {
            id: "a4e60876-a249-4c45-b13a-7993c2572e27",
            name: "ekta dummy",
            org_email: "ekta+part@digitalgreen.org",
            address: {
              city: "",
              address: "patna",
              country: "India",
              pincode: "800001",
            },
            phone_number: "+91 96114-57777",
            logo: "/media/organizations/logos/download_y5chEtC.png",
            hero_image: null,
            org_description: "dhgdhh",
            website: "https://www.google.com",
            status: true,
          },
          dataset_count: 0,
          connector_count: 0,
          number_of_participants: 0,
        })
      );
    }
  ),
  rest.get(
    UrlConstant.base_url + UrlConstant.participant + "?on_boarded_by=" + ":id",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          {"count":0,"next":null,"previous":null,"results":[]}
        )
      );
    }
  ),
  rest.post(
    UrlConstant.base_url + UrlConstant.costeward_onboarded_dataset,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          {
            "count": 6,
            "next": "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/?page=2",
            "previous": null,
            "results": [
                {
                    "id": "7ebc81d7-530a-4d57-9551-4b20b28c7e54",
                    "user_id": "8ec1bac3-2171-4222-9b4f-7908626ae109",
                    "organization_id": "bc29075a-2233-497e-b1b1-1b72f50bac19",
                    "organization": {
                        "org_email": "shruth@df.com",
                        "org_description": "kkkkkkkk",
                        "name": "DG",
                        "logo": "/media/organizations/logos/carssss_rRltuAr.jpeg",
                        "address": {
                            "city": "",
                            "address": "chennai",
                            "country": "American Samoa",
                            "pincode": "3333333333"
                        },
                        "phone_number": "+254456789873"
                    },
                    "user": {
                        "last_name": "",
                        "first_name": "Shruthi",
                        "email": "shruthichandran@digitalgreen.org",
                        "on_boarded_by": null
                    },
                    "created_at": "2023-07-05T11:11:30.958286Z",
                    "updated_at": "2023-07-14T12:12:07.808213Z",
                    "name": "check for view",
                    "description": "swdcfv",
                    "category": {
                        "Horticulture": [
                            "GDHFDHGDFHGF",
                            "dsvxc",
                            "sdxz",
                            "rzdfc",
                            "dvsxc",
                            "sdfxc",
                            "rdzfvxc",
                            "dxdsvxc",
                            "sdzfx"
                        ]
                    },
                    "geography": {
                        "city": {
                            "name": "Airds",
                            "latitude": "-34.08599000",
                            "longitude": "150.83322000",
                            "stateCode": "NSW",
                            "countryCode": "AU"
                        },
                        "state": {
                            "name": "New South Wales",
                            "isoCode": "NSW",
                            "latitude": "-31.25321830",
                            "longitude": "146.92109900",
                            "countryCode": "AU"
                        },
                        "country": {
                            "flag": "🇦🇺",
                            "name": "Australia",
                            "isoCode": "AU",
                            "currency": "AUD",
                            "latitude": "-27.00000000",
                            "longitude": "133.00000000",
                            "phonecode": "61",
                            "timezones": [
                                {
                                    "tzName": "Macquarie Island Station Time",
                                    "zoneName": "Antarctica/Macquarie",
                                    "gmtOffset": 39600,
                                    "abbreviation": "MIST",
                                    "gmtOffsetName": "UTC+11:00"
                                },
                                {
                                    "tzName": "Australian Central Daylight Saving Time",
                                    "zoneName": "Australia/Adelaide",
                                    "gmtOffset": 37800,
                                    "abbreviation": "ACDT",
                                    "gmtOffsetName": "UTC+10:30"
                                },
                                {
                                    "tzName": "Australian Eastern Standard Time",
                                    "zoneName": "Australia/Brisbane",
                                    "gmtOffset": 36000,
                                    "abbreviation": "AEST",
                                    "gmtOffsetName": "UTC+10:00"
                                },
                                {
                                    "tzName": "Australian Central Daylight Saving Time",
                                    "zoneName": "Australia/Broken_Hill",
                                    "gmtOffset": 37800,
                                    "abbreviation": "ACDT",
                                    "gmtOffsetName": "UTC+10:30"
                                },
                                {
                                    "tzName": "Australian Eastern Daylight Saving Time",
                                    "zoneName": "Australia/Currie",
                                    "gmtOffset": 39600,
                                    "abbreviation": "AEDT",
                                    "gmtOffsetName": "UTC+11:00"
                                },
                                {
                                    "tzName": "Australian Central Standard Time",
                                    "zoneName": "Australia/Darwin",
                                    "gmtOffset": 34200,
                                    "abbreviation": "ACST",
                                    "gmtOffsetName": "UTC+09:30"
                                },
                                {
                                    "tzName": "Australian Central Western Standard Time (Unofficial)",
                                    "zoneName": "Australia/Eucla",
                                    "gmtOffset": 31500,
                                    "abbreviation": "ACWST",
                                    "gmtOffsetName": "UTC+08:45"
                                },
                                {
                                    "tzName": "Australian Eastern Daylight Saving Time",
                                    "zoneName": "Australia/Hobart",
                                    "gmtOffset": 39600,
                                    "abbreviation": "AEDT",
                                    "gmtOffsetName": "UTC+11:00"
                                },
                                {
                                    "tzName": "Australian Eastern Standard Time",
                                    "zoneName": "Australia/Lindeman",
                                    "gmtOffset": 36000,
                                    "abbreviation": "AEST",
                                    "gmtOffsetName": "UTC+10:00"
                                },
                                {
                                    "tzName": "Lord Howe Summer Time",
                                    "zoneName": "Australia/Lord_Howe",
                                    "gmtOffset": 39600,
                                    "abbreviation": "LHST",
                                    "gmtOffsetName": "UTC+11:00"
                                },
                                {
                                    "tzName": "Australian Eastern Daylight Saving Time",
                                    "zoneName": "Australia/Melbourne",
                                    "gmtOffset": 39600,
                                    "abbreviation": "AEDT",
                                    "gmtOffsetName": "UTC+11:00"
                                },
                                {
                                    "tzName": "Australian Western Standard Time",
                                    "zoneName": "Australia/Perth",
                                    "gmtOffset": 28800,
                                    "abbreviation": "AWST",
                                    "gmtOffsetName": "UTC+08:00"
                                },
                                {
                                    "tzName": "Australian Eastern Daylight Saving Time",
                                    "zoneName": "Australia/Sydney",
                                    "gmtOffset": 39600,
                                    "abbreviation": "AEDT",
                                    "gmtOffsetName": "UTC+11:00"
                                }
                            ]
                        }
                    },
                    "data_capture_start": null,
                    "data_capture_end": null,
                    "constantly_update": true,
                    "is_temp": false,
                    "user_map": "3c9071cb-5fe1-4cdb-8e15-7961c065989b"
                }
            ]
        }
        )
      );
    }
  ),
  rest.delete(
    UrlConstant.base_url + UrlConstant.participant + ":id" + "/",
    (req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.json(
        )
      );
    }
  ),
  rest.post(
    "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/?page=2",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          {
            "count": 6,
            "next": null,
            "previous": "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/",
            "results": [
                {
                    "id": "054da230-c43f-494c-b107-d0b34b86e08d",
                    "user_id": "759f6af8-49ba-41c7-bfba-d0e232f039e0",
                    "organization_id": "9394faac-0910-4027-9e3d-cea8425f3cb3",
                    "organization": {
                        "org_email": "fghjk@fghj.com",
                        "org_description": "dfghjk",
                        "name": "SHRU. orggggg",
                        "logo": "/media/organizations/logos/ATI_ZePh7g6.png",
                        "address": {
                            "city": "",
                            "address": "chennai",
                            "country": "Jersey",
                            "pincode": "234567890"
                        },
                        "phone_number": "+91 34567-89222"
                    },
                    "user": {
                        "last_name": "ravi",
                        "first_name": "monikashruthi",
                        "email": "shruthichandran+2@digitalgreen.org",
                        "on_boarded_by": null
                    },
                    "created_at": "2023-06-20T04:48:23.719871Z",
                    "updated_at": "2023-06-20T04:50:18.862557Z",
                    "name": "paddy dataset",
                    "description": "nothing",
                    "category": {
                        "Periculture": [
                            "asdf"
                        ],
                        "sericulture": [
                            "add"
                        ],
                        "Horticulture": [
                            "GDHFDHGDFHGF"
                        ],
                        "subsistence and commercial": [
                            "dddd"
                        ]
                    },
                    "geography": {
                        "city": {
                            "name": "Bangalore Urban",
                            "latitude": "13.00000000",
                            "longitude": "77.58333000",
                            "stateCode": "KA",
                            "countryCode": "IN"
                        },
                        "state": {
                            "name": "Karnataka",
                            "isoCode": "KA",
                            "latitude": "15.31727750",
                            "longitude": "75.71388840",
                            "countryCode": "IN"
                        },
                        "country": {
                            "flag": "🇮🇳",
                            "name": "India",
                            "isoCode": "IN",
                            "currency": "INR",
                            "latitude": "20.00000000",
                            "longitude": "77.00000000",
                            "phonecode": "91",
                            "timezones": [
                                {
                                    "tzName": "Indian Standard Time",
                                    "zoneName": "Asia/Kolkata",
                                    "gmtOffset": 19800,
                                    "abbreviation": "IST",
                                    "gmtOffsetName": "UTC+05:30"
                                }
                            ]
                        }
                    },
                    "data_capture_start": null,
                    "data_capture_end": null,
                    "constantly_update": true,
                    "is_temp": false,
                    "user_map": "b73523b5-40f0-4435-8000-df71b431daeb"
                }
            ]
        }
        )
      );
    }
  ),

];
