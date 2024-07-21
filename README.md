**Video Platform Backend**

**OVERVIEW**
The Video Platform Backend project is a Node.js application designed to manage the backend functionalities of a video sharing platform. Key features include:

- User Authentication and Authorization: Secure user login and registration processes.
- User Password Recovery: Mechanisms for users to recover forgotten passwords.
- Video Upload and Storage: Allows users to upload and store video files efficiently.
- Video Streaming: Enables seamless streaming of video content.
- Video Sharing: Facilitates sharing of videos among users.

This backend system ensures a robust and scalable infrastructure for a video-centric application.

**INSTALLATION**
# Clone the repository
    `git clone https://github.com/davidjeffrey058/video_platform_backend.git
    cd video_platform_backend`

# Install dependencies
    `npm install`

# Set up environmental variables

    *// Connection and database configurations //*
    PORT=your_port
    MONGO_URI=your_mongoDb_connection_string
    LOCAL_MONGO_URI=mongodb://localhost:27017/video_platform

    *// password encryption //*
    SECRET=your_secret_for_password_encryption
    SALT=your_rounds_for_password_encryption

    FRONT_URL=https://video-platform-c4585.web.app

    *// Email configurations //*
    HOST=your_host
    SERVICE=your_service
    EMAIL_PORT=your_email_port
    SECURE=true
    USER=your_email_address 
    PASS=your_app_password

    *// Firebase configuration values //*
    API_KEY=your_api_key
    AUTH_DOMAIN=your_auth_domain
    PROJECT_ID=your_project_id
    STORAGE_BUCKET=your_storage_bucket
    MESSAGING_SENDER_ID=your_messaging_sender_id
    APP_ID=1:1094632914577:web:your_app_id