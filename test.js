const cheerio = require('cheerio');
const axios = require('axios')

const response = axios.get('https://www.freepatentsonline.com/result.html?p=8&edit_alert=&srch=xprtsrch&query_txt=sheep+%26+grapee&uspat=on&usapp=on&eupat=on&jp=on&pct=on&depat=on&date_range=all&stemming=on&sort=relevance&search=Search').then((res) => {
    const $ = cheerio.load(res.data);
    $("[width='15%']").each((i, element) => {
        if (i != 0) { console.log($(element).text()); }
    })
})