# QuickFix – Local Service Marketplace (MERN)

QuickFix is a full-stack MERN application where users can book local services such as electricians, plumbers, and cleaning services.
Service providers can manage bookings and update service status through their dashboard.

---

## Features

### User

* Register and login authentication
* Browse available services
* Book services with date and time
* Enter address and contact number
* Pay for accepted bookings
* View booking history and status

### Provider

* View booking requests
* Accept or reject bookings
* Update service status

  * On The Way
  * Completed
* View customer contact details

---

## Booking Workflow

User books service
↓
Provider accepts booking
↓
User completes payment
↓
Provider marks **On The Way**
↓
Provider marks **Completed**

---

## Tech Stack

Frontend

* React
* CSS
* Axios

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## Project Structure

```
client
 ├── components
 ├── pages
 ├── services
 └── styles

server
 ├── controllers
 ├── models
 ├── routes
 └── middleware
```

---

## Future Improvements

* Real payment integration (Razorpay/Stripe)
* Service ratings and reviews
* Provider location tracking
* Admin dashboard

---

## Author

Aman | MERN Stack Developer
