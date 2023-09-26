const parkingTable = document.getElementById("parking-table");
const reservationList = document.getElementById("reservation-list");

// Simulação de vagas de estacionamento
const parkingStatus = [
    "free", "free", "free", "free", "free", "free",
    "occupied", "free", "occupied", "free", "occupied", "free"
];

// Inicialização da tabela de estacionamento
for (let i = 0; i < parkingStatus.length; i++) {
    const cell = document.createElement("td");
    cell.className = parkingStatus[i];
    cell.addEventListener("click", () => reserveParkingSpot(i));
    parkingTable.rows[Math.floor(i / 6)].appendChild(cell);
}

// Função para reservar uma vaga
function reserveParkingSpot(index) {
    if (parkingStatus[index] === "free") {
        parkingStatus[index] = "occupied";
        parkingTable.rows[Math.floor(index / 6)].cells[index % 6].className = "occupied";
        const reservationTime = new Date().toLocaleTimeString();
        const reservationInfo = document.createElement("li");
        reservationInfo.textContent = `Vaga ${index + 1} reservada às ${reservationTime}`;
        reservationList.appendChild(reservationInfo);
    }
}
