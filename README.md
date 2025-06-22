# 📝 Survey-App

A custom-built **Survey Application** designed for internal use in organizations — a lightweight and flexible alternative to Google Forms. Developed as part of a TÜBİTAK/BİLGEM project.

---

## 🌐 Overview

Survey-App allows companies and institutions to create, distribute, and collect surveys through a Java-based backend and a modern web frontend. Designed with enterprise use in mind, it enables full control over the survey flow, question types, and data storage.

---

## 🚀 Features

- Create and manage custom surveys
- Collect responses securely
- Store survey results in a relational database
- Admin panel and user roles
- Swing-based local admin interface 
- RESTful backend API for integration and extension
- Lightweight web frontend using React 

---

## 🛠️ Tech Stack

- **Backend:** Java (Spring Boot), JDBC
- **Frontend:** JavaScript (React)
- **Database:** PostgreSQL / MySQL *(configurable)*
- **UI (optional):** Java Swing (Admin/local interface)

---

## ⚙️ Getting Started

1. Clone the repository:

git clone https://github.com/yourusername/survey-app.git  
cd survey-app
### Configure the database
src/main/resources/application.properties  
Change the following fields to match your database settings:  
spring.datasource.url=jdbc:postgresql://localhost:5432/yourdb  
spring.datasource.username=youruser  
spring.datasource.password=yourpassword  


### Start The Server
-> Inside the project root  
cd src/main/java/staj/proje/  
-> Compile and run  
java Application.java  

### Frontend Setup
-> navigate to the frontend directory:  
cd frontend  
npm install  
-> Start the Frontend Server:  
npm start  


