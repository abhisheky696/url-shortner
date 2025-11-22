# URL Shortener Web Application

A modern URL shortening web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can shorten long URLs, track analytics, and view all generated links.

---
## Live Demo

Check out the live application here: [URL Shortener Web App](http://localhost:5173/)  

## Features

* **Shorten URLs:** Convert long URLs into short, shareable links.
* **Analytics:** Track total clicks and last clicked time for each URL.
* **Total Links:** View all shortened links stored in the database.
* **Responsive Design:** Clean UI using Tailwind CSS.
* **Clipboard Support:** Easily copy shortened links.
* **Separate Pages:**

  * Shorten URL
  * Analytics
  * Total Links

---

## Tech Stack

* **Frontend:** React.js, Tailwind CSS, React Router, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **HTTP Client:** Axios

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

2. **Install dependencies**

* Backend:

```bash
cd backend
npm install
```

* Frontend:

```bash
cd frontend
npm install
```

3. **Configure Environment**

Create a `.env` file in the backend directory:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
```

4. **Start the backend server**

```bash
npm run dev
```

5. **Start the frontend**

```bash
cd frontend
npm start
```

The app will be running at [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

* `POST /shorten` – Create a new short URL

  * Body: `{ redirectUrl: "https://example.com" }`
  * Response: `{ success: true, data: { uniqueCode, shortUrl } }`

* `GET /analytics/:code` – Fetch analytics for a short code

  * Response: `{ success: true, analytics: { totalClicked, lastClickedTime } }`

* `GET /getAllLinks` – Fetch all shortened links

  * Response: `[ { uniqueCode, redirectUrl, analytics, createdAt } ]`

---

## Project Structure

```
/frontend
  ├── src
  │   ├── pages
  │   │   ├── Shortner.jsx
  │   │   ├── Analytics.jsx
  │   │   └── TotalLinks.jsx
  │   ├── components
  │   │   └── Header.jsx
  │   └── App.jsx
/backend
  ├── models
  │   └── url.model.js
  ├── routes
  │   └── url.routes.js
  ├── controllers
  │   └── url.controller.js
  └── server.js
```

---

## Future Enhancements

* User authentication for personal links
* Custom short URLs
* Expiration dates for short links
* Real-time analytics dashboard
