import { logger } from "../../libs/logger";
import { post } from "../use-cases";
const path = require("path");
const fs = require("fs");
const baseUrl = '/api/v1';
const filePath = `${process.cwd()}/db/users.json`;


const getEP = (req, res) => {
    try {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({ error: 'Error reading user data' });
            }
            return res.status(200).json({ data })
        })
    } catch (error) {

    }
};

const postEP = (req, res) => {
    try {
        const results = post({ params: req.body });

        fs.readFile(filePath, 'utf8', (readErr, data) => {
            if (readErr) {
                logger.error(readErr);
                return res.status(500).json({ error: 'Error reading user data' });
            }
            if (data) {
                let jsonData = data ? JSON.parse(data) : [];
                let filteredData = jsonData.filter((user) => user.name === results.name).length;
                if (filteredData >= 1) {
                    return res.status(409).json({ error: 'Name already exits' });
                }
                jsonData = [...jsonData, results]
                console.log(jsonData)
                fs.writeFile(filePath, JSON.stringify(jsonData), (writeErr) => {
                    if (writeErr) {
                        logger.error(writeErr);
                        return res.status(500).json({ error: 'Error writing user data' });
                    }

                    res.json('Successfully created');

                })
            } else {
                fs.writeFile(filePath, JSON.stringify([results]), (writeErr) => {
                    if (writeErr) {
                        logger.error(writeErr);
                        return res.status(500).json({ error: 'Error writing user data' });
                    }

                    res.json('Successfully created');

                })
            }


        });

    } catch (error) {
        console.log(error)
        logger.error(error);
    }
};



const routes = [
    { path: `${baseUrl}/`, method: 'get', component: getEP },
    { path: `${baseUrl}/`, method: 'post', component: postEP }
]

export { routes }; 