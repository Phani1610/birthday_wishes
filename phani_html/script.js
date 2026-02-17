// Array to hold trips, loaded from localStorage
let trips = JSON.parse(localStorage.getItem('trips')) || [];

// Function to save trips to localStorage
function saveTrips() {
    localStorage.setItem('trips', JSON.stringify(trips));
}

// Handle trip creation form submission
document.getElementById('tripForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const seats = document.getElementById('seats').value;
    const cost = document.getElementById('cost').value;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const contactNumber = document.getElementById('contactNumber').value;

    const trip = {
        id: Date.now(),
        origin,
        destination,
        date,
        seats: parseInt(seats),
        cost: parseInt(cost),
        vehicleNumber,
        vehicleType,
        contactNumber
    };

    trips.push(trip);
    saveTrips();
    alert('Trip created successfully!');
    document.getElementById('tripForm').reset();
});

// Function to search and display trips
function searchTrips() {
    const searchDest = document.getElementById('searchDest').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const filteredTrips = trips.filter(trip => trip.destination.toLowerCase().includes(searchDest));

    if (filteredTrips.length === 0) {
        resultsDiv.innerHTML = '<p>No trips found.</p>';
        return;
    }

    filteredTrips.forEach(trip => {
        const tripDiv = document.createElement('div');
        tripDiv.className = 'trip';
        tripDiv.innerHTML = `
            <p><strong>Origin:</strong> ${trip.origin}</p>
            <p><strong>Destination:</strong> ${trip.destination}</p>
            <p><strong>Date & Time:</strong> ${new Date(trip.date).toLocaleString()}</p>
            <p><strong>Seats Available:</strong> ${trip.seats}</p>
            <p><strong>Cost per Seat:</strong> ₹${trip.cost}</p>
            <p><strong>Vehicle:</strong> ${trip.vehicleType} (${trip.vehicleNumber})</p>
            <p><strong>Contact:</strong> ${trip.contactNumber}</p>
            <button onclick="bookTrip(${trip.id})" class="btn btn-primary">Book Trip</button>
        `;
        resultsDiv.appendChild(tripDiv);
    });
}

// Function to book a trip (show payment page)
function bookTrip(tripId) {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('searchPage').classList.add('hidden');
    document.getElementById('paymentPage').classList.remove('hidden');

    const summaryDiv = document.getElementById('tripSummary');
    summaryDiv.innerHTML = `
        <p><strong>Origin:</strong> ${trip.origin}</p>
        <p><strong>Destination:</strong> ${trip.destination}</p>
        <p><strong>Date & Time:</strong> ${new Date(trip.date).toLocaleString()}</p>
        <p><strong>Cost per Seat:</strong> ₹${trip.cost}</p>
        <p><strong>Total Amount:</strong> ₹${trip.cost}</p>
    `;

    document.getElementById('amount').value = trip.cost;
}

// Handle payment form submission
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const txnId = document.getElementById('txnId').value;

    alert(`Payment confirmed via ${paymentMethod}. Transaction ID: ${txnId || 'N/A'}`);
    document.getElementById('paymentForm').reset();
    document.getElementById('paymentPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('searchPage').classList.remove('hidden');
});

// Load trips on page load
window.onload = function() {
    // Optionally display all trips initially, but for now, only on search
};
