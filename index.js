const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////
// Files

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn)
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log("Error!")

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log("Your file has been written!")
//             })
//         });
//     });
// });
// console.log("Will read file!")

////////////////////////////
// Server
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%ProductName%}/g, product.productName); // regx
    output = output.replace(/{%Image%}/g, product.image);
    output = output.replace(/{%Quantity%}/g, product.quantity);
    output = output.replace(/{%Price%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%From%}/g, product.from);
    output = output.replace(/{%Nutrients%}/g, product.nutrients);
    output = output.replace(/{%Descriptions%}/g, product.description);
    if(!product.organic) {
        output = output.replace(/{%Not_Organic%}/g, 'not-organic');
    }
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// each time a new request hits the server, the callback function is called
// e.g. a request can be accessing the ip:port on browser
const server = http.createServer((req, res) => {
    // Routing
    const pathName = req.url;

    // Overview Page
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html', // the browser is now expecting json
        });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(''); // make it string
        const output = tempOverview.replace('{%Product_Cards%}', cardsHtml);
        res.end(output);

    // Product Page
    } else if(pathName === '/product') {
        res.end('This is the PRODUCT');
    
    // API
    } else if(pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json', // the browser is now expecting json
        });
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html', // the browser is now expecting html
            'my-own-header': 'angela-created'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

