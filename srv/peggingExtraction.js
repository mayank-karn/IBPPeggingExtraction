"use strict"
const cds = require("@sap/cds");

const extractData = require('./util/extractPeggingData')

module.exports = cds.service.impl(async (srv) => {
    srv.on("getData", extractData.extractDataFromAPI);

    srv.on("insertBulkPeggingData", async (req) => {
        const BATCH_SIZE = 2000;
        const peggingRecords = req.data.peggingdata;
        const { PeggingData } = srv.entities;
        const tx = cds.transaction(req);
        try {
            for (let i = 0; i < peggingRecords.length; i += BATCH_SIZE) {
                const chunk = peggingRecords.slice(i, i + BATCH_SIZE);
                await tx.run(
                    INSERT.into(PeggingData).entries(chunk)
                );
            }
            return `Inserted ${peggingRecords} successfully`
        }

        catch(e) {
            req.error(400, JSON.stringify(e))
        }
    })
})