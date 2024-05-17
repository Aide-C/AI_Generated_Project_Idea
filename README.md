My own version of my spring 2024 Software Engineering Project course at TXST.
# Project Generator Website

This website is an AI-powered tool designed to help advance learning and coding development by generating tailored projects based on users' inputs.

## Description

An in-depth paragraph about your project and overview of use.

Once the project is installed and executed the user will land on the login page. If the user doesn't have an account they will click the sign up button and create one. The account information is stored in a MongoDB database. Once they successfully log it redirects to the project generator form where the user must put inputs for the coding language, technologies, topic, and information fields. Once they submit it, these inputs will be put into a prompt sent through the openai API to get a generated README for the desired project. It will redirect to the results page and render the generated README along with another form to create the repository for the project in the user's GitHub, so long as they provide a personal access token. Afterwards, it returns a link to the repository and the user must copy the generated README into the README file. The user must click the generate new project button to either return to the generate project form or the logout button.

## Getting Started

### Dependencies

* @emotion/react
* @emotion/styled
* @octokit/react
* Axios
* Bootstrap
* Bcrypt
* Concurrently
* Cors
* Dotenv
* Express
* Express-session
* Mongoose
* Nodemon
* Openai
* React
* React-dom
* React-markdown
* React-router-dom


### Installing

* Download zip file on GitHub
* Clone repository
* Fork repository

### Executing program

* Open the terminal and in the root directory run the command:
```
npm start
```

## Authors

Contributors names and contact info

Aide Cuevas (LinkedIn in profile)

## Version History

* 0.2
    * Changed backend to Express.js instead of Flask
    * Added sessions to stop URL manipulation to non-authorized pages
    * Added logout button and function
    * See [commit change]() or See [release history]()
* 0.1
    * Project Helper listed below in acknowledgments

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [ProjectHelper](https://github.com/Zfreeman24/ProjectHelper/tree/main)
