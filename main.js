const Token = config.MY_TOKEN;
const Device = config.MY_DEVICE_ID


window.onSpotifyWebPlaybackSDKReady = () => {
    const token = config.MY_TOKEN;
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
            cb(token);
        }
    });

    // Error handling
    player.addListener('initialization_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('account_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('playback_error', ({
        message
    }) => {
        console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state);
    });

    // Ready
    player.addListener('ready', ({
        device_id
    }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({
        device_id
    }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
};

//new test
const play = ({
    spotify_uri,
    playerInstance: {
        _options: {
            getOAuthToken,
            id
        }
    }
}) => {
    getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${Device}`, {
            method: 'PUT',
            body: JSON.stringify({
                uris: ['1fOIkbQO1zU1rO3GLIGJBH']
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
            },
        });
    });
};

play({
    playerInstance: new Spotify.Player({
        name: "New Dek"
    }),
    spotify_uri: 'spotify:track:1fOIkbQO1zU1rO3GLIGJBH',
});