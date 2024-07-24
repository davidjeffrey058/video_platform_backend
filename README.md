# Video Platform Backend

## OVERVIEW
The Video Platform Backend project is a Node.js application designed to manage the backend functionalities of a video streaming platform. Key features include:

- **User Authentication and Authorization:** Secure user login and registration processes.
- **User Password Recovery:** Mechanisms for users to recover forgotten passwords.
- **Video Upload and Storage:** Allows users to upload and store video files efficiently.
- **Video Streaming:** Enables seamless streaming of video content.
- **Video Sharing:** Facilitates sharing of videos among users.

This backend system ensures a robust and scalable infrastructure for a video-centric application.

## INSTALLATION
### Clone the repository
    `git clone https://github.com/davidjeffrey058/video_platform_backend.git
    cd video_platform_backend`

### Install dependencies
    `npm install`

### Set up environmental variables

    PORT=your_port
    MONGO_URI=your_mongoDb_connection_string
    LOCAL_MONGO_URI=mongodb://localhost:27017/video_platform

    SECRET=your_secret_for_password_encryption
    SALT=your_rounds_for_password_encryption

    FRONT_URL=your_frontend_url

    HOST=your_host
    SERVICE=your_service
    EMAIL_PORT=your_email_port
    SECURE=true
    USER=your_email_address 
    PASS=your_app_password

    API_KEY=your_api_key
    AUTH_DOMAIN=your_auth_domain
    PROJECT_ID=your_project_id
    STORAGE_BUCKET=your_storage_bucket
    MESSAGING_SENDER_ID=your_messaging_sender_id
    APP_ID=1:1094632914577:web:your_app_id

## USAGE
### Start the development server
    `npm run dev`

### API Endpoints

**POST** /api/users/login - User login
**POST** /api/users/signup - User registration
**GET** /api/users/:id/verify/:token - verify users email address
**POST** /api/users/password-reset - Initiating password reset
**POST** /api/users/change-pass/:uid/:token - Change user's password

**POST** /api/videos/upload - Upload a new video
**GET** /api/videos - Fetch all videos
**GET** /api/video/:vid - Get a single video

## CONTRIBUTING
Contributions are welcome! Please Follow these steps:
1. Fork the respository
2. Create a new branch
    `git checkout -b feature/Your feature`
3. Commit your changes
    `git commit -m 'Add YourFeature`
4. Push to the branch 
    `git push origin feature/YourFeature`
5. Open a Pull Request

## LICENSE
This project is licensed under the MIT license

## AUTHORS AND ACKNOWLEDGEMENTS
- David Jeffrey - Initial work
