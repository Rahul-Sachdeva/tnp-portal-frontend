# Tech Stack - 
* Frontend - ReactJS
* UI design - Vanilla CSS (preferably)
* Backend - Laravel 8
* Database - MySQL (PHPMyAdmin)

## Features are - 

### Home Page
It should support an infinite scroll option.
You should sort posts in ascending order of the updated time
Route Name - /home

### Post Page
Every post on the homepage should have a hyperlink to their respective post 
A delete and edit post button (Make sure to use REST APIs)
Route Name - /post/{post.id}

### Post Create Page
An editor of your choice should support it.
The post should be processed on the backend server and saved in the database.
Route Name - /create-post

### Markdown Editor
Used React-Markdown and other libraries for Allowing Users to create contents for posts that need Rich Text Format.

### Authentication
Users can Login with their Credentials, and can access the features available for their role

### Role Based Access
Only Admin can Delete, Update Posts
Only Admin can Register Users

### Read Complete Posts on Home Page
All the Posts are Listed in the Home Page.
The User can Either open the Post in a new Page 
or the user can also read the post in home Page Itself.

### Standard Directory Strucutre
All the Files are Well Organised in Specific Folders.

### Search Posts 
User can enter the Search Term to see only Specific Posts

### Infinite Scroll
The Posts are Requested from the Backend not all but as the user Scrolls the already Fetched Posts

### Confirmation Dialog
Before Deleting a Post, the User is asked for Confirmation so as to ensure no misclicks Delete Posts.
