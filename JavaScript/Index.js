const vagas = document.querySelectorAll('.vaga');
const tabelaReservas = document.getElementById('reservas');



// Verifique se há reservas anteriores no localStorage e recupere-as
const reservasAnteriores = JSON.parse(localStorage.getItem('reservas')) || [];

// Função para adicionar uma reserva ao localStorage e à tabela
function adicionarReserva(vagaIndex) {
    const dataHora = new Date(); // Obtém a data e hora atuais
    const dia = dataHora.toLocaleDateString();
    const hora = dataHora.toLocaleTimeString();

    // Crie um objeto com os detalhes da reserva
    const reserva = {
        vaga: `Vaga ${vagaIndex + 1}`,
        data: dia,
        hora: hora,
    };

    // Adicione a reserva ao array de reservas e ao localStorage
    reservasAnteriores.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservasAnteriores));

    // Crie uma nova linha na tabela de reservas
    const newRow = tabelaReservas.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = reserva.vaga;
    cell2.innerHTML = reserva.data;
    cell3.innerHTML = reserva.hora;
}

// Verifique se há vagas ocupadas previamente e atualize o estado das vagas
vagas.forEach((vaga, index) => {
    const reservaAnterior = reservasAnteriores.find(reserva => reserva.vaga === `Vaga ${index + 1}`);
    
    if (reservaAnterior) {
        vaga.classList.remove('livre');
        vaga.classList.add('ocupada');
    }

    vaga.addEventListener('click', () => {
        if (vaga.classList.contains('livre')) {
            vaga.classList.remove('livre');
            vaga.classList.add('ocupada');
            adicionarReserva(index);
        } else {
            document.getElementById('info').innerHTML = 'Esta vaga já está ocupada.';
        }
    });
});


// Função para carregar as reservas do localStorage e exibi-las na tabela
function carregarReservas() {
    const reservasAnteriores = JSON.parse(localStorage.getItem('reservas')) || [];

    reservasAnteriores.forEach((reserva) => {
        const newRow = tabelaReservas.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.innerHTML = reserva.vaga;
        cell2.innerHTML = reserva.data;
        cell3.innerHTML = reserva.hora;
    });
}

// Chame a função para carregar as reservas assim que a página for carregada
window.addEventListener('load', carregarReservas);

function resetarReservas() {
    tabelaReservas.innerHTML = ''; // Limpa a tabela
    localStorage.removeItem('reservas'); // Remove os dados do localStorage

    // Torna todas as vagas livres
    vagas.forEach((vaga) => {
        vaga.classList.remove('ocupada');
        vaga.classList.add('livre');
    });
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetarReservas);

