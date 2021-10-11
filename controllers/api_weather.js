import { getErrorObj, getObj } from "../utils/serverUtils.js";
import { getWeather } from "../utils/asyncUtils.js";
import {
  BAD_REQUEST_CODE,
  CITY_NAME_ERROR,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
} from "../sources/constants.js";

const processValidResponse = (res, msg, statusCode, degree) => {
  const obj = getObj(msg, degree);
  res.status(statusCode).send(obj);
};

const processErrorResponse = (res, msg, statusCode) => {
  const obj = getErrorObj(msg, statusCode);
  res.status(statusCode).send(obj);
};
export const handleApiRequest = async (req, res) => {
  const cityName = req.params.cityName;

  try {
    if (cityName) {
      const js = await getWeather(cityName);

      if (js.cod === `${NOT_FOUND_CODE}`) {
        processValidResponse(res, CITY_NAME_ERROR, NOT_FOUND_CODE);
      } else {
        processValidResponse(res, cityName, SUCCESS_CODE, js.main.temp);
      }
    } else {
      processErrorResponse(
        res,
        "Bad request, cityName missing!",
        BAD_REQUEST_CODE
      );
    }
  } catch (error) {
    processErrorResponse(res, "Something went wrong!", SERVER_ERROR_CODE);
  }
};
