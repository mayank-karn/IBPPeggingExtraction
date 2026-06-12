"use strict";
const axios = require('axios')
const cds = require('@sap/cds');
const cloudSDK = require("@sap-cloud-sdk/core");
const { log } = require('@sap/cds');
async function extractDataFromAPI(req) {
    if (!req.data.startDate || !req.data.endDate) {
        return req.error({
            code: "400",
            message: "Please provide both startDate and endDate",
        });
    }
    console.log("calling CSRF token");
    /**Direct Call */
    let url = process.env.csrfURL //'https://my313050.scmibp1.ondemand.com/sap/opu/odata4/ibp/api_transactional_snpsht/srvd_a2x/ibp/api_transactional_snpsht/0001/IBPTransaclSnapshot?$top=1'
    let client_credentials = btoa(process.env.username + ':' + process.env.password) //btoa('PEGGING_EXTRACTION' + ':' + 'XpK+wdcf)pg3r8NRfuam&h8wTUKzu~3(AGEo/luB');
    // console.log(client_credentials)
    let basicAuth = 'Basic ' + client_credentials;
    const csrf = await axios.get(url, {
        headers: {
            'Authorization': basicAuth,
            'Accept': 'application/json',
            'config_packageName': 'SAPIBPSnapshotService',
            'x-csrf-token': 'fetch'
        }
    });
    console.log(`-------------- CSRF ------------------`)
    console.log(csrf)
    console.log(`-------------- CSRF ------------------`)
    const csrfToken = csrf.headers['x-csrf-token']
    const cookie = csrf.headers['set-cookie']
    // const uuid = csrf.data.value[0].IBPTransaclSnpshtUUID
    url = process.env.createSnapURL
    console.log(`csrf token:${csrfToken}`)
    console.log(`Cookie:,${cookie}`)
    let createSnapshot
    const snapshotId = "Snapshot_" + Math.random().toString(36).substring(2, 10);
    try {
        createSnapshot = await axios.post(url,
            {
                IBPTransaclSnpshtDesc: "Detailed Pegging in PLANNINGAREA VERSION",
                IBPTransaclSnpshtID: snapshotId,
                PlanningAreaID: "ANSOBPPAGC",
                VersionID: "__BASELINE",
                _IBPDetldPggngSnpshtFilter: {
                    _IBPDetPggngPrimDmndDTpFilter: [
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "PO_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "PR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "PO_RE_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STO_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STO_RE_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "SD_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "DEL_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "INHPLANORD"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "PRODORD"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STOCK"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "FCST"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "PLO_NO_SOS"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "DSTR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "VRDEM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STOODELITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "POIDELITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STOIDELITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "STUBSTORD"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "LOAD_REQ"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "LD_STR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "LD_PR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "SPR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "LD_SPR_ITM"
                        },
                        {
                            "Operator": "EQ",
                            "PrimaryDemandDocTypeValueFrom": "SPO_ITM"
                        }
                    ],
                    _IBPDetPggngUnpSplIsSplFltr: [
                        { "Operator": "EQ", "UnpeggedSupplyIsSplit": true }
                    ],
                    _IBPDetPggngPeggingLvlFltr: [
                        { "Operator": "LT", "PeggingLevelValueFrom": 6 }
                    ],
                    _IBPDetPggngPrimDmndRTFltr: [
                        {
                            "Operator": "BT",
                            "PrimaryDemandReqdTimeValueFrom": req.data.startDate,
                            "PrimaryDemandReqdTimeValueTo": req.data.endDate
                        }
                    ]
                }
            },
            {
                headers: {
                    'x-csrf-token': csrfToken,
                    'Cookie': cookie
                }
            });
    } catch (error) {

        if (error.response) {
            // Server responded with a status code outside 2xx
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
            console.error("Error headers:", error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.request);
        } else {
            // Something else happened
            console.error("Error setting up request:", error.message);
        }
    }


    console.log(`-------------- Create Snapshot --------------------`)
    console.log(createSnapshot)
    console.log(`-------------- Create Snapshot --------------------`)


    /**
     * Activate Snapshot
     */
    const uuid = createSnapshot.data.IBPTransaclSnpshtUUID
    const snapID = createSnapshot.data.IBPTransaclSnpshtID
    console.log(`uuid: ${uuid}`);
    console.log(`snapId: ${snapID}`)
    url = process.env.activateURL + uuid + ")/SAP__self.CalculateSnapshot"
    console.log(url)
    let activateSnapshot
    try {
        activateSnapshot = await axios.post(url, {},
            {
                headers: {
                    'x-csrf-token': csrfToken,
                    'Cookie': cookie
                }
            }
        )
    } catch (error) {
        if (error.response) {
            // Server responded with a status code outside 2xx
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
            console.error("Error headers:", error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.request);
        } else {
            // Something else happened
            console.error("Error setting up request:", error.message);
        }
    }
    console.log("----------------- Activate Snapshot---------------")
    console.log(activateSnapshot)
    console.log("----------------- Activate Snapshot---------------")

    /**
     * Get data
     */

    url = process.env.extractionURL + snapID
    const ibpData = await axios.get(url, {
        headers: {
            'Cookie': cookie
        }
    }
    )
    console.log(ibpData)
    return {
        "response": ibpData.data
    }
}

module.exports = {
    extractDataFromAPI
}