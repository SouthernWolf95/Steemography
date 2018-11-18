var bar = new ProgressBar.Circle(container, {
    strokeWidth: 20,
    easing: 'linear',
    duration: 3000,
    color: '#5f00de',
    trailColor: '#fff',
    trailWidth: 1,
    svgStyle: null
  });

function Get(yourUrl) {
    let Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function getBlockID() {

    let blockNum = JSON.parse(Get("https://api.steemjs.com/get_dynamic_global_properties")).head_block_number

    let jsonID = JSON.parse(Get("https://api.steemjs.com/get_block?blockNum=" + blockNum + "")).block_id

    document.getElementById("userName").innerHTML = " Block: " + blockNum

    return jsonID
}

function getLastUserTransactionID() {
    let jsonBlock = JSON.parse(Get("https://api.steemjs.com/get_dynamic_global_properties"))
    let blockNum = jsonBlock.head_block_number

    let userName = "steem"
    if (document.getElementById("name").value != "") {
        userName = document.getElementById("name").value
    }

    let userTrx = JSON.parse(Get("https://api.steemjs.com/get_account_history?account=" + userName + "&from=" + blockNum + "&limit=0"))[0][1].trx_id

    let i = 0

    while (userTrx == "0000000000000000000000000000000000000000") {
        userTrx = JSON.parse(Get("https://api.steemjs.com/get_account_history?account=" + userName + "&from=" + blockNum + "&limit=" + i + ""))[0][1].trx_id
        i++
    }


    document.getElementById("userName").innerHTML = "@" + userName

    return userTrx
}

function createBarFlag(option) {

    let transaction_id = getBlockID()

    if (option == "user") {
        transaction_id = getLastUserTransactionID()
    }

    let background_color = [transaction_id.slice(0, 6), transaction_id.slice(6, 12), transaction_id.slice(12, 18), transaction_id.slice(18, 24), transaction_id.slice(24, 30), transaction_id.slice(30, 36), transaction_id.slice(36, 39)]
    let char_identifier = transaction_id.slice(39).toUpperCase()
    document.getElementById("one").style = "fill: #" + background_color[0] + ""
    document.getElementById("two").style = "fill: #" + background_color[1] + ""
    document.getElementById("three").style = "fill: #" + background_color[2] + ""
    document.getElementById("four").style = "fill: #" + background_color[3] + ""
    document.getElementById("five").style = "fill: #" + background_color[4] + ""
    document.getElementById("six").style = "fill: #" + background_color[5] + ""
    document.getElementById("seven").style = "fill: #" + background_color[6] + ""
    document.getElementById("char").innerHTML = char_identifier

    createPNG()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var loopCheck = false

async function loopUpdate(option) {
    loopCheck = true

    if (loopCheck == true) {
        document.getElementById("enable").classList.add("hidden")
        document.getElementById("disable").classList.remove("hidden")
    }

    while (loopCheck == true) {
        createBarFlag()
        bar.animate(1.0)
        await sleep(3000);
        bar.set(0.0)
    }
    document.getElementById("enable").classList.remove("hidden")
    document.getElementById("disable").classList.add("hidden")
}

function createPNG() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let mainsvg = document.getElementById('mainsvg');
    let data = mainsvg.innerHTML;
    let DOMURL = self.URL || self.webkitURL || self;
    let img = new Image();
    let svg = new Blob([data], {
        type: "image/svg+xml;charset=utf-8"
    });
    let url = DOMURL.createObjectURL(svg);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
    };
    img.src = url;
}