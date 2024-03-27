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
export const getTeams = async (token) => {
    return fetch(`${baseUrl}/teams`, {
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
