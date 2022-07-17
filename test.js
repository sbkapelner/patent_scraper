const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
HttpsProxyAgent = require("https-proxy-agent");
const proxy = require("./proxy");

/*const myFunc = async () => {
    const data = fs.readFileSync('proxy.json', 'utf8');
    const PROXY = `https://${JSON.parse(data.toString()).IP}:${JSON.parse(data.toString()).PORT}`
    const proxyAgent = new HttpsProxyAgent(PROXY);

    const response = await axios.get('https://www.freepatentsonline.com/result.html?p=8&edit_alert=&srch=xprtsrch&query_txt=sheep+%26+grapee&uspat=on&usapp=on&eupat=on&jp=on&pct=on&depat=on&date_range=all&stemming=on&sort=relevance&search=Search', { agent: proxyAgent }).then((res) => {
        console.log(res);
    })
}

(async () => {
    const proxyAgent = new HttpsProxyAgent('http://206.189.198.72:7497');
    const response = await fetch('https://httpbin.org/ip?json', { agent: proxyAgent });
    const body = await response.text();
    console.log(body);
})();*/

const googleData = [["D807097"], ["EP3569685A1"], ["US11168291B2"]];

const fpoData = [
  ["D807097", "D674233", "DE102009006539A1"],
  ["D587511", "D534189", "JP3560595B2"],
  ["US11182052", "D675472", "US11086470"],
];

//console.log(fpoData[0].splice(2, 1));

const combinedData = [];

fpoData.map((currElement) => {
  currElement.forEach((subElement) => combinedData.push(subElement));
});

//if (!(id in tutorTimes)) { ... }

googleData.map((currElement) => {
  currElement.forEach((subElement) => {
    if (!combinedData.includes(subElement)) {
      combinedData.push(subElement);
    }
  });
});

console.log(combinedData);
