// TODO add env var for steagles-api and replace localhost once deployed

export const getAuthUrl = () => {
    fetch('http://localhost:3000/auth/url', {
        method: 'GET',
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data.url);
        window.location = data.url
    });
}

export const getAccessToken = (code) => {
    fetch(`http://localhost:3000/auth/token?code=${code}`, {
        method: 'get',
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
    });
}
