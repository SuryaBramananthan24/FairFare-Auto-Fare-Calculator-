# FairFare: Auto Fee Calculator

FairFare is a web application designed to calculate auto fares based on distance traveled and prevailing rates. This tool aims to provide users with an accurate fare estimate for their journeys.

## Features

- **Distance Calculation**: Automatically computes the distance between the starting point and destination.
- **Fare Estimation**: Provides an estimated fare based on standard rates and distance.
- **User-Friendly Interface**: Simple and intuitive design for ease of use.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: Bcrypt for secure user login
- **HERE Maps API**: Used for distance calculation

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- A MongoDB account with database set up

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SuryaBramananthan24/FairFare-Auto-Fare-Calculator.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd FairFare-Auto-Fare-Calculator
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add necessary configuration details such as the MongoDB connection string and API keys.

5. **Start the Application**:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:5000`.

## Usage

1. **Open the Application**: Navigate to `http://localhost:5000` in your web browser.
2. **Sign Up and Log In**: Register a new account or log in with existing credentials.
3. **Enter Locations**: Input your starting point and destination.
4. **Calculate Fare**: Click on the "Calculate Fare" button to receive an estimated fare based on the calculated distance.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes and commit them**:
   ```bash
   git commit -m 'Add new feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-name
   ```
5. **Submit a pull request** detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or suggestions, please open an issue in this repository.

