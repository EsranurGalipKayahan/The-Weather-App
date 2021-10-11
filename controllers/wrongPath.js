import { ERROR_PAGE, NOT_FOUND_CODE } from "../sources/constants.js";
export const handleErrorPage = (req, res) => {
  res.status(NOT_FOUND_CODE);
  res.render("errorPage", { title: ERROR_PAGE });
};
