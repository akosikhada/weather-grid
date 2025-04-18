# 🌦️ Weather Grid

<div align="center">
  <img src="./public/logo.png" alt="Weather Grid Logo" width="200" height="200" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.0-black?style=for-the-badge&logo=next.js" alt="Next.js 15.3.0" />
  <img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react" alt="React 19.0.0" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind 4.0" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript 5.0" />
</div>

<p align="center">
  <b><i>"An advanced grid-based meteorological platform delivering precise weather analytics and forecasting with an intuitive, responsive interface."</i></b>
</p>

<br />

## 📋 Project Description

Weather Grid provides reliable, up-to-date weather information through a clean, easy-to-use interface. The application displays current conditions and forecasts in a straightforward grid layout, making weather data instantly understandable. Designed with both functionality and aesthetics in mind, Weather Grid offers a smooth experience across all devices.

### 💡 Key Differentiators

- **Precision-Focused**: Leveraging the OpenWeatherMap API for highly accurate meteorological data
- **Time-Aware Design**: Location-specific time displays with automatic timezone adjustments
- **Context-Optimized Architecture**: Engineered for performance with state-of-the-art React patterns
- **Accessibility-First**: Carefully crafted for all users with full keyboard navigation and screen reader support
- **Theme Adaptability**: Seamless light and dark mode transitions for optimal viewing in any environment

### 🎯 Use Cases

- **Daily Planning**: Quick access to current conditions for day-to-day decision making
- **Travel Preparation**: Location-based forecasts to aid in travel planning
- **Weather Monitoring**: Real-time updates for changing atmospheric conditions
- **Educational Resource**: Clean visualization of weather patterns for educational purposes

<br />

## ✨ Features

- **⚡️ Real-time Weather Data** — Fetch current conditions from OpenWeatherMap API
- **🕒 Local Time Integration** — Display location-specific time with timezone adjustment
- **🔄 Context-based State Management** — Optimized data flow with React Context
- **🌓 Dark/Light Mode** — Full theme support with next-themes
- **📱 Responsive Design** — Optimized for all device sizes
- **🎨 Modern UI Components** — Built with shadcn/ui and Tailwind CSS
- **🔍 Search Functionality** — Find location-specific weather data
- **🛠️ Type-safe Development** — Fully typed with TypeScript

## 💻 Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="./public/icons/next.png" width="48" height="48" alt="Next.js" />
        <br />Next.js
      </td>
      <td align="center" width="96">
        <img src="./public/icons/react.png" width="48" height="48" alt="React" />
        <br />React
      </td>
      <td align="center" width="96">
        <img src="./public/icons/ts.png" width="48" height="48" alt="TypeScript" />
        <br />TypeScript
      </td>
      <td align="center" width="96">
        <img src="./public/icons/tailwind.png" width="48" height="48" alt="Tailwind" />
        <br />Tailwind CSS
      </td>
      <td align="center" width="96">
        <img src="./public/icons/shadcn.png" width="48" height="48" alt="shadcn/ui" />
        <br />shadcn/ui
      </td>
    </tr>
    <tr>
      <td align="center" width="96">
        <img src="./public/icons/js.png" width="48" height="48" alt="JavaScript" />
        <br />JavaScript
      </td>
      <td align="center" width="96">
        <img src="./public/icons/html.png" width="48" height="48" alt="HTML" />
        <br />HTML
      </td>
      <td align="center" width="96">
        <img src="./public/icons/css.png" width="48" height="48" alt="CSS" />
        <br />CSS
      </td>
      <td align="center" width="96">
        <img src="./public/icons/radix.png" width="48" height="48" alt="Radix UI" />
        <br />Radix UI
      </td>
      <td align="center" width="96">
        <img src="./public/icons/npm.png" width="48" height="48" alt="npm" />
        <br />npm
      </td>
    </tr>
    <tr>
      <td align="center" width="96">
        <img src="./public/icons/git.png" width="48" height="48" alt="Git" />
        <br />Git
      </td>
      <td align="center" width="96">
        <img src="./public/icons/github.png" width="48" height="48" alt="GitHub" />
        <br />GitHub
      </td>
      <td align="center" width="96">
        <img src="./public/icons/vscode.png" width="48" height="48" alt="VS Code" />
        <br />VS Code
      </td>
      <td align="center" width="96">
        <img src="./public/icons/vercel.png" width="48" height="48" alt="Vercel" />
        <br />Vercel
      </td>
      <td align="center" width="96"></td>
    </tr>
  </table>
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository

```bash
git clone https://github.com/akosikhada/weather-grid.git
cd weather-grid
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# Create a .env file at the root with your OpenWeatherMap API key
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## 🧩 Architecture

Weather Grid uses a modern React architecture with these key patterns:

- **Context API** for global state management with separate read/write contexts
- **Server Components** for improved performance and SEO
- **API Routes** for secure backend communication
- **Custom Hooks** for reusable logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Vercel](https://vercel.com/) for hosting and deployment
- [Meteo-nix](https://github.com/DariusLukasukas/nextjs-weather-app) by Darius Lukasukas as an inspiration for modern weather app design and implementation

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/yourusername">akosikhada</a>
</p>
