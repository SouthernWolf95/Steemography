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

    let userName = "southernwolf"
    if (document.getElementById("name").value != "") {
        userName = document.getElementById("name").value
    }
    console.log(userName)
    let userTrx = JSON.parse(Get("https://api.steemjs.com/get_account_history?account=" + userName + "&from=" + blockNum + "&limit=0"))[0][1].trx_id

    document.getElementById("userName").innerHTML = ": @" + userName
    console.log(userName + userTrx)

    return userTrx
}

function createBarFlag(option) {

    let transaction_id = getBlockID()

    if (option == "user") {
        transaction_id = getLastUserTransactionID()
    }

    //var transaction_id = "9e0134924a6a8924835bdbc681e75c8e24196f9c" //First Transaction_id
    //var transaction_id = "a5b90d2706ce0d93677095f7850afd3d5b409bae" //Second Tranaction_id
    //var transaction_id = "61ea1bed563c6fddaf4b4af861204f39160ead4a" //Vest Transaction_Id
    //var transaction_id = "8ee88cb2e4d8d789f02c6e991d11582fbd1fcf73" //Post + upvote?
    //var transaction_id = "aecd6c9a88b8f4923857987a99953a3011f44501" //Just post (unused in post)
    //var transaction_id = "83c894bbe2fff4f0388e35c05859eda3e2326629" // Block Transaction Test
    let background_color = [transaction_id.slice(0, 6), transaction_id.slice(6, 12), transaction_id.slice(12, 18), transaction_id.slice(18, 24), transaction_id.slice(24, 30), transaction_id.slice(30, 36), transaction_id.slice(36, 39)]
    let char_identifier = transaction_id.slice(39).toUpperCase()
    document.getElementById("one").style = "background-color: #" + background_color[0] + ""
    document.getElementById("two").style = "background-color: #" + background_color[1] + ""
    document.getElementById("three").style = "background-color: #" + background_color[2] + ""
    document.getElementById("four").style = "background-color: #" + background_color[3] + ""
    document.getElementById("five").style = "background-color: #" + background_color[4] + ""
    document.getElementById("six").style = "background-color: #" + background_color[5] + ""
    document.getElementById("seven").style = "background-color: #" + background_color[6] + ""
    document.getElementById("char").innerHTML = char_identifier
    //document.getElementById("id").innerHTML = transaction_id
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
        console.log(loopCheck)
        await sleep(3000);
    }
    console.log(loopCheck)
    document.getElementById("enable").classList.remove("hidden")
    document.getElementById("disable").classList.add("hidden")
}



//loopUpdate()
//createBarFlag()