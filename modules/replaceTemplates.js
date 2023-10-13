module.exports = (temp, product) => {
    let output = temp.replace(/{%ProductName%}/g, product.productName); // regx
    output = output.replace(/{%Image%}/g, product.image);
    output = output.replace(/{%Quantity%}/g, product.quantity);
    output = output.replace(/{%Price%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%From%}/g, product.from);
    output = output.replace(/{%Nutrients%}/g, product.nutrients);
    output = output.replace(/{%Descriptions%}/g, product.description);
    output = output.replace(/{%Slug%}/g, product.slug);
    if(!product.organic) {
        output = output.replace(/{%Not_Organic%}/g, 'not-organic');
    }
    return output;
}