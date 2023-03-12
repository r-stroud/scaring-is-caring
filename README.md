# ScaringIsCaring
![image](https://user-images.githubusercontent.com/106875994/224573827-76b28cb7-1cb4-49fb-9f8e-cfff4ff3dc32.png)

ScaringIsCaring is a recommendation application that allows users to create, edit, search, and recommend different "scares" to "fiends". A "fiend" is a user they have friended and a "scare" being any any book, film, or game of the horror genre.

This project was created as a Front End Capstone project while attending Nashville Software School's Full Stack Web Development Bootcamp. 

## Table of Contents
- ScaringIsCaring
  - Table of Contents
  - Project Description
  - Technologies Used
  - Project Goals
  - Challenges
  - Future Updates
  - How to Install and Run
  - Credits

## Project Description

As a horror fan it is fun finding titles to recommend to like minded friends and family. Likewise it is equally exciting to receive a good recommendation. However it can be difficult to keep up with all the recommendations. This app makes it easy to recommend anything horror related, keep track of your collections and recommendations, rate and view other ratings of "scares", and view and add a user's "fiends".

## Technologies Used

[<img src="https://user-images.githubusercontent.com/106875994/224574830-4c7b3853-fc08-412a-b8cd-c2a40c462864.png" width="60">](https://reactjs.org/)
[<img src="https://user-images.githubusercontent.com/106875994/224577096-8aa74819-440c-4dac-ade6-043b3efafaf4.png" width="60">](https://reactrouter.com/en/main) [<img src="https://user-images.githubusercontent.com/106875994/224575102-80fa8326-c6de-4297-8309-aab0c495c9c8.png" width=60>](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [<img src="https://user-images.githubusercontent.com/106875994/224575292-710f917a-623b-4b6f-80c8-21280b0538b0.png" width="60">](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Project Goals

This capstone project was started when the focus of our studies was about to shift from front-end to back-end. I really wanted to hone all the skills I had been learning up until this point and test myself to see how well I could build a fully functioning and engaging app without the assistance of any additional frameworks or node packages outside of any provided to us at the start of the project (React and React Router DOM).

## Project Challenges

Attempting to complete this project without the use of additional frameworks or node packages was quite the challenge. There were many interactive features I wanted to include in this project, such as each "scare" card being able to swap from the cover to the details upon clicking the header. Time manangement, researching code, and balancing if features were possible to implement within the time alloted were regular challenges. 

## Future Updates

I am really happy with how this project turned out and I feel like I gained a great deal of experience and knowledge in completing it. In future updates I would like to look at organzing the CSS/JS to make it easier for future changes and readability. I was able to accomplish a lot in this project, but I feel like I could have organized it a bit better.

There are also numerous features I would like to add to the app itself:
- Customize profiles with profile names and portraits (CRUD functionality)
- View "fiends" profile / collections upon click
- Complete the Queue feature
- Add new category outside of the existing book, game, movie
- etc.

## How to Install and Run

1. Git clone this repo to your local machine.
2. Setup a mock database in javascript and serve to [http://localhost:8088]. Mock database should have the below information included.
```{
"users" : [],
"scares" : [],
"scareTypes" : [],
"finished" : [],
"fiends" : [],
"recommended" : [],
"ratings" : [],
}
```
4. 
5. 


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
