const fs = require('fs').promises;
const { stat } = require('fs').promises;
const ncs = require('nocopyrightsounds-api');

// Function to read data from a file
async function readFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${filePath} does not exist.`);
        } else {
            console.error('Error reading file:', error);
        }
        return null;
    }
}

// Function to save data to a file
async function saveToFile(data, filePath) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        console.log(`Data saved to ${filePath}`);
    } catch (error) {
        console.error(`Error saving data to ${filePath}:`, error);
    }
}

// Function to fetch tracks from NCS API
async function fetchTracksFromAPI(page) {
    try {
        const search = await ncs.getSongs(page);
        return search || [];
    } catch (error) {
        console.error(`Error fetching tracks from page ${page}:`, error);
        return [];
    }
}

// Main function
(async () => {
    const songsFilePath = 'songs.json';
    const urlsFilePath = 'urls.json';
    const pageFilePath = 'page.json';

    let currentPage = 0;
    const savedPage = await readFromFile(pageFilePath);
    if (savedPage !== null) {
        currentPage = savedPage.page || 0;
    }

    let allTracks = [];
    let trackId = 1; // Define trackId here
    while (true) {
        const tracks = await fetchTracksFromAPI(currentPage);
        if (tracks.length === 0) {
            console.log('No more tracks found, exiting script.');
            break;
        }
      
        tracks.forEach(track => {
            track.zid = trackId++;
            allTracks.push(track);
        });
        currentPage++;
    }

    await saveToFile(allTracks, songsFilePath);

    const urlsData = allTracks.map(track => {
        return {
            name: track.name,
            id: track.zid,
            url: track.download && track.download.regular ? track.download.regular : ''
        };
    });
    await saveToFile(urlsData, urlsFilePath);

    await saveToFile({ page: currentPage }, pageFilePath);
})();