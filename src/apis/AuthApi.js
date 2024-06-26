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
