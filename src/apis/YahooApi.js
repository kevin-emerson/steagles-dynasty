const baseUrl = import.meta.env.VITE_STEAGLES_API_BASE_URL

export const getAuthUrl = () => {
    fetch(`${baseUrl}/auth/url`, {
        method: 'GET',
    }).then(res => {
        return res.json();
    }).then(data => {
        window.location = data.url
    });
}

export const getAccessToken = async (code) => {
    return fetch(`${baseUrl}/auth/token?code=${code}`, {
        method: 'GET',
    })
}

// TODO create middleware to add auth headers to every call
export const getUsersTeams = async (token) => {
    return fetch(`${baseUrl}/user/teams`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// TODO create middleware to add auth headers to every call
export const getLeagueData = async (token, leagueId, gameKey) => {
    return fetch(`${baseUrl}/league?leagueId=${leagueId}&gameKey=${gameKey}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// TODO create middleware to add auth headers to every call
export const getLeagueTeams = async (token, leagueId, gameKey, numTeams) => {
    return fetch(`${baseUrl}/league/teams?leagueId=${leagueId}&gameKey=${gameKey}&numTeams=${numTeams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// TODO create middleware to add auth headers to every call
export const getFreeAgents = async (token, leagueId, gameKey) => {
    return fetch(`${baseUrl}/players/free-agents?leagueId=${leagueId}&gameKey=${gameKey}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// export const getMockData = async () => {
//     return fetch(``)
// }