let trafficData = {};
let chart;
let showTop10 = false;

const getTrafficArray = () =>
  Object.entries(trafficData).map(([country, visits]) => ({
    name: country,
    visits,
  }));

const updateStats = async () => {
  const res = await fetch("/countries/visited");
  trafficData = await res.json();
  console.log(trafficData);
  const totalVisits = Object.values(trafficData).reduce((a, b) => a + b, 0);
  const [topCountry, count] = Object.entries(trafficData).sort(
    (a, b) => b[1] - a[1]
  )[0] || ["None", 0];

  document.getElementById("totalVisits").textContent =
    totalVisits.toLocaleString();
  document.getElementById(
    "topCountry"
  ).textContent = `${topCountry} (${count.toLocaleString()})`;
};

const createChart = (data) => {
  const ctx = document.getElementById("trafficChart").getContext("2d");
  if (chart) chart.destroy();

  const displayData = showTop10 ? data.slice(0, 10) : data;

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: displayData.map((item) => item.name),
      datasets: [
        {
          label: "Visitors",
          data: displayData.map((item) => item.visits),
          backgroundColor: "rgba(25, 118, 210, 0.6)",
          borderColor: "rgba(25, 118, 210, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(25, 118, 210, 0.8)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Visitors",
            font: { weight: "bold" },
          },
        },
        x: {
          title: { display: true, text: "Countries", font: { weight: "bold" } },
          ticks: { maxRotation: 45, minRotation: 45 },
        },
      },
      plugins: {
        legend: { display: true, position: "top" },
        title: {
          display: true,
          text: "Website Traffic by Country (Last 30 Days)",
          font: { size: 16, weight: "bold" },
        },
      },
    },
  });
};

function sortData(order) {
  const sorted = getTrafficArray().sort((a, b) =>
    order === "asc" ? a.visits - b.visits : b.visits - a.visits
  );
  createChart(sorted);
}

function toggleTopCountries() {
  showTop10 = !showTop10;
  createChart(getTrafficArray());
}

const getUserLocation = async () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        resolve(null);
      }
    );
  });
};

const network_strength = () => {
  if ("connection" in navigator) {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    document.getElementById("network").innerText =
      "Network Strength : " + connection.effectiveType;
  }
};

const runAnalysis = async () => {
  try {
    network_strength();
    let location = await getUserLocation();
    let geoRes = await fetch("/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location || { latitude: 0, longitude: 0 }),
    });

    let geoData = await geoRes.json();
    const country = geoData.country || "none";

    document.getElementById(
      "user"
    ).innerText = `Current user : ${geoData.ip} | Country : ${geoData.country} | City : ${geoData.city}`;

    let trafficRes = await fetch("/countries/visited", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });

    trafficData = await trafficRes.json();

    updateStats();
    createChart(getTrafficArray());
  } catch (err) {
    console.error("Error in runAnalysis:", err.message);
  }
};

//start point
runAnalysis();

//updates
setInterval(() => {
  network_strength();
  updateStats();
}, 10000);
