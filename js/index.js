async function lookupPostcode() {
    const postcode = document.getElementById('postcode').value;
    try {
      const response = await fetch(`https://api-practice-pixw.onrender.com/api/postcode?postcode=${postcode}`);
      const data = await response.json();
      const { region, pfa, latitude, longitude } = data.result;
      document.getElementById('regResult').textContent = region;
      document.getElementById('pfaResult').textContent = pfa;
      document.getElementById('latResult').textContent = latitude;
      document.getElementById('lonResult').textContent = longitude;
  
      // Fetch crime data
      const date = '2023-01'; // Set this to the date you want to query
      const crimeResponse = await fetch(`https://api-practice-pixw.onrender.com/api/crime?date=${date}&lat=${latitude}&lng=${longitude}`);
      const crimeData = await crimeResponse.json();
      displayCrimes(crimeData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
  function displayCrimes(crimes) {
    const container = document.getElementById('crimeData');
    container.innerHTML = ''; // Clear previous results
    crimes.forEach(crime => {
      const div = document.createElement('div');
      div.textContent = `${crime.category}: ${crime.location_type} at ${crime.location.street.name}`;
      container.appendChild(div);
    });
  }