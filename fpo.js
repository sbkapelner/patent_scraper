const cheerio = require('cheerio');
const axios = require('axios');
const proxy = require('./proxy');
const fs = require('fs');

const input = 'sheep & grapee';
const pages = 10;

const createUrl = (input, page) => {
    const baseUrl = `https://www.freepatentsonline.com/result.html?p=${page + 1}&edit_alert=&srch=xprtsrch&query_txt=`;
    const encodedInput = encodeURIComponent(input);
    const encodedInputRegex = encodedInput.replace(/%20/g, '+');
    const searchParam = '&uspat=on&usapp=on&eupat=on&jp=on&pct=on&depat=on&date_range=all&stemming=on&sort=relevance&search=Search';
    return baseUrl + encodedInputRegex + searchParam;
}

const runAxios = async (url) => {
    const data = fs.readFileSync('proxy.json', 'utf8');
    const response = axios.get(url, {
    }).then((res) => {
        const $ = cheerio.load(res.data);
        $("[width='15%']").each((i, element) => {
            if (i != 0) { console.log($(element).text()); }
        })
    })
        .catch(err => console.log(err));
}

const mainFunction = async () => {
    await proxy.updateProxy();

    let page = 0;
    while (page < pages) {
        await runAxios(createUrl(input, page));
        page++;
    }
};

mainFunction();