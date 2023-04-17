import HTTPService from "../../Services/HTTPService";
import { isValidNumber } from "libphonenumber-js";

// export async function logIn(
//   method,
//   url,
//   payload,
//   isFormData,
//   isAuthorization,
//   jwttoken,
//   withCredentials
// ) {
//   try {
//     let response = await
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function SubmitData(
//   method,
//   url,
//   payload,
//   isFormData,
//   isAuthorization,
//   jwttoken,
//   withCredentials
// ) {
//   try {
//     return await HTTPService(
//       method,
//       url,
//       payload,
//       isFormData,
//       isAuthorization,
//       jwttoken,
//       withCredentials
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

export const isPhoneValid = (phone, country) => {
  try {
    const phoneNumber = isValidNumber(phone, country);
    return phoneNumber;
  } catch (error) {
    return false;
  }
};
