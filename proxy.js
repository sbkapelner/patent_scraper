const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let getProxy = () => {
    let ip_addresses = [];
    let port_numbers = [];

    const test = request("https://sslproxies.org/", function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $("td:nth-child(1)").each(function (index, value) {
                ip_addresses[index] = $(this).text();
            });

            $("td:nth-child(2)").each(function (index, value) {
                port_numbers[index] = $(this).text();
            });
        } else {
            console.log("Error loading proxy, please try again");
        }

        ip_addresses.join(", ");
        port_numbers.join(", ");

        const randAddress = Math.floor(Math.random() * ip_addresses.length);

        const randPort = Math.floor(Math.random() * port_numbers.length);

        const data = {
            "TIMESTAMP": Date.now(),
            "IP": ip_addresses[randAddress],
            "PORT": port_numbers[randPort]
        };

        const dataString = JSON.stringify(data);

        fs.writeFile('.proxy.json', dataString, (err) => {
            if (err) {
                throw err;
            }
            console.log("Proxy has been updated.");
        });
    })

}

updateProxy = async () => {
    try {
        const data = fs.readFileSync('.proxy.json', 'utf8');
        if (Date.now() - JSON.parse(data.toString()).TIMESTAMP > 1000) {
            getProxy();
        };
    }
    catch (err) {
        getProxy();
    }

}
//updateProxy();
exports.updateProxy = updateProxy;
