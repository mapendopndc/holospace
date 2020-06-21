# Holospace

Holospace is a Node.js Rest API back-end for the Holo application.

Holo is a multi-user augmented reality application for immersive and collaborative 3D mockup reviews for designers and architects.
Holo is developed in the Unity game engine and is to be deployed on both iOS and Android operating systems.
Addditionally, Holo will have a website interface that will also make use of this API.

Holospace runs on a web server that I also use to deploy my personal applications.

Following are more details on my current server architecture.

Technology Stack
-
MERN Stack
- Front End: Next.js + React
- Back End Servers: Node.js  + Express
- Databse: Mongo Atlas
- File Server: AWS S3
- API Gateway: Nginx

Services
- 
Each microservice runs serparatly on different ports and Nginx is used both as a virtual host and reverse proxy to access these services
- portfolio: Front end for personal website
- holofront: Front end for Holo
- holospace: Restful API acting as backend for Holo's web and mobile clients 
