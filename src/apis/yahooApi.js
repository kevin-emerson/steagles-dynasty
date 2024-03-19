export default function YahooApi() {
    const clientId = import.meta.env.VITE_YAHOO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_YAHOO_REDIRECT_URI;

    fetch(`https://api.login.yahoo.com/oauth2/request_auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`, {
        mode: 'no-cors',
        // mode: 'cors',
        // crossorigin: true,
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
        .then(response => {
            console.log('response: ' + JSON.stringify(response))
            response.json().then();
        });
}
