const fs = require('fs');
HttpsProxyAgent = require('https-proxy-agent');
const proxy = require('./proxy');

const input = 'wine maker';
const pages = 1;

const createQueryString = (input, page) => {
    if (page == 0) {
        const queryString = 'q=' + input.replace(/\s/g, '+') + '&oq=' + input.replace(/\s/g, '+');
        return (queryString);
    } else {
        const queryString = 'q=' + input.replace(/\s/g, '+') + '&oq=' + input.replace(/\s/g, '+') + `&page=${page}`;
        return (queryString);
    }

}

const runFetch = async (i, page) => {
    const encodedString = encodeURIComponent(createQueryString(input, page));
    const data = fs.readFileSync('proxy.json', 'utf8');
    const proxy = `https://${JSON.parse(data.toString()).TIMESTAMP}:${JSON.parse(data.toString()).PORT}`
    const proxyAgent = new HttpsProxyAgent(proxy);

    await fetch('https://patents.google.com/xhr/query?' + 'url=' + encodedString, { agent: proxyAgent }).then((res) => res.json())
        .then((data) => { console.log(data.results.cluster[0].result[i].id.match(/\/(.*?)\//)[1]) })
        .catch(err => console.log(err));
}

const mainFunction = async () => {
    await proxy.updateProxy();

    let page = 0;
    while (page < pages) {
        for (let i = 0; i < 10; i++) {
            await runFetch(i, page);
        };
        page++;
    }
}

mainFunction();