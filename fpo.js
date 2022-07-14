const cheerio = require('cheerio');
const axios = require('axios');
const proxy = require('./proxy');
const fs = require('fs');
HttpsProxyAgent = require('https-proxy-agent');

const input = 'beer & maker';
const pages = 10;

const createUrl = (input, page) => {
    const baseUrl = `https://www.freepatentsonline.com/result.html?p=${page + 1}&edit_alert=&srch=xprtsrch&query_txt=`;
    const encodedInput = encodeURIComponent(input);
    const encodedInputRegex = encodedInput.replace(/%20/g, '+');
    const searchParam = '&uspat=on&usapp=on&eupat=on&jp=on&pct=on&depat=on&date_range=all&stemming=on&sort=relevance&search=Search';
    return baseUrl + encodedInputRegex + searchParam;
}

const runAxios = async (url) => {
    const data = fs.readFileSync('.proxy.json', 'utf8');
    const proxy = `https://${JSON.parse(data.toString()).IP}:${JSON.parse(data.toString()).PORT}`
    const proxyAgent = new HttpsProxyAgent(proxy);

    const response = axios.get(url, {
        agent: proxyAgent
    });

    const dataToReturn = response.then((res) => {

        const $ = cheerio.load(res.data);

        const arr = [];

        const fpoData = $("[width='15%']").each((i, element) => {
            if (i != 0) {
                const textToParse = ($(element).text()).replaceAll('/', '');

                if (/[a-zA-Z]/.test(textToParse) == false) {

                    let regex = /[^A-Za-z0-9]+/;
                    arr.push(('US' + textToParse).replace('      ', '').replace('\n', '').replace('    ', ""));
                }
                else {
                    arr.push(textToParse.replace('      ', '').replace('\n', '').replace('    ', ""));
                }


            }
        })
        //console.log(arr);
        return arr;
    })
        .catch(err => console.log(err));
    return dataToReturn;
}

const mainFunction = async () => {
    await proxy.updateProxy();

    let page = 0;
    while (page < pages) {
        FPO = await runAxios(createUrl(input, page));
        console.log(FPO);
        page++;
    }
};

mainFunction();