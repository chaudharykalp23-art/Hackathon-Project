# 🌍 GlobeTrotter

### Personalized Travel Planning & Itinerary Management Platform

GlobeTrotter is a personalized travel planning web application that helps users create, organize, and share multi-city travel itineraries.

The platform allows travelers to discover destinations and activities, create trips, manage day-wise itineraries, estimate expenses, and share their travel plans with others.

---

## 🚀 Project Vision

GlobeTrotter aims to make travel planning simple, interactive, and personalized.

Instead of managing destinations, dates, activities, and expenses across multiple applications, GlobeTrotter brings everything together in one platform.

Users can:

- 🌍 Discover destinations
- ✈️ Create multi-city trips
- 📅 Build day-wise itineraries
- 🎯 Add activities to destinations
- 💰 Track estimated trip expenses
- 🗓️ Visualize trips using timelines/calendars
- 👥 Share itineraries with friends and the community

---

## ✨ Features

### 1. 🔐 Login & Signup

- User registration
- User login
- Email and password authentication
- Password protection
- Authentication using JWT

### 2. 🏠 Dashboard

The dashboard provides a quick overview of the user's travel plans.

Features include:

- Upcoming trips
- Recent trips
- Travel statistics
- Recommended destinations
- Quick access to trip planning

### 3. ✈️ Create Trip

Users can create a personalized trip by entering:

- Trip name
- Start date
- End date
- Trip description
- Cover image
- Public/private visibility

### 4. 🧳 My Trips

Users can manage all their trips from one place.

Trips are categorized into:

- Ongoing
- Upcoming
- Completed
- Draft

Each trip provides information such as:

- Trip name
- Date range
- Destinations/stops
- Estimated cost
- Trip status

### 5. 🗺️ Itinerary Builder

Users can create detailed travel plans by:

- Adding destinations
- Selecting travel dates
- Adding activities
- Organizing activities by day
- Reordering itinerary items
- Viewing the complete travel timeline

### 6. 🔎 City Search

Users can search for cities and destinations.

Information can include:

- City name
- Country
- Region
- Popularity
- Cost index

### 7. 🎯 Activity Search

Users can discover activities such as:

- Sightseeing
- Food tours
- Adventure activities
- Cultural experiences
- Entertainment

Activities can be filtered by:

- Type
- Cost
- Duration

### 8. 💰 Budget & Cost Breakdown

GlobeTrotter helps users estimate their trip expenses.

Cost categories include:

- Transportation
- Accommodation
- Activities
- Meals
- Other expenses

Users can view:

- Total estimated cost
- Average cost per day
- Category-wise expenses
- Budget warnings

### 9. 🗓️ Calendar & Timeline

Users can visualize their complete trip through:

- Calendar view
- Day-wise itinerary
- Timeline
- Activity schedules

### 10. 🌐 Public / Shared Itinerary

Users can share their trips publicly.

Features include:

- Public itinerary URL
- Read-only itinerary
- Copy trip
- Share with friends
- Social sharing

### 11. 👤 Profile & Settings

Users can manage:

- Name
- Email
- Profile photo
- Language preferences
- Saved destinations
- Account settings

### 12. 📊 Admin Dashboard

The optional admin dashboard can provide:

- Total users
- Total trips
- Popular destinations
- Popular activities
- User engagement
- Platform statistics

---

# 🛠️ Technology Stack

## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Axios
- React Router

## Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs

## Database

- MySQL
- Relational database design

## Development Tools

- Visual Studio Code
- Git
- GitHub
- XAMPP
- Postman

---

# 📁 Project Structure

```text
Hackathon-Project
│
└── project
    │
    ├── frontend
    │   ├── index.html
    │   ├── package.json
    │   ├── vite.config.js
    │   │
    │   └── src
    │       ├── App.jsx
    │       ├── main.jsx
    │       ├── api.js
    │       └── styles.css
    │
    └── backend
        │
        ├── server.js
        ├── package.json
        ├── .env
        ├── database.sql
        │
        ├── config
        │   └── db.js
        │
        ├── controllers
        │   ├── authController.js
        │   ├── tripController.js
        │   ├── activityController.js
        │   ├── communityController.js
        │   └── adminController.js
        │
        ├── routes
        │   ├── authRoutes.js
        │   ├── tripRoutes.js
        │   ├── activityRoutes.js
        │   └── communityRoutes.js
        │
        ├── middleware
        │   └── authMiddleware.js
        │
        └── data
            └── travel_app.db
