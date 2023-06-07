PHASE 3 PROJECT
## MEME GENERATOR

#### Welcome to the Meme Generator application!

### General Information
This is a web application that allows users to create, view and search for memes. The application consists of a React frontend that communicates with a Sinatra backend to store and retrieve data. The app runs on a single page, with all client and API interactions handled asynchronously using JSON as the communication format.

Getting Started
To get started with the application, please follow the instructions below:

Clone or download the repository to your local machine.

      https://github.com/Ronkibet/meme-app.git

Navigate to the project directory in your terminal.

     cd meme-app
Run bundle install to install all the required Ruby gems.

     bundle install
Run rake db:migrate to create the necessary database tables.

    rake db:migrate
Start the Sinatra server by running 

     ruby app.rb.
In a separate terminal window, navigate to the "client" directory.
Run 

      npm install
 to install all the required packages for the React app.
Run

    npm start 
to start the React app.
Access the application by visiting http://localhost:3000 in your web browser.
Functionality
The Meme Generator application provides the following functionality:

- User authentication: Users can register and login to the application.
- Add a new meme: Logged-in users can create and save their own memes.
- View all memes: Logged-in users can view all memes that have been added to the application.
- Search memes: Users can search for memes by title or date published.
- Update meme details: Logged-in users can edit the details of their own memes.
- Remove meme: Logged-in users can delete their own memes.

<b>Note that users cannot update or delete memes they have not added themselves.<b/>

Deployment
The application can be deployed using any deployment platform of your choice.
## Author:  [Ronnie-Kibuye](https://github.com/Ronkibet)

## License
This repository is licensed under the MIT license.

Thank you for using our Meme Generator application!