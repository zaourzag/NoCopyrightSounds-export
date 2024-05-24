# NoCopyrightSounds Exporter

![NCS Logo](ncs_logo.png)

## Overview

NoCopyrightSounds Exporter is a powerful tool designed to simplify the process of fetching and exporting music tracks from the NoCopyrightSounds (NCS) library.

## Features

- **Music Track Fetching**: Effortlessly fetches music tracks from the NCS library via their API.
- **Export Management**: Saves fetched tracks to a JSON file for easy access and management.
- **Metadata Generation**: Generates a JSON file containing detailed track metadata, including names, URLs, and IDs.
- **Automatic Updates**: Automatically checks for new tracks and updates the export to keep it current.
- **Redownloading Protection**: Prevents redownloading of previously downloaded tracks.
- **Downloaded URLs Logging**: Logs downloaded URLs to a file to track downloaded tracks.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/NoCopyrightSounds-export.git

```
### Install dependencies:

   ```bash
   npm install
   ```

### Run the script:

   ```bash
   npm start
   ```

## Usage

1. Upon running the script, it will fetch tracks from the NCS library and save them to `songs.json`.
2. It will then generate a JSON file called `urls.json`, containing track names, IDs, and URLs.
3. The script will automatically check for new tracks on subsequent runs and update the export accordingly.

## Configuration

- Modify `config.json` to customize settings such as file paths, API endpoints, etc.

## Dependencies

- [nocopyrightsounds-api](https://github.com/yishn/nocopyrightsounds-api): A Node.js wrapper for the NCS API.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
