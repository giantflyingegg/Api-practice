async function lookupPostcode() {
    //get postcode from input field
    const postcode = document.getElementById('postcode').value;

    //api call
    try {
        const response = await fetch(`https://api-practice-pixw.onrender.com/api/postcode?postcode=${postcode}`);
        const data = await response.json();

        //extract data from response
        const region = data.result.region;
        const pfa = data.result.pfa;
        const latitude = data.result.latitude;
        const longitude = data.result.longitude;

        //target output fields
        document.getElementById('regResult').value = region || '';
        document.getElementById('pfaResult').value = pfa || '';
        document.getElementById('latResult').value = latitude || '';
        document.getElementById('lonResult').value = longitude || '';
    } 
        //catch errors
        catch (error) {
        console.error('Error fetching postcode data', error);
        }
}
