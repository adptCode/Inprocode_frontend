# 🚀 Inprocode Frontend - Angular Application

This is the **frontend** of the [Inprocode Project](https://github.com/adptCode/Inprocode_server.git), built using **Angular** and integrated with various plugins that enhance functionality. It connects to a **Node.js + MySQL** backend and includes interactive features such as maps, calendars, and charts.

---

## 🌟 Features
- **📌 Bootstrap 5** - Responsive and modern UI components.
- **📊 Charts** - Integrated charting tools for data visualization.
- **🗺️ Maps** - Map integration using Mapbox.
- **📅 Calendar** - Calendar feature for scheduling and planning.
- **🖥️ CRUD Operations** - Full CRUD functionality with the backend.
- **🔗 API Connectivity** - Fetches and stores data using the Inprocode backend.

---

## 🔧 Prerequisites
Ensure you have the following installed before running the project:

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)
- **Angular CLI** (latest version recommended)
- **Backend Server** - [Inprocode Server](https://github.com/adptCode/Inprocode_server.git) must be running.

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/adptCode/Inprocode_frontend.git
cd Inprocode_frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Add your **Mapbox Token** to the environment file:
```env
MAPBOX_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4️⃣ Start the Backend Server
Make sure the backend server is running. Follow the setup instructions in the [backend repository](https://github.com/adptCode/Inprocode_server.git).

### 5️⃣ Start the Development Server
```bash
ng serve -o
```
This will launch the application at `http://localhost:4200/`.

The application will automatically reload when changes are made.

---

## 📂 Project Structure
```
Inprocode_frontend/
│── src/
│   ├── app/
│   │   ├── components/    # Angular components
│   │   ├── services/      # API calls & business logic
│   │   ├── modules/       # Feature modules (if applicable)
│   ├── assets/            # Static files
│   ├── environments/      # Environment variables
```

---

## 📜 License
This project is open-source and available under the **MIT License**.

🚀 **Happy coding!**


