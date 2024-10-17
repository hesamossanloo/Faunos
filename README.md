## Phaunus App
PHAUNOS (Phaunus) was a god of forests. Phaunus is a React Native application designed for forest management. The app supports both iOS and Android platforms and offers a range of features to help users manage forests efficiently.

### Features

- **Mapbox Integration**: Utilize Mapbox for advanced mapping and geolocation functionalities.
- **Role-Based Access**: Different roles for users to ensure secure and appropriate access to various features.
- **Offline Functionality**: Access and manage data even without an internet connection.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/phaunus.git
    ```
2. Navigate to the project directory:
    ```sh
    cd phaunus
    ```
3. Install dependencies:
    ```sh
    yarn install
    ```
4. Link native dependencies:
    ```sh
    npx react-native link
    ```

### Running the App

#### iOS

1. Install CocoaPods dependencies (required for iOS native modules):
    ```sh
    cd ios && pod install && cd ..
    ```
2. Run the app:
    ```sh
    npx react-native run-ios
    ```

#### Android

1. Ensure you have an Android emulator running or a device connected.
2. Run the app:
    ```sh
    npx react-native run-android
    ```

### Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact

For any inquiries or support, please contact us at support@phaunusapp.com.
