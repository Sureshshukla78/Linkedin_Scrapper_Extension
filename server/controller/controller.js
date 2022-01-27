const config = require("../models/config");
const company = require("../models/company");
const companyDetails = require("../models/company_details");
const People = require("../models/people");
const peopleDetails = require("../models/people_details");

// defining function for validating url in different api routes
function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

// setting foriegn key 
company.hasMany(companyDetails, {as: "company_details", foreignKey:"company_id"});
companyDetails.belongsTo(company, {as: "companies", foreignKey: "company_id"});

// 
// retrieve data from config table, company table and send json
exports.configCompany = async (req, res) => {
    try {
        const getData = await config.findAll({ raw: true });
        console.log(getData);
        if (getData.length === 0) {
            res.status(200).json(null);
        } else {
            console.log("inside else condition getting company");
            const getCompany = await company.findAll({ limit: 10, where: { status: 'not_scraped' } });
            // console.log(getCompany);
            if (getCompany.length === 0) {
                res.status(200).json(getData);
            } else {
                res.status(201).json(getCompany);
                for (let i = 0; i < getCompany.length; i++) {
                    getCompany[i]['status'] = 'processing';
                    await getCompany[i].save();
                }
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// 2nd api
exports.saveCompany = async (req, res) => {
    try {
        console.log(req.body);
        // guessing we are getting array of Object of companies url and name
        const companies = req.body.companies;
        for (let i = 0; i < companies.length; i++) {
            try {
                // validating url
                if (isValidURL(companies[i]['url'])) {
                    const addCompany = await new company({
                        url: companies[i]['url'],
                        name: companies[i]['name']
                    });
                    const saveCompany = await addCompany.save();
                }
            } catch (error) {
                res.status(500).json(`Error shlud be unique for every company:  ${error}`);
            }
        }
        console.log("companies added successfully")

        // updating single row of config collection
        const getData = await config.findAll();
        if (getData.length === 0) {
            const newConfig = await new config({
                company_letter: req.body.letter,
                page_no: req.body.page,
            });
            const updateConfig = await newConfig.save();
        } else {
            getData[0]['company_letter'] = req.body.letter,
                getData[0]['page_no'] = req.body.page
            const updateConfig = await getData[0].save();
            // console.log(updateConfig);
        }
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json(error);
    }
}

// 3rd api
exports.companyDetails = async (req, res) => {
    try {
        //we are using url of company to get the company id from company collections
        details = req.body;
        console.log(details);
        for (let i = 0; i < details.length; i++) {
            if (details[i] != undefined) {
                try {
                    const getCompany = await company.findOne({ where: { url: details[i].url } });
                    let id = getCompany.id;
                    getCompany.status = "scraped";
                    const updatedCompanyStatus = await getCompany.save();

                    /***  company other attributes added*/
                    const addDetails = await new companyDetails({
                        description: details[i].description,
                        website: details[i].website,
                        domain: details[i].domain,
                        employeeSize: details[i].employeeSize,
                        followers: details[i].followers,
                        company_id: id,
                        headquarter: details[i].headquarter,
                    });
                    const detailsAdded = await addDetails.save();

                    /** people should be array of object so that we can get url as well as name */
                    const requestPeople = details[i].people;
                    // have to test this
                    if (requestPeople.length != 0) {
                        for (let i = 0; i < requestPeople.length; i++) {
                            try {
                                const addPeople = await new People({
                                    url: requestPeople[i]['url'],
                                    name: requestPeople[i]['name'],
                                    company_id: id,
                                })
                                const peopleAdded = await addPeople.save();
                            } catch (error) {
                                res.status(500).json(`some error Occured during saving peoples ${error}`);
                            }
                        }
                    }
                } catch (error) {
                    res.status(500).json(`some error Occured during saving company details ${error}`);
                }

            }
        }
        res.status(201).json(`Details added successfully, ${true}`)
    } catch (error) {
        res.status(500).json(`some error Occured in getting request ${error}`);
    }
}

// peoples apis ->
// 1. config api
exports.configPeople = async (req, res) => {
    try {
        const getData = await config.findAll({ raw: true });
        if (getData.length === 0) {
            res.status(200).json(null);
        } else {
            // checking people table for any people whose details is not scraped
            const getPeople = await People.findAll({ limit: 10, where: { status: "not_scraped" } });
            if (getPeople.length === 0) {
                // if we don't find any people whose status is not scraped then we send 5 company details whose 
                // people_status is 0 
                const getCompany = await company.findAll({ limit: 5, where: { people_status: 0 } });
                // TODO got bug -> if no people left as well as no company left then what we will send    
                res.status(200).json(getCompany);
                // changing people_status to 1 means visited once in company table
                for (let i = 0; i < getCompany.length; i++) {
                    getCompany[i]['people_status'] = 1;
                    await getCompany[i].save();
                }
            } else {
                res.status(201).json(getPeople);
                for (let i = 0; i < getPeople.length; i++) {
                    getPeople[i]['status'] = "processing";
                    await getPeople[i].save();
                }
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// 2. saving people api 
exports.savePeople = async (req, res) => {
    // if server send company array of Object for configPeople then client should call savePeople api for 
    //  send company id, people-> URL, name
    try {
        // guessing we are getting array of Object of people url and name also comapny_id which we sended
        // through configPeople api
        const peoples = req.body.peoples;
        for (let i = 0; i < peoples.length; i++) {
            try {
                // validating url
                if (isValidURL(peoples[i]['url'])) {
                    const addPeople = await new People({
                        url: peoples[i]['url'],
                        name: peoples[i]['name'],
                        company_id: peoples[i]['company_id']
                    });
                    const savePeople = await addPeople.save();
                }
            } catch (error) {
                res.status(500).json(`Error occured during saving people ${error}`);
            }
        }
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json(error);
    }
}

// 3rd api for saving people attributes 
exports.peopleDetails = async (req, res) => {
    try {
        // peoples id is already sended to client they have to sent that id too
        detailsPeople = req.body;
        // console.log(detailsPeople);
        for (let i = 0; i < detailsPeople.length; i++) {
            if (detailsPeople[i] != undefined) {
                try {
                    const getPeople = await People.findAll({ where: { id: detailsPeople[i].people_id } })
                    getPeople[0]['status'] = "scraped";
                    await getPeople[0].save();
                    /***
                     * People other attributes added
                     */
                    const addDetails = await new peopleDetails({
                        email: detailsPeople[i].email,
                        number: detailsPeople[i].number,
                        position: detailsPeople[i].position,
                        website_link: detailsPeople[i].website,
                        experience: detailsPeople[i].experi,
                        people_id: detailsPeople[i].people_id,
                    });
                    const detailsAdded = await addDetails.save();
                } catch (error) {
                    res.status(500).json(`Error occured in saving people details: ${error}`)
                }
            }
        }
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json(`some error Occured ${error}`);
    }
}