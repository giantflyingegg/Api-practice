async function lookupPostcode() {
  // Target inputs
  const postcode = document.getElementById('postcode').value;
  const dateSelection = document.getElementById('dateSelector').value;

  try {
    const response = await fetch(`https://api-practice-pixw.onrender.com/api/postcode?postcode=${postcode}`);
    const data = await response.json();
    const { region, pfa, latitude, longitude } = data.result;
    document.getElementById('regResult').textContent = region;
    document.getElementById('pfaResult').textContent = pfa;
    document.getElementById('latResult').textContent = latitude;
    document.getElementById('lonResult').textContent = longitude;

    // Fetch crime data
    const date = dateSelection; 
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
    if (crime.location && crime.location.street && crime.outcome_status) {
      const div = document.createElement('div');
      div.textContent = `${crime.month} ${crime.category}: ${crime.location.street.name} resulting in: ${crime.outcome_status.category} on ${crime.outcome_status.date}`;
      container.appendChild(div);
    } else {
      console.error('Incomplete crime data:', crime);
    }
  });
}
