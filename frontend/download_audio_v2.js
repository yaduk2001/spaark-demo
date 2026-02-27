import fs from "fs"
import https from "https"

const download = (url, dest) => {
    const file = fs.createWriteStream(dest);
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };

    https.get(url, options, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
            download(response.headers.location, dest);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close(() => console.log('Download completed: ' + dest));
        });
    }).on('error', (err) => {
        console.error('Error downloading ' + dest + ': ' + err.message);
    });
};

download('https://www.soundjay.com/misc/sounds/party-horn-1.mp3', 'public/audio/pop.mp3');
download('https://www.myinstants.com/media/sounds/party-popper.mp3', 'public/audio/pop_real.mp3');
download('https://www.soundjay.com/human/sounds/applause-01.mp3', 'public/audio/clap.mp3');
download('https://www.soundjay.com/misc/sounds/fireworks-01.mp3', 'public/audio/burst.mp3');
