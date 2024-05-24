# NoCopyrightSounds Exporter

![NCS Logo](ncs_logo.png)

## Overview

NoCopyrightSounds Exporter is a tool that allows you to fetch and export music tracks from the NoCopyrightSounds (NCS) library.

## Features

- Fetches music tracks from the NCS library via their API.
- Saves fetched tracks to a JSON file for easy access and management.
- Generates a JSON file containing track names, URLs, and IDs.
- Automatically checks for new tracks and updates the export.
- Downloads the music tracks as MP3 files for offline use.
- Organizes downloaded tracks into a folder for easy access.
- Prevents redownloading of already fetched tracks.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/NoCopyrightSounds-export.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the script:

   ```bash
   npm start
   ```

## Usage

Upon running the script, it will fetch tracks from the NCS library and save them to songs.json.
It will then generate a JSON file called urls.json, containing track names, IDs, and URLs.
The script will automatically check for new tracks on subsequent runs and update the export accordingly.

## Configuration

Modify config.json to customize settings such as file paths, API endpoints, etc.

## Dependencies

- nocopyrightsounds-api: A Node.js wrapper for the NCS API.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
