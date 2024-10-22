# Subtitle Styler for Stremio
**Subtitle Styler for Stremio** is a Chrome extension designed to allow users to customize the appearance of subtitles in both ```web.stremio.com``` and ```app.strem.io``` (```web.strem.io/``` isn't supported yet). This extension provides flexible options for changing the font family, adjusting the subtitle outline size, customizing the outline color, and controlling the subtitle vertical alignment (```bottom``` value) for ```app.strem.io```.

## Features
* **Font Family Selector**: Choose from a variety of font families for your subtitles:
  * Rubik (default)
  * Arial
  * Verdana
  * Times New Roman
* **Font Outline Customization:**
  * Adjustable outline size (1px to 10px).
  * Select a custom outline color using a color picker.
* **Subtitle Alignment Adjustment for app.strem.io:**
  * Control the vertical alignment (```bottom``` position) of subtitles for ```app.strem.io``` through a customizable slider (0% to 20%).
  * This adjustment also affects the ```.subtitles-container:not(.hidden)``` rule to ensure consistent positioning.
* **Persistence Across Sessions:**
  * All settings are stored in Chrome's ```local storage```, ensuring that your subtitle preferences persist across browsing sessions.
* **Live Updates:**
  * Any changes made through the extension's popup are applied in real-time without needing to reload the page.

## Installation
1. **Download the repository:**
   * Clone the repository or download it as a ZIP and extract the files.
2. **Load the extension in Chrome:**
   * Open Chrome and navigate to ```chrome://extensions/```.
   * Enable "Developer mode" in the top right corner.
   * Click on the "Load unpacked" button and select the folder where you saved the extension.
3. **Using the extension:**
   * Once installed, you will see the extension icon in the top-right corner of your Chrome browser.
   * Click the icon to open the popup, where you can customize your subtitle settings for Stremio.

## Customization Options
### Font Family
Select your preferred font for the subtitles from a dropdown menu. The default font is ```Rubik```, but you can choose from:
* Arial
* Verdana
* Times New Roman
### Font Outline Size
Adjust the outline size of the subtitles using the slider. The outline size ranges from 1px to 10px, and the changes are applied instantly.

### Outline Color
Select the color for the outline using the color picker. The default color is black (```#000000```), but you can choose any color you prefer.

### Subtitle Bottom Position (only for app.strem.io)
This option allows you to adjust the vertical position of the subtitles in ```app.strem.io```. You can use the slider to set the bottom value between 0% and 20%. The default is 7%.

### How It Works
* **Google Fonts:** The extension injects Google Fonts for the ```Rubik``` font family directly into the page, ensuring consistent font rendering.
* **Real-Time Changes:** As you adjust the settings in the popup, the extension uses Chrome's storage API to save your preferences and apply them in real-time using CSS injected directly into the Stremio subtitle elements.
* **Observer for Subtitles:** The extension uses a MutationObserver to monitor and apply your subtitle settings every time the subtitles are updated or modified within Stremio.

## Supported Platforms
* **web.stremio.com:** Customize subtitles for the web version of Stremio, including font family and outline settings.
* **app.strem.io:** In addition to font customization, adjust the vertical alignment (bottom value) of subtitles for this web version.

## Contributing
Contributions are welcome! Feel free to open issues or pull requests if you find bugs or want to add new features.

## License
This project is licensed under the MIT License.

## Credits
Created by kevinization. Special thanks to the Stremio community for providing a fantastic platform!

## Known Issues
* Subtitle alignment might behave differently depending on the aspect ratio of the video player in app.strem.io.
Further testing needed for custom fonts across different subtitle formats and screen sizes.
* Note that there is no way to outline the letters in CSS, to "fix" that, shadows were placed at different angles behind the letters to give the outline effect, so a big value could make it look bad.