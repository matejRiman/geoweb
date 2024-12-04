//Load data
var data_url = "https://services5.arcgis.com/UbiPR9eAyIWvC8EM/ArcGIS/rest/services/sportoviste_MSK_2024_kuk064/FeatureServer/0/query"

var myHeader = new Headers()
myHeader.append("Content-Type", "application/x-www-form-urlencoded")

var urlencoded = new URLSearchParams()
urlencoded.append("f", "JSON")
urlencoded.append("where", "1=1")
urlencoded.append("outfields", "*")

var options = {
    method : "POST",
    headers : myHeader,
    body: urlencoded,
    redirect: "follow"
}


const zaznamyDIV = document.getElementById("zaznamy")

const data = fetchData(data_url,options).then(async function (result) {

   // console.log(result)

    result.forEach(element => {
        console.log(element.attributes)

        var nazev = element.attributes.Nazev_zarizeni
        var adresa = element.attributes.Adresa
        var infolink = element.attributes.More_info
        var obr = element.attributes.image

        const divFeatureCol = document.createElement("div")

        divFeatureCol.innerHTML =
        `<div class="feature col">
            <div class="feature-icon">
            <img src="${obr}" class="img-fluid"> 
        </div>
        <h2>${nazev}</h2>
        <p>${adresa}</p>
        <a href="${infolink}" class="icon-link">
        Odkaz na vice informaci...
        </a>
        </div>` 

        console.log(divFeatureCol)

        zaznamyDIV.appendChild(divFeatureCol)

    });


})



