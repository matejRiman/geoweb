
const url_add_records = "https://services5.arcgis.com/UbiPR9eAyIWvC8EM/ArcGIS/rest/services/sportoviste_MSK_2024_kuk064/FeatureServer/0/addFeatures"

let form = document.forms["data-form"];
form.addEventListener("submit", getValues);

//Potřebujeme pracvoat také s tlačítkem pro odeslání
submitButton = document.getElementById("button-submit")
console.log(submitButton)


function getValues(event) {
    event.preventDefault();

    let data = {
        "name": this.nazev.value,
        "adresa": this.adresa.value,
        "url": this.url.value,
        "typ": this.typS.value,
        "long": this.inputLong.value,
        "lat": this.inputLat.value
    }

    console.log(data)

    //https://digitalfox-tutorials.com/tutorial.php?title=How-to-get-the-values-from-a-form-with-JavaScript

    const featureToUpdate = {
        "geometry": {
            "x": data.long,
            "y": data.lat
        },
        "attributes": {
            "Nazev_zarizeni": data.name,
            "More_info": data.url,
            "Adresa": data.adresa,
            "Sporty": data.typ,
            "image": "/img/fotbal.jpg",
            "Long": data.long,
            "Lat": data.lat,
        }
    };

    console.log(featureToUpdate)

    const jsonStringData = JSON.stringify(featureToUpdate);

    //odeslani do DB
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("features", [jsonStringData]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };


    const fetchDataAwait = async () => {
        try {
            const response = await fetch(url_add_records, requestOptions)

            if (response.ok) {
                console.log("Data byla úspěšně odeslána!");

                //Vyzkoušejte, že po odeslání se zmení popis tlačítka na pár sekund
                submitButton.innerText = "Odesláno"

                //Vycisteni polí formuláře
                form.reset();

            } else {
                console.log("Něco se nepovedlo!");
            }


        } catch (error) {
            console.log(error)
        }
    }

    fetchDataAwait()



}

