export function calculateTotal(obj) {
    let total = 0;

    obj.forEach(element => {
        total += element.price
    });

    return total;
}

export function getPrices(obj) {
    let prices = 0

    obj.forEach(element => {
        prices += element.price
    })

    return prices;
}

export function getPricesArray(obj) {
    let prices = [];
    obj.forEach(element => {
        prices.push(element.price)
    })

    return prices
}

export function getNamesArray(obj) {
    let names = [];
    obj.forEach(element => {
        names.push(element.name)
    })

    return names
}