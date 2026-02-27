import fs from fs
import https from https

const download = (url, dest) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(() => console.log('Download completed: ' + dest));
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { });
        console.error('Error downloading ' + dest + ': ' + err.message);
    });
};

// URL for Party Popper
const popUrl = 'https://www.myinstants.com/media/sounds/party-popper.mp3';
download(popUrl, 'public/audio/pop.mp3');
