const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");

route.get("/", (req,res)=>{
    res.send("hello from the other side");
});
/**
 * @description company-config Route
 * @method GET/
 */
route.get("/api/ask-company-config", controller.configCompany);
/**
 * @description company Route
 * @method POST/
 */
route.post("/api/save-company", controller.saveCompany);
/**
 * @description company_details Route
 * @method POST/
 */
route.post("/api/save-CompanyDetails", controller.companyDetails);


/**
 * @description people-config Route
 * @method GET/
 */
 route.get("/api/ask-people-config", controller.configPeople);
 /**
  * @description people Route
  * @method POST/
  */
 route.post("/api/save-people", controller.savePeople);
 /**
  * @description people_details Route
  * @method POST/
  */
 route.post("/api/save-peopleDetails", controller.peopleDetails);

module.exports = route;