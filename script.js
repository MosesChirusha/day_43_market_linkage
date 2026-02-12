import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAGkCFYyAYElCnWO0lYQ0fpQrfYAi76hwQ",
  authDomain: "day42-34b2a.firebaseapp.com",
  projectId: "day42-34b2a",
  storageBucket: "day42-34b2a.firebasestorage.app",
  messagingSenderId: "67342457243",
  appId: "1:67342457243:web:747cda45b4ebc8c438e93e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const listRef = collection(db, "listings");

const listingsDiv = document.getElementById("listings");


// ✅ ADD LISTING

window.addListing = async function () {

  const farmer = document.getElementById("farmer").value.trim();
  const produce = document.getElementById("produce").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const location = document.getElementById("location").value.trim();

  if (!farmer || !produce || !quantity) {
    alert("Please fill farmer, produce and quantity");
    return;
  }

  try {

    await addDoc(listRef, {
      farmer: farmer || "",
      produce: produce || "",
      quantity: quantity || "",
      location: location || "",
      created: Date.now()
    });

    document.getElementById("farmer").value = "";
    document.getElementById("produce").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("location").value = "";

    alert("Listing published");

  } catch (err) {
    console.error("Write failed:", err);
    alert(err.message);
  }
};


// ✅ LIVE LISTINGS VIEW

const q = query(listRef, orderBy("created", "desc"));

onSnapshot(q, (snapshot) => {

  listingsDiv.innerHTML = "";

  snapshot.forEach(doc => {

    const d = doc.data();

    const div = document.createElement("div");
    div.className = "listing";

    div.innerHTML =
      "<b>" + d.produce + "</b> — " +
      d.quantity +
      "<br>Farmer: " + d.farmer +
      "<br>Location: " + (d.location || "N/A");

    listingsDiv.appendChild(div);

  });

});
