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
export const getLeagueData = async (token, league) => {
    return fetch(`${baseUrl}/league?leagueId=${league}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// TODO create middleware to add auth headers to every call
export const getLeagueTeams = async (token, league, numTeams) => {
    return fetch(`${baseUrl}/league/teams?leagueId=${league}&numTeams=${numTeams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// TODO create middleware to add auth headers to every call
export const getFreeAgents = async (token, league) => {
    return fetch(`${baseUrl}/players/free-agents?leagueId=${league}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
