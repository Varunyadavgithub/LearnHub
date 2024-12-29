# Learn Hub 🌐 - Full Stack Course Platform 📚

Learn Hub is a full-stack course-sharing platform that allows users to register, login, browse, purchase, and track their progress on courses. Admins and instructors can create, manage, and publish courses. Users can also interact with the platform by completing courses and viewing lecture progress. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with additional functionalities like authentication, file upload with Cloudinary, and course management.

## Features 🚀

- **User Authentication & Profile Management** 🔐: Secure user login, registration, and profile updates.
- **Course Management** 📖: Instructors and admins can create, update, and delete courses and lectures.
- **Course Progress Tracking** 📈: Users can track their progress on individual courses and lectures.
- **Course Search & Filter** 🔍: Users can search and filter courses based on specific criteria.
- **Payment Integration** 💳: Purchase courses through the Stripe payment gateway.
- **Admin Dashboard** 👨‍💼: Admins can manage users, courses, and purchases.
- **Responsive UI** 📱: Built with React and styled with TailwindCSS.

## Tech Stack 🛠️

- **Frontend**: React.js, Redux Toolkit (RTK Query), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer and Cloudinary
- **Payment Integration**: Stripe
- **Hosting**: Vercel (Frontend and Backend)

## Installation 🏗️

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/learn-hub.git
   cd learn-hub
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```bash
   DB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_URL=your-cloudinary-url
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend will be running on `http://localhost:5000` by default.

### Frontend Setup

1. Go to the frontend directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file for the frontend:
   ```bash
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

   The frontend will be running on `http://localhost:5173`.

## API Routes 📡

### Course Routes 📚

- **POST** `/api/v1/course` - Create a new course (requires authentication)
- **GET** `/api/v1/course/search` - Search for courses (requires authentication)
- **GET** `/api/v1/course/published-courses` - Get published courses
- **GET** `/api/v1/course` - Get courses created by the authenticated user
- **PUT** `/api/v1/course/:courseId` - Edit course details (requires authentication)
- **GET** `/api/v1/course/:courseId` - Get course details by ID (requires authentication)

### Lecture Routes 🎥

- **POST** `/api/v1/course/:courseId/lecture` - Create a new lecture (requires authentication)
- **GET** `/api/v1/course/:courseId/lecture` - Get all lectures of a course (requires authentication)
- **POST** `/api/v1/course/:courseId/lecture/:lectureId` - Edit a lecture (requires authentication)
- **DELETE** `/api/v1/course/lecture/:lectureId` - Delete a lecture (requires authentication)
- **GET** `/api/v1/course/lecture/:lectureId` - Get lecture details by ID (requires authentication)

### Course Progress Routes 📈

- **GET** `/api/v1/progress/:courseId` - Get course progress (requires authentication)
- **POST** `/api/v1/progress/:courseId/lecture/:lectureId/view` - Mark lecture as viewed (requires authentication)
- **POST** `/api/v1/progress/:courseId/complete` - Mark course as completed (requires authentication)
- **POST** `/api/v1/progress/:courseId/incomplete` - Mark course as incomplete (requires authentication)

### User & Auth Routes 👤

- **POST** `/api/v1/user/register` - Register a new user
- **POST** `/api/v1/user/login` - User login
- **GET** `/api/v1/user/logout` - User logout
- **GET** `/api/v1/user/profile` - Get user profile (requires authentication)
- **PUT** `/api/v1/user/profile/update` - Update user profile (requires authentication)

## Contributing 🤝

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Added feature-name"
   ```
4. Push your changes to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request to merge your changes.

## License 📜

This project is open-source and available under the [MIT License](LICENSE).
