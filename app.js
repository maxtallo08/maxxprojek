document.addEventListener('DOMContentLoaded', () => {
    const tournamentForm = document.getElementById('tournamentForm');
    const tournamentList = document.getElementById('tournamentList');

    function loadTournaments() {
        const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
        tournamentList.innerHTML = '';
        tournaments.forEach((tournament, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${tournament.name} - ${new Date(tournament.date).toLocaleDateString()}
                <span>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </span>
            `;
            tournamentList.appendChild(li);
        });
    }

    function addTournament(name, date) {
        const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
        tournaments.push({ name, date });
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        loadTournaments();
    }

    function updateTournament(index, name, date) {
        const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
        tournaments[index] = { name, date };
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        loadTournaments();
    }

    function deleteTournament(index) {
        const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
        tournaments.splice(index, 1);
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        loadTournaments();
    }

    tournamentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const index = tournamentForm.getAttribute('data-index');

        if (index) {
            updateTournament(index, name, date);
            tournamentForm.removeAttribute('data-index');
        } else {
            addTournament(name, date);
        }

        tournamentForm.reset();
    });

    tournamentList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
            const tournament = tournaments[index];

            document.getElementById('name').value = tournament.name;
            document.getElementById('date').value = tournament.date;
            tournamentForm.setAttribute('data-index', index);
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            deleteTournament(index);
        }
    });

    loadTournaments();
});
