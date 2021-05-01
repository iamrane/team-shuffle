export function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function splitTeams(players, nrOfPlayersPerTeam) {
    const teams = [];
    let nrOfTeams = Math.floor(players.length / nrOfPlayersPerTeam);
    let bench = shuffle([...players]);

    while (nrOfTeams > 0) {
        teams.push(bench.splice(0, Math.floor(nrOfPlayersPerTeam)))
        nrOfTeams--;
    }

    return [ teams, bench ];
}