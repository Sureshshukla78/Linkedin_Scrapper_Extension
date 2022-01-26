const config = require("../models/config");
const company = require("../models/company");
const companyAttributes = require("../models/company_details");
const People = require("../models/people");
const peopleAttributes = require("../models/people_details");

// defining function for validating url in different api routes
function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};
// defining function for validating email in different api routes

// TODO -> if not valid then ?
// function isValidEmail(string) {
//     var res = string.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
//     return (res !== null)
// };

// delay for 1 minute
function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

// retrieve data from config table, company table and send json
exports.configCompany = async (req, res) => {
    try {
        const getData = await config.find({});
        if (getData.length === 0) {
            res.status(200).json(null);
        } else {
            const getCompany = await company.find({ status: 'not_scraped' }).limit(10);
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

// 2nd api for saving company name and url and update config as well
exports.saveCompany = async (req, res) => {
    try {
        // guessing we are getting array of Object of companies url and name
        const companies = req.body.companies;
        console.log(req.body);
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
                res.status(500).json(`Error occured during saving company ${error}`);
            }
        }

        // updating single row of config collection
        const getData = await config.find({});
        if (getData.length === 0) {
            const newConfig = await new config({
                company_letter: req.body.letter,
                page: req.body.page,
            });
            const updateConfig = await newConfig.save();
        } else {
            getData[0].company_letter = req.body.letter,
            getData[0].page = req.body.page
            const updateConfig = await getData[0].save();
        }
        await delay(1000*40);
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json(`${error}`);
    }
}

// 3rd api for saving company attributes 
exports.companyDetails = async (req, res) => {
    try {
        details = req.body;
        console.log(details);
        for (let i = 0; i < details.length; i++) {
            if (details[i] != undefined) {
/**-------------we are using url of company to get the company id from company collections--------------------------------*/ 
                const getCompany = await company.findOne({ url: details[i].url });
                let id = getCompany._id;
                getCompany.status = "scraped";
                const updatedCompanyStatus = await getCompany.save();

/**-------------------------------Company other attributes added----------------------------------------*/ 
                const addDetails = await new companyAttributes({
                    description: details[i].description,
                    website: details[i].website,
                    domain: details[i].domain,
                    employeeSize: details[i].employeeSize,
                    followers: details[i].followers,
                    company_id: id,
                    headquarter: details[i].headquarter,
                });
                const detailsAdded = await addDetails.save();
                /** people should be object so that we can get url as well as name */
                // const requestPeople = details[i].people;
                // for (let i = 0; i < requestPeople.length; i++) {
                //     const addPeople = await new People({
                //         url: requestPeople[i]['url'],
                //         name: requestPeople[i]['name'],
                //         company_id: id,
                //     })
                //     const peopleAdded = await addPeople.save();
                // }   
            }
        }
        //----------------->processing converting backing to not_scraped------------------------------->
        // try {
        //     const getCompany = await company.findOne({ status: "processing" });
        //     getCompany.status = "not_scraped";
        //     const revertedStatus = await getCompany.save();
        // } catch (err) {
        //     console.log("error in reverting company status to not scraped from processing....")
        // }
        res.status(201).json(`Details added successfully, ${true}`)
    } catch (error) {
        res.status(500).json(`some error Occured ${error}`);
    }
}

// configPeople controller------------------------------------------------------------------------------
exports.configPeople = async (req, res) => {
    try {
        const getData = await config.find({});
        if (getData.length === 0) {
            res.status(200).json(null);
        } else {
            // checking people table for any people whose details is not scraped
            const getPeople = await People.find({ status: "not_scraped" }).limit(10);
            if (getPeople.length === 0) {
                // if we don't find any people whose status is not scraped then we send 5 company details  
                // whose people_status is 0.
                const getCompany = await company.find({ people_status: 0 }).limit(5);
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

// savePeople controller----------------------------------------------------------------------------
exports.savePeople = async (req, res) => {
    try {
        /**we are getting array of Object of people url and name also comapny_id which we sended 
         * through configPeople api*/
        const peoples = req.body.peoples;
        for (let i = 0; i < peoples.length; i++) {
            try {
                /** validating url and saving people---------------------------------->*/
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

/**peopleDetails controller---------------------------------------------------------------------------*/
exports.peopleDetails = async (req, res) => {
    details = req.body;
    console.log(details);
    try {
        for (let i = 0; i < details.length; i++) {
            if (details[i] != undefined) {
                /**converting status to scraped of people----------------------------------------------*/
                const getPeople = await People.find({ _id: details[i].people_id })
                getPeople[0]['status'] = "scraped";
                await getPeople[0].save();

                /**---------------People other attributes added----------------------------------------*/ 
                const addDetails = await new peopleAttributes({
                    email: details[i].email,
                    number: details[i].number,
                    position: details[i].position,
                    website_link: details[i].website,
                    experience: details[i].experi,
                    people_id: details[i].people_id,
                });
                const detailsAdded = await addDetails.save();
            }
        }
        /**processing converting backing to not_scraped------------------------------------------------*/
        try {
            const getPeople = await People.findOne({ status: "processing" });
            getPeople.status = "not_scraped";
            const revertedStatus = await getPeople.save();
        } catch (err) {
            console.log("error in reverting people status to not scraped from processing....")
        }
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json(`some error Occured ${error}`);
    }
}