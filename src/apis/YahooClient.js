export const YahooClient = {
    get
};

const baseUrl = import.meta.env.VITE_STEAGLES_API_BASE_URL

function get(path, token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return fetch(`${baseUrl}${path}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
