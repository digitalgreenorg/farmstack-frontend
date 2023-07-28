import { rest } from "msw";
import UrlConstant from "../../Constants/UrlConstants";

const datasetViewResponse = {
  id: "73cab41a-49fe-4f86-ae4b-6f63876a3cb2",
  name: "abbusijke`",
  user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
  description: "nbcjdf",
  category: {
    cat: ["Livestock farming"],
  },
  geography: {
    city: {
      name: "Andkhoy",
      latitude: "36.95293000",
      longitude: "65.12376000",
      stateCode: "FYB",
      countryCode: "AF",
    },
    state: {
      name: "Faryab",
      isoCode: "FYB",
      latitude: "36.07956130",
      longitude: "64.90595500",
      countryCode: "AF",
    },
    country: {
      flag: "🇦🇫",
      name: "Afghanistan",
      isoCode: "AF",
      currency: "AFN",
      latitude: "33.00000000",
      longitude: "65.00000000",
      phonecode: "93",
      timezones: [
        {
          tzName: "Afghanistan Time",
          zoneName: "Asia/Kabul",
          gmtOffset: 16200,
          abbreviation: "AFT",
          gmtOffsetName: "UTC+04:30",
        },
      ],
    },
  },
  constantly_update: false,
  data_capture_start: "2023-03-11T18:30:00Z",
  data_capture_end: "2023-04-12T18:30:00Z",
  organization: {
    org_email: "sohit@digitalgreen.org",
    org_description: "kjhkhkhkhkj",
    name: "new org",
    logo: "https://datahubethdev.farmstack.co/media/organizations/logos/1653272245246.jpeg",
    phone_number: "+91 23423-42343",
    address: {
      city: "",
      address: "org address",
      country: "India",
      pincode: "1234565432",
    },
  },
  user: {
    id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
    first_name: "sohit",
    last_name: "kumar",
    email: "sohit@digitalgreen.org",
    on_boarded_by: null,
  },
  datasets: [
    {
      id: "63736bb3-3bf3-4f9f-9221-81e17e938538",
      content: [
        {
          add: "FName1",
          df: "LName1",
          PHONE_NUMBER: 1234567890,
          REGION: "Region1",
          WOREDA_x: "Woreda1",
          KEBELE_x: "Kebele1",
          WOREDA_y: "Woreda1",
          KEBELE_y: "Kebele1",
          LIVE_WEIGHT_x: 325,
          PREGNANCY_MTH_x: 1,
          MILK_VOLUMNE_x: 9,
          MILK_FAT: 4,
          MILK_PROTEIN: 2.6,
          LACTATION_STAGE_x: "Early lactation",
          HAY: 2.65,
          CORN: 0.0,
          WHEAT_BRAN: 4.5,
          LINSEED_CAKE: 2.69,
          FEED_COST: 283.25,
          MIFC_DAY: 22.75,
          RATION_PRICE: 28.79,
          FIRST_NAME_y: "FName1",
          LAST_NAME_y: "LName1",
          WOREDA_LDI: "Woreda1",
          KEBELE: "Kebele1",
          LIVE_WEIGHT_y: 325,
          PREGNANCY_MTH_y: 0,
          MILK_VOLUMNE_y: 5,
          LACTATION_STAGE_y: "Early lactation",
          None: "######",
          "None.1": "######",
        },
        {
          add: "FName1",
          df: "LName1",
          PHONE_NUMBER: 1234567890,
          REGION: "Region1",
          WOREDA_x: "Woreda1",
          KEBELE_x: "Kebele1",
          WOREDA_y: "Woreda1",
          KEBELE_y: "Kebele1",
          LIVE_WEIGHT_x: 325,
          PREGNANCY_MTH_x: 1,
          MILK_VOLUMNE_x: 9,
          MILK_FAT: 4,
          MILK_PROTEIN: 2.6,
          LACTATION_STAGE_x: "Early lactation",
          HAY: 2.65,
          CORN: 0.0,
          WHEAT_BRAN: 4.5,
          LINSEED_CAKE: 2.69,
          FEED_COST: 283.25,
          MIFC_DAY: 22.75,
          RATION_PRICE: 28.79,
          FIRST_NAME_y: "FName7",
          LAST_NAME_y: "LName7",
          WOREDA_LDI: "Woreda1",
          KEBELE: "Kebele1",
          LIVE_WEIGHT_y: 325,
          PREGNANCY_MTH_y: 0,
          MILK_VOLUMNE_y: 11,
          LACTATION_STAGE_y: "Early lactation",
          None: "######",
          "None.1": "######",
        },
      ],
      file: "protected/datasets/abbusijke`/file/PXD_Connector_1_standerdise_2_standerdise_standerdise.csv",
      source: "file",
      file_size: 339995,
      accessibility: "private",
      standardised_file:
        "protected/datasets/abbusijke`/file/PXD_Connector_1_standerdise_2_standerdise_standerdise.csv",
      standardisation_config: {
        FIRST_NAME_x: {
          masked: false,
          mapped_to: "add",
          mapped_category: "White Revolution",
        },
      },
      usage_policy: [],
    },
    {
      id: "2b6e08fc-b19a-4fe5-8ea0-e51e4b253d84",
      content: [
        {
          farm: 1,
          name: "######",
          None: "######",
        },
        {
          farm: 2,
          name: "######",
          None: "######",
        },
      ],
      file: "protected/datasets/abbusijke`/postgresql/abhi_standerdise.xls",
      source: "postgresql",
      file_size: 9728,
      accessibility: "public",
      standardised_file:
        "protected/datasets/abbusijke`/postgresql/abhi_standerdise.xls",
      standardisation_config: {
        id: {
          masked: false,
          mapped_to: "farm",
          mapped_category: "White Revolution",
        },
        name: {
          masked: true,
        },
      },
      usage_policy: [],
    },
    {
      id: "14e13e98-8c79-4ad2-8030-fe1bbe5f244d",
      content: [],
      file: "protected/datasets/abbusijke`/live_api/sampleapi.json",
      source: "live_api",
      file_size: 4423,
      accessibility: "public",
      standardised_file:
        "protected/datasets/abbusijke`/live_api/sampleapi.json",
      standardisation_config: {},
      usage_policy: [],
    },
    {
      id: "f7d1cc4b-4eca-491c-aaa4-a243a3191799",
      content: [],
      file: "protected/datasets/abbusijke`/mysql/sometable.xls",
      source: "mysql",
      file_size: 5632,
      accessibility: "public",
      standardised_file: "protected/datasets/abbusijke`/mysql/sometable.xls",
      standardisation_config: {},
      usage_policy: [],
    },
  ],
};
export const datasetHandler = [
  rest.post(
    UrlConstant.base_url + UrlConstant.dataset_list,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          count: 12,
          next: "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/?page=2",
          previous: null,
          results: [
            {
              id: "5328fcbe-665f-46b4-846a-d8032b6e86d1",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-07-11T14:13:03.536067Z",
              updated_at: "2023-07-18T04:35:52.157756Z",
              name: "test1",
              description: "test description",
              category: {},
              geography: {},
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
            {
              id: "d19370cc-ef11-422d-9404-7c9ab9ab6116",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-06-09T10:06:05.131004Z",
              updated_at: "2023-06-09T10:07:52.497909Z",
              name: "aewsdzxgvaesrdzfxgv",
              description:
                "esrdzfgxcvaerszdfgxvaersdzfxgcbaesrzdfxgcvserdzfxgcvsexdrfxgcvsexdrfxgcvsexdr.ƒð©cvaeszrds.ð©cvaesrzsdxgvaewrzsdzgxvaezrds.ð©cv as ubszrdjkfxbvjkbaszjdbfjkcbajwzsebdjfbcajkzesbdfjkbcawbeszjdzfbjkcbasezjdbfjkcb",
              category: {},
              geography: {},
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
            {
              id: "3f6509e8-a9d2-4839-8878-f174640f8339",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-05-03T05:47:36.308567Z",
              updated_at: "2023-06-09T09:53:33.633430Z",
              name: "ssjdfb",
              description:
                "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less                                                                                                                               \n                                                 ble content of a page when looking at its layout. The point of using Lorem Ipsum is that it has\npage when",
              category: {
                "subsistence and commercial": ["ffff"],
              },
              geography: {
                country: {
                  flag: "🇧🇦",
                  name: "Bosnia and Herzegovina",
                  isoCode: "BA",
                  currency: "BAM",
                  latitude: "44.00000000",
                  longitude: "18.00000000",
                  phonecode: "387",
                  timezones: [
                    {
                      tzName: "Central European Time",
                      zoneName: "Europe/Sarajevo",
                      gmtOffset: 3600,
                      abbreviation: "CET",
                      gmtOffsetName: "UTC+01:00",
                    },
                  ],
                },
              },
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
            {
              id: "7a4742f3-bff7-4612-99f8-027f56a029ff",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-04-24T09:13:13.888082Z",
              updated_at: "2023-06-08T10:00:34.765075Z",
              name: "sohit",
              description: "sohit description",
              category: {
                Agriculture: ["Crop farming"],
                sericulture: ["add"],
                Horticulture: ["GDHFDHGDFHGF"],
                "Farm management": [
                  "Farm planning and design",
                  "Farm operations and maintenance",
                ],
                Horticultureeee: ["chilli"],
              },
              geography: {
                city: {
                  name: "Alipur",
                  latitude: "28.79862000",
                  longitude: "77.13314000",
                  stateCode: "DL",
                  countryCode: "IN",
                },
                state: {
                  name: "Delhi",
                  isoCode: "DL",
                  latitude: "28.70405920",
                  longitude: "77.10249020",
                  countryCode: "IN",
                },
                country: {
                  flag: "🇮🇳",
                  name: "India",
                  isoCode: "IN",
                  currency: "INR",
                  latitude: "20.00000000",
                  longitude: "77.00000000",
                  phonecode: "91",
                  timezones: [
                    {
                      tzName: "Indian Standard Time",
                      zoneName: "Asia/Kolkata",
                      gmtOffset: 19800,
                      abbreviation: "IST",
                      gmtOffsetName: "UTC+05:30",
                    },
                  ],
                },
              },
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
            {
              id: "73cab41a-49fe-4f86-ae4b-6f63876a3cb2",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-05-01T11:04:37.974495Z",
              updated_at: "2023-05-03T05:01:20.770828Z",
              name: "abbusijke`",
              description: "nbcjdf",
              category: {
                cat: ["Livestock farming"],
              },
              geography: {
                city: {
                  name: "Andkhoy",
                  latitude: "36.95293000",
                  longitude: "65.12376000",
                  stateCode: "FYB",
                  countryCode: "AF",
                },
                state: {
                  name: "Faryab",
                  isoCode: "FYB",
                  latitude: "36.07956130",
                  longitude: "64.90595500",
                  countryCode: "AF",
                },
                country: {
                  flag: "🇦🇫",
                  name: "Afghanistan",
                  isoCode: "AF",
                  currency: "AFN",
                  latitude: "33.00000000",
                  longitude: "65.00000000",
                  phonecode: "93",
                  timezones: [
                    {
                      tzName: "Afghanistan Time",
                      zoneName: "Asia/Kabul",
                      gmtOffset: 16200,
                      abbreviation: "AFT",
                      gmtOffsetName: "UTC+04:30",
                    },
                  ],
                },
              },
              data_capture_start: "2023-03-11T18:30:00Z",
              data_capture_end: "2023-04-12T18:30:00Z",
              constantly_update: false,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
          ],
        })
      );
    }
  ),
  rest.post(
    UrlConstant.base_url + UrlConstant.datasetview_guest,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          count: 12,
          next: "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/?page=2",
          previous: null,
          results: [
            {
              id: "5328fcbe-665f-46b4-846a-d8032b6e86d1",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-07-11T14:13:03.536067Z",
              updated_at: "2023-07-18T04:35:52.157756Z",
              name: "test1",
              description: "test description",
              category: {},
              geography: {},
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
            {
              id: "d19370cc-ef11-422d-9404-7c9ab9ab6116",
              user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
              organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
              organization: {
                org_email: "sohit@digitalgreen.org",
                org_description: "kjhkhkhkhkj",
                name: "new org",
                logo: "/media/organizations/logos/1653272245246.jpeg",
                address: {
                  city: "",
                  address: "org address",
                  country: "India",
                  pincode: "1234565432",
                },
                phone_number: "+91 23423-42343",
              },
              user: {
                last_name: "kumar",
                first_name: "sohit",
                email: "sohit@digitalgreen.org",
                on_boarded_by: null,
              },
              created_at: "2023-06-09T10:06:05.131004Z",
              updated_at: "2023-06-09T10:07:52.497909Z",
              name: "aewsdzxgvaesrdzfxgv",
              description:
                "esrdzfgxcvaerszdfgxvaersdzfxgcbaesrzdfxgcvserdzfxgcvsexdrfxgcvsexdrfxgcvsexdr.ƒð©cvaeszrds.ð©cvaesrzsdxgvaewrzsdzgxvaezrds.ð©cv as ubszrdjkfxbvjkbaszjdbfjkcbajwzsebdjfbcajkzesbdfjkbcawbeszjdzfbjkcbasezjdbfjkcb",
              category: {},
              geography: {},
              data_capture_start: null,
              data_capture_end: null,
              constantly_update: true,
              is_temp: false,
              user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
            },
          ],
        })
      );
    }
  ),
  rest.get(
    UrlConstant.base_url + UrlConstant.microsite_category,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ dsagffas: ["some"], test: [], test2: [], asas: [] })
      );
    }
  ),
  rest.get(
    UrlConstant.base_url + UrlConstant.add_category_edit_category,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ dsagffas: ["some"], test: [], test2: [], asas: [] })
      );
    }
  ),
  rest.get(
    UrlConstant.base_url + UrlConstant.datasetview + ":id" + "/",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(datasetViewResponse));
    }
  ),
  rest.get(
    UrlConstant.base_url + UrlConstant.datasetview__guest + ":id" + "/",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(datasetViewResponse));
    }
  ),
  rest.delete(
    UrlConstant.base_url + UrlConstant.delete_dataset + ":id" + "/",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(datasetViewResponse));
    }
  ),
];
