# Weather App 🌤️

A modern, beautiful weather web application built with React, TypeScript, and Tailwind CSS featuring a video background and glassmorphism design.

## Features

- 🎨 Modern glassmorphism design with video background
- 🌟 Smooth animations and transitions
- 📱 Fully responsive design
- 🔍 Real-time city search
- 📊 Comprehensive weather information
- 🌅 Sunrise/sunset times
- 💨 Wind speed, humidity, pressure, and visibility
- ⚡ Fast and lightweight

## Setup

1. **Clone the repository** (if not already done)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get a free API key from [OpenWeatherMap](https://openweathermap.org/api):**
   - Sign up for a free account
   - Go to API keys section
   - Copy your API key

4. **Add your API key:**
   - Open `src/App.tsx`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```typescript
   const API_KEY = 'your_actual_api_key_here';
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

## Technologies Used

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **React Icons** - Beautiful icon library
- **OpenWeatherMap API** - Weather data provider

## Design Features

- **Video Background**: Dynamic nature video background
- **Glassmorphism**: Modern blur-glass effect cards
- **Animations**: Smooth fade-in and hover effects
- **Responsive**: Works perfectly on all device sizes
- **Accessibility**: Proper contrast and semantic HTML

## API Usage

This app uses the OpenWeatherMap Current Weather API with the following endpoint:
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).