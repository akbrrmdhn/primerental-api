# **PrimeRental - API**

Prime Rental is a rental application which can be accessed through both web browser and mobile application. Prime Rental makes things easier for people who want to get connected through vehicle rent, ordering vehicles to rent, or renting their own vehicles.

<br>
<p align="center">
  <img src="public/images/primerental.png" />
</p>

<br>

### **BUILT WITH**

---

- [Node.js (JavaScript Runtime)](https://nodejs.org/en/)
- [Express.js (Back-end Web Application Framework)](https://expressjs.com/)
- [MySQL (Database)](https://www.mysql.com/)
- [Multer (Upload Middleware)](https://www.npmjs.com/package/multer)
- [Socket.io (Realtime)](https://socket.io/docs/v4/server-installation/)
- [Nodemailer (OTP)](https://nodemailer.com/about/)

### **SUPPORTING TOOLS**

---

- [Visual Studio Code](https://code.visualstudio.com/)
- [XAMPP](https://www.apachefriends.org/index.html)
- [Postman](https://www.postman.com/)

### **INSTALLATION**

---

STEP 1 : Clone this repository to your local directory with:

```
git clone https://github.com/akbrrmdhn/primerental-api.git
```

STEP 2 : Install modules and dependencies listed on package.json with

```
npm install
```

STEP 3 : Create .env file on your local directory as this doesn't come with the clone.

```
DB_HOST = "YOUR_HOST"
DB_USER = "YOUR_USERNAME"
DB_PASSWORD = "YOUR_PASSWORD"
DB_DATABASE = "YOUR_DATABASE"
SECRET_KEY = "YOUR_SECRET_KEY"
PORT = "YOUR_PORT"
SENDER_EMAIL = "YOUR_EMAIL"
SENDER_PASSWORD = "YOUR_EMAIL_PASSWORD"
```

### **HOW TO RUN**

---

Nodemon comes along with the module installation, so all you need to do is run

```
npm run dev
```

The application will run on localhost: [http://localhost:{YOUR_PORT}/]().
<br>

### **AVAILABLE ROUTES**

---

[Postman Documentation](https://documenter.getpostman.com/view/11799454/UVBzmUYw)

There are five main routes, with each route stemming from the base route in this application. Please refer to the postman documentation link above to do your own API request.

- [/auth](https://documenter.getpostman.com/view/11799454/UVBzmUYw#cc2bc6d0-9c62-4237-b9e8-a026f8c685d0) is the route which handles anything related to authentication.
- [/users](https://documenter.getpostman.com/view/11799454/UVBzmUYw#e0fcdf4b-4394-4795-85b1-17826a21caab) handles requests involving user data, such as profile.
- [/vehicles](https://documenter.getpostman.com/view/11799454/UVBzmUYw#d734b714-ff89-442e-84bf-5f4f079cd2ed) manages everything related to vehicles.
- [/histories](https://documenter.getpostman.com/view/11799454/UVBzmUYw#add79e7e-89ef-4a77-a477-f7068ce8fc11) deals with requests related to the all transaction users.
- [/chat](https://documenter.getpostman.com/view/11799454/UVBzmUYw#63facb33-b5cd-499d-9de3-642a03ad710b) takes care of user chats and messages.
  <br>

### **RELATED PROJECT(S)**

- [PrimeRental - ReactJS](https://github.com/akbrrmdhn/primerental-react)
- [PrimeRental - React Native](https://github.com/akbrrmdhn/RNPrimeRental)
