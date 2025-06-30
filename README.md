## Welcome to the Reading and Watch-List Dashboard Web App

This app consisits of a **Chrome extension** as well as an **Web app**.

### Tech Stack

- We have made our **Extension Frontend** code using ReactJS, which is complied into html,js and css with the help of Vite Bundler with other dependencies incluing axios, React-Router,

<p align="center">
  <img src="./assets/ExtensionFrontend.png" alt="Extension UI" width="200"/>
</p>


- The **Backend** part is done in JavaScript in NodeJS enviorment, along with ExpressJs and other dependencies incluiding dotenv, mongoose, Jwt, bcrypt, cookieParser.

- For **DataBase** we have used MongoDB, which is being connected with our app with the help of mongoose.Login/SignUp feature is also implemented.
<p align="center">
  <img src="./assets/Login.png" alt="Extension UI" width="200"/>
  <img src="./assets/SignIn.png" alt="Extension UI" width="200"/>
</p>

- The **Web App Frontend** is also made in ReactJs
<p align="center">
  <img src="./assets/AppProfile.png" alt="Extension UI" width="400"/>
  <img src="./assets/AppHome.png" alt="Extension UI" width="400"/>
  <img src="./assets/AppSearch.png" alt="Extension UI" width="400"/>
</p>

> So in general we have used mostly **MERN Stack** for this whole project

- Another crucial module which is the main heart of the app is **WEB-LLM**, we have used the **Web-LLm by MLC Ai**, which summarises the users browsed articles, youtube videos, and make it display as a summary/feed type of in the web app, which also acts as social media where users can also view other person's feed as well.

#### We have named the app or rather platform as **SocialME**.

<p align="center">
  <img src="./assets/SocialME.png" alt="Extension UI" width="200"/>
</p>

## Features and Cool Functionalites of the App

1. This both app and extension are compatible in **Google Chrome Browser**. The user can on starting signup in the app, and thus their progress/ feed gets saved and is **synced** with the social media app.

2. They do **not need** to **sign in** **over and over again**, as with the help of **JWT**, their login info is ****automaticlly checked** with **api end point** /check-auth, so they will be remain loggedIn/signin to both app and extension, unless they manually prefer to logout.

3. There is also another implementation that user has a choice of having **optional tracking**.That is in the extension they can select out of **youtube and articles**, what should be tracked , or none of them should be tracked, This is implemtend with the help of **chrome storage, sync and other inbuild API's.**

4. The **WEB LLm** runs as according to the wish of the user, there is a **button** which says **summarize all**, so the user click on summarize whenever he feels to be. This **reduces the load** on the browser, as llm will be loaded according to the wish of the user.

5. All of the **error hanlding** is done, so if user tries to sign in (if already have an account, password less than 8 characters, login password/details incorrect, response internal server(backend) error, webLLm error) all the errors have been taken into account **with proper** frontend **response**.

6. The **App/Platform/Cross-Platfrom Security** has been taken into consideration with the help of **bcrypt** module, which applies a **cryptographic algorithim** when saving/searching for user by its Id or password in the DataBase, along with the **JWT** which just **authenticates valid users** with a generated sceured token whose valididty is of 1days always which has been **implemented in every backend api end point**.

7. The Users can **not only securly watch their profile summary**, but also they could **search for other users feed**, just by typing in the search box in the Search Section. This makes the app **feel like** a **social media app** where people could browse the other person's current digital activity, not directly(obviosly as its against user privacy) but it **lets know the intrests of the user**.

8. **The UI design** along with the **React Router DOM** has made the app **more smooother**, just like a **single page applcation** without lags, in both extension as well as the app.

9. And many necessary things are **managed** using the **enviorment variables** in the backend mainly with the help of **dotenv**.

> This list will never end, you could give a try yourself to the app.

## How to Run It Yourself
Follow up on Below

