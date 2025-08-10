<div align="center">

# 🎵 Spotify Listening Stats for Next.js

A full-stack feature that connects to the Spotify API to display my real-time listening data directly on my portfolio. Built with Next.js, TypeScript, and a secure server-to-server authentication flow.

</div>

---

## ✨ Features

* **Showcase Your Taste:** Automatically displays your personal top tracks and followed artists.
* **Live Now Playing:** Shows what you're listening to right now.
* **Playback Control:** Includes API endpoints to play and pause your music.
* **Seamless for Visitors:** Uses a server-to-server authentication flow, so visitors see your stats instantly without needing to log in.
* **Self-Maintaining:** Includes a private, owner-only route to easily generate a new refresh token if needed.

---

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **API:** [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:** [Netlify](https://www.netlify.com/)

---

## 🔧 Setup & Installation

Follow these steps to get this project running locally on your machine.

### **Step 1: Get Your Spotify Credentials**

1.  Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and log in.
2.  Click **"Create app"** and give it a name and description.
3.  Once created, copy your **Client ID** and **Client Secret**.
4.  Click **"Edit Settings"** and add the following **Redirect URI**:
    * `http://127.0.0.1:3000/api/spotify/callback`

### **Step 2: Set Up Environment Variables**

1.  Clone this repository to your local machine.
2.  In the root of the project, create a new file named `.env.local`.
3.  Copy the contents of `.env.example` into `.env.local` and fill in your Spotify **Client ID** and **Client Secret**.

    ```env
    # .env.local

    SPOTIFY_CLIENT_ID=Your_Client_ID_Goes_Here
    SPOTIFY_CLIENT_SECRET=Your_Client_Secret_Goes_Here
    SPOTIFY_REFRESH_TOKEN= # We will get this in the next step
    ```

### **Step 3: Get Your Personal Refresh Token**

This is a one-time setup to allow the server to access your data permanently.

1.  Install the project dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  In your browser, go to `http://127.0.0.1:3000/api/spotify/login`.
4.  Log in to your Spotify account and grant permission.
5.  You will be redirected to a page displaying your **Refresh Token**. Copy this long string.
6.  Paste the token into your `.env.local` file for the `SPOTIFY_REFRESH_TOKEN` variable.
7.  **Restart your server** (`Ctrl + C` and `npm run dev`) for the new variable to take effect.

### **Step 4: Run the Project**

You're all set! Your local development server is running, and the Spotify component on your homepage should now be displaying your data.

---

## 🌐 API Endpoints

The following API routes are available for fetching data and controlling playback.

| Method | Endpoint                          | Description                               |
| :----- | :-------------------------------- | :---------------------------------------- |
| `GET`  | `/api/spotify/top-tracks`         | Gets your top 10 most played tracks.      |
| `GET`  | `/api/spotify/followed-artists`   | Gets a list of artists you follow.        |
| `GET`  | `/api/spotify/now-playing`        | Gets your currently playing song.         |
| `PUT`  | `/api/spotify/play`               | Starts or resumes playback.               |
| `PUT`  | `/api/spotify/pause`              | Pauses the current playback.              |
| `GET`  | `/api/spotify/login`              | **(Owner Only)** Starts the auth flow.    |
| `GET`  | `/api/spotify/callback`           | **(Owner Only)** Generates a refresh token. |
