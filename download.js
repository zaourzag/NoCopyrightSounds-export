const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function readURLsFromFile(filePath) {
    try {
        const jsonData = await fs.promises.readFile(filePath, 'utf-8');
        const urls = JSON.parse(jsonData).map(entry => entry.url);
        return urls;
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

function getFileNameFromHeaders(response) {
    const contentDispositionHeader = response.headers['content-disposition'];
    if (contentDispositionHeader) {
        const matches = contentDispositionHeader.match(/filename="([^"]+)"/);
        if (matches && matches.length > 1) {
            return matches[1];
        }
    }
    return null;
}

async function downloadURL(urlObj, logFile) {
    try {
        const response = await axios.get(urlObj, { responseType: 'stream' });
        const fileName = getFileNameFromHeaders(response) || `download_${Date.now()}.mp3`;
        const folderPath = path.join(__dirname, 'songs');
        await fs.promises.mkdir(folderPath, { recursive: true });
        const filePath = path.join(folderPath, fileName);
        
        // Check if URL already exists in log
        const logData = await fs.promises.readFile(logFile, { encoding: 'utf-8' }).catch(() => '[]');
        const downloadedURLs = JSON.parse(logData);

        if (downloadedURLs.includes(urlObj)) {
            console.log(`Song with name ${fileName} already downloaded.`);
            return;
        }

        const fileStream = fs.createWriteStream(filePath);
        response.data.pipe(fileStream);
        await new Promise((resolve, reject) => {
            fileStream.on('finish', async () => {
                downloadedURLs.push(urlObj);
                await fs.promises.writeFile(logFile, JSON.stringify(downloadedURLs, null, 2));
                resolve();
            });
            fileStream.on('error', reject);
        });
        console.log(`Downloaded song with name ${fileName}`);
    } catch (error) {
        console.error(`Error downloading URL ${urlObj}:`, error.message);
    }
}
async function downloadURLs(urls, logFile, concurrency = 1) {
    const downloadPromises = [];
    let currentIndex = 0;

    while (currentIndex < urls.length) {
        const batch = urls.slice(currentIndex, currentIndex + concurrency);
        const batchPromises = batch.map(urlObj => downloadURL(urlObj, logFile));
        downloadPromises.push(...batchPromises);
        currentIndex += concurrency;
        await Promise.all(batchPromises);
    }

    try {
        await Promise.all(downloadPromises);
    } catch (error) {
      console.error('Error downloading URLs:', error);
    }
}

(async () => {
    const filePath = 'urls.json'; // Update the file path if necessary
    const logFile = 'downloaded_urls.json'; // Log file to track downloaded URLs

    try {
        const urls = await readURLsFromFile(filePath);
        await downloadURLs(urls, logFile);
    } catch (error) {
        console.error('Error:', error);
    }
})();
