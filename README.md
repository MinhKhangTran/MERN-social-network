<!-- PROJECT LOGO -->
<br />
<p align="center">


  <h3 align="center">Social Network MERN</h3>

  <p align="center">
   
    
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[Live Demo](https://social-network-mern.netlify.app/)

This is a small social network app made with the MERN Stack. There are auth and crud functions. There are three models: User, Profile and Post. They have a relationship to each other. It is like a normal social app. At first you can log in or register. Then you can create your profile, if you don't have one yet. After that you can move freely around. 
You can see other Profiles and post, comment and (un)like on the dashboard. 
As user-interaction there are toasts. The rerender between the actions is not optimal. p.e. The app have to rerender everything only to update a like. 
I have to study more about this to avoid this behaviour.
It looks simple but there is more logic than i thought. But it was definetly a good experience. 

The backend used technologies like node, express, mongoose and some validation, async-handler and access control. 

The frontend was made with react, redux toolkit, typescript and chakra UI. 

This project is based on brad traversy mern course on udemy with my own flavor 

### FYI
API_ENDPOINT:

https://social-network-mkt.herokuapp.com/

### Built With

#### Backend
* Node
* Express
* Mongoose

Hosted on:
* Heroku

#### Frontend
* React
* Typescript
* Redux Toolkit
* ChakraUi

Hosted on:
* Netlify




<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MinhKhangTran/MERN-social-network.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```




<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

### These guys helped me a lot. Props to them

* John Smilga
* Brad Traversy
* Ferlobo1985

