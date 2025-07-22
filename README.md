🌤️ Weather Proxy API with Redis Caching
This is a Node.js proxy server that fetches weather data from the OpenWeather API and caches it using Redis to reduce redundant external API calls and improve performance.

🚀 Features
🔁 Forward Proxy: Forwards client requests to the OpenWeatherMap API.

⚡ Redis Caching: Caches temperature data by city name to avoid unnecessary API calls.

🧪 Unit & Integration Tests: Includes test coverage using Jest and Supertest.

📊 Cache Stats Logging: Logs cache hit and miss stats on every request.

📦 Tech Stack
Node.js

Express.js

Redis

Docker (for Redis)

WSL (Windows Subsystem for Linux)

OpenWeatherMap AP
