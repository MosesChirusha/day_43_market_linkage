const STORAGE_KEY = "market_listings_v1";

function getListings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveListings(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function addListing() {
  const farmer = farmerInput("farmer");
  const phone = farmerInput("phone");
  const location = farmerInput("location");
  const crop = farmerInput("crop");
  const quantity = farmerInput("quantity");
  const price = farmerInput("price");

  if (!farmer || !phone || !location || !crop || !quantity || !price) {
    alert("Fill all fields");
    return;
  }

  const listing = {
    id: Date.now(),
    farmer,
    phone,
    location,
    crop,
    quantity,
    price,
    date: new Date().toLocaleDateString()
  };

  const listings = getListings();
  listings.unshift(listing);
  saveListings(listings);

  clearForm();
  renderListings();
}

function farmerInput(id) {
  return document.getElementById(id).value.trim();
}

function clearForm() {
  ["farmer","phone","location","crop","quantity","price"]
    .forEach(id => document.getElementById(id).value = "");
}

function deleteListing(id) {
  const list = getListings().filter(l => l.id !== id);
  saveListings(list);
  renderListings();
}

function renderListings() {
  const container = document.getElementById("listings");
  const search = document.getElementById("search").value.toLowerCase();
  const filterCrop = document.getElementById("filterCrop").value;

  let listings = getListings();

  listings = listings.filter(l => {
    const matchSearch =
      l.crop.toLowerCase().includes(search) ||
      l.location.toLowerCase().includes(search);

    const matchCrop = !filterCrop || l.crop === filterCrop;

    return matchSearch && matchCrop;
  });

  container.innerHTML = listings.map(l => `
    <div class="listing">
      <strong>${l.crop}</strong> — ${l.quantity} kg
      <div class="meta">
        Farmer: ${l.farmer}<br>
        Location: ${l.location}<br>
        Price: ${l.price} per kg<br>
        Contact: ${l.phone}<br>
        Posted: ${l.date}
      </div>
      <button class="deleteBtn" onclick="deleteListing(${l.id})">
        Remove
      </button>
    </div>
  `).join("");
}

renderListings();
