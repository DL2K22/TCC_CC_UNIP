const vagas = document.querySelectorAll('.vaga');
const tabelaReservas = document.getElementById('reservas');

function randomizarStatusVagas() {
    vagas.forEach((vaga) => {
        const randomStatus = Math.random() < 0.5 ? 'livre' : 'ocupada';
        vaga.classList.remove('livre', 'ocupada');
        vaga.classList.add(randomStatus);
    });

    // Limpe a tabela de reservas ao randomizar as vagas
    tabelaReservas.innerHTML = '';
}

// Chame a função para randomizar as vagas quando a página carregar
window.addEventListener('load', randomizarStatusVagas);

vagas.forEach((vaga, index) => {
    vaga.addEventListener('click', () => {
        if (vaga.classList.contains('livre')) {
            vaga.classList.remove('livre');
            vaga.classList.add('ocupada');
            const dataHora = new Date();
            const dia = dataHora.toLocaleDateString();
            const hora = dataHora.toLocaleTimeString();

            // Crie uma nova linha na tabela de reservas
            const newRow = tabelaReservas.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            cell1.innerHTML = `Vaga ${index + 1}`;
            cell2.innerHTML = dia;
            cell3.innerHTML = hora;
            document.getElementById('info').innerHTML = `Vaga ${index + 1} reservada em ${dia}`;
            alert("A reserva foi definida.");
        } else {
            document.getElementById('info').innerHTML = 'Esta vaga já está ocupada.';
            alert("Vaga já ocupada.");
        }
    });
});
