# Task Management System Backend
Backend service for the task management activity

## Techstack used
NodeJS, ExpressJS, Mongoose, MongoDB, Jest, SuperTest

## Steps to run the app
1. Clone the repo ```git clone https://github.com/deekshithmd/task-management-system-backend.git```
2. Run ```yarn install``` to install all dependencies
3. Run ```yarn run dev``` to run the app
4. Now app should run at port ```8000```
5. Once backend is up and running at port ```8000```, proceed with front end setup which uses backend running at port ```8000```
6. To run tests run ```yarn run test``` which will run all tests.

## Features added
1. User signup with firstName, LastName, Email and password
2. User login with existing user email and password which returns access token which is used for authorization
3. Then there are 4 functionalities added for tasks
4. Add task to user's task list
5. Delete task from user's task list
6. Get all tasks of logged in user
7. Update particular task of the user. 
   

