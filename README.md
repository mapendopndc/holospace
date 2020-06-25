# Holospace

Holospace is a Node.js Rest API back-end for the Holo application.

Holo is a multi-user augmented reality application for immersive and collaborative 3D mockup reviews for designers and architects.
Holo is developed in the Unity game engine and is to be deployed on both iOS and Android operating systems. Holospace will provide the authentification, file upload/download, and additional user data to these clients.

Addditionally, Holo will have a website interface that will also make use of this API.

Back-end Architecture
-
- This API operates as a service within a larger microservice architecture made possible with an nginx reverse proxy. 
- Holospace fetches data in MongoDB Atlas, and uses AWS buckets as file servers.
