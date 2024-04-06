import {YahooClient} from "./YahooClient";

export const getUsersTeams = async (token) => {
    return YahooClient.get('/user/teams', token)
}

export const getLeagueData = async (token, leagueId, gameKey) => {
    return YahooClient.get(`/league?leagueId=${leagueId}&gameKey=${gameKey}`, token)
}

export const getLeagueTeams = async (token, leagueId, gameKey, numTeams) => {
    return YahooClient.get(`/league/teams?leagueId=${leagueId}&gameKey=${gameKey}&numTeams=${numTeams}`, token)
}

export const getFreeAgents = async (token, leagueId, gameKey) => {
    return YahooClient.get(`/players/free-agents?leagueId=${leagueId}&gameKey=${gameKey}`, token)
}
