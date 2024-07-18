# <a align="center" href="https://foodstack-8524b.web.app/home">Foodstack</a>

[![Watch the video](https://img.youtube.com/vi/InMo2uwrvgg/0.jpg)](https://www.youtube.com/watch?v=InMo2uwrvgg)

#### Front-end:
<p align="left">
  <a>
    <img src="https://skillicons.dev/icons?i=angular,typescript,html,css" />
  </a>
</p>

#### Back-end:
<p align="left">
  <a>
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
  </a>
</p>

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
   - [Blog](#blog)
   - [Calculator](#calculator)
   - [Authentication](#authentication)
   - [Dashboard](#dashboard)
3. [Getting Started](#getting-started)
   - [Installation](#installation)
4. [Host](#host)


## Introduction <a name="introduction"></a>

This application is crafted to empower users in their health and body goal journeys by providing a comprehensive suite of tools for tracking daily intake of calories and macronutrients. <br>Whether the goal is to lose weight, gain muscle, or maintain current physique, this application offers valuable resources and functionalities to support users in achieving their objectives.

## Features <a name="features"></a>

### Blog <a name="blog"></a>

The Blog section is dedicated to educating users on various aspects of nutrition, health, and sports. It offers a wealth of information to help users make informed decisions about their diet and body goals. <br> The blog features a user-friendly design with an intuitive UI, ensuring a pleasant browsing experience.

- **Informative Articles**: Comprehensive articles on nutrition, health, and sports to guide users in their wellness journey.
- **Pagination**: Efficient pagination for easy navigation through blog posts, ensuring a seamless user experience.


### Calories Calculator <a name="calculator"></a>

Calculator is a tool designed to help users manage their nutrition effectively.

- **BMR & TDEE Calculation**: Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on:
  - **Age**
  - **Gender**
  - **Weight**
  - **Height**
  - **Activity Level**
    
Upon calculation, the calculator provides the following recommendations:

- **Weight Maintenance**: Calories required to maintain current weight.
- **Mild Weight Loss**: Recommended daily calorie intake for mild weight loss.
- **Weight Loss**: Recommended daily calorie intake for effective weight loss.
- **Extreme Weight Loss**: Recommended daily calorie intake for aggressive weight loss.
- **Muscle Gain (0.25kg per week)**: Recommended daily calorie intake for gradual muscle gain.
- **Muscle Gain (0.5kg per week)**: Recommended daily calorie intake for accelerated muscle gain.


### Authentication <a name="authentication "></a>

Contains a secure authentication system leveraging session storage within the browser.<br>It implements robust security measures such as JWT tokens for access and refresh mechanisms, along with bcrypt for password hashing. <br>The front-end ensures input validation and sanitization for enhanced security and pleasant user experience.

- **Session-based Authentication:** Utilizes browser session storage for managing user sessions.
- **JWT Tokens:** Implements JSON Web Tokens (JWT) for access and refresh token generation and validation.
- **Back-end Security:** Utilizes bcrypt for hashing and securely storing user passwords.
- **Front-end Security:** Implements input validation using default Validators from Angular and sanitization to prevent common security vulnerabilities.
- **Notifications:** Uses Toastr to notify users for errors or incorrectly entered data.


### Dashboard <a name="dashboard"></a>

Dashboard is a secure area accessible only to registered users. It serves as a comprehensive tool for tracking daily food intake and nutritional information.
Using Edamam API
- **Food API:** This project integrates the Edamam API to fetch detailed food and nutrition data, enhancing functionality related to recipe search, ingredient analysis, and nutritional information retrieval.<br>
For more information on the Edamam API, refer to the [Edamam API Documentation](https://developer.edamam.com/edamam-docs-nutrition-api).
- **Diary Management:** Users can log their daily food intake and track calories, protein, fat, and carbohydrate consumption.<br> This is facilitated by an integrated API that provides accurate information about food calories and nutrients.
- **Calendar:** Allows users to navigate between different days to view and manage their food intake history.
- **Nutrient Chart:** Provides a visual representation of daily protein, fat, and carbohydrate intake calculated from logged foods.
- **Custom Foods:** Users can add/remove/edit custom foods with specified calories and nutrients per 100g, which can then be used within the diary.
- **Sidebar:** The sidebar is designed for optimal user interaction, offers intuitive navigation and enhances usability:Can be toggled and provides quick access to different routes.

## Getting Started <a name="getting-started"></a>

### Installation <a name="installation"></a>

clone repository
```
git clone https://github.com/viiktorstefanov/Food-Stack-Angular.git
```
navigate to the "client" folder:
```
cd client
```
Type in the terminal
```
npm i
```
Install all dependecies and then go for:

```
ng s
```

Open new terminal and type:
```
cd ../
```
```
cd server
```
Install all dependecies for the server: 
```
npm i
```
Then run the server:

```
npm start
```
Ensure to update the MongoDB URL and configure all necessary routes to local settings.

## Host <a name="host"></a>

- Front-End deployed on Firebase.
- Back-End: deployed on Render.

You can see it here: <a href="https://foodstack-8524b.web.app/home">Foodstack</a>

