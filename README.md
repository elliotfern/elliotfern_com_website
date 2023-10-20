# Open History

## [See the App!](https://open-history.netlify.app/en/homepage)

![App Logo](https://media.elliotfern.com/img/openhistory.png)

## Description

Open History is an independent publishing project that offers free access to History courses to its readers.

#### [Client Repo here](https://github.com/elliotfern/open-history-client)

#### [Server Repo here](https://github.com/elliotfern/open-history-server)

## Backlog Functionalities

## Technologies used

Technologies used in the project: HTML, CSS, Javascript, React, axios, React Context.

# Client Structure

## User Stories

List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **view all courses saved** - As a user I want to see all the courses that I saved.
- **view all lessons saved** - As a user I want to see all the lessons that I saved.
- **books create** - As a user I want to create a book recommendation.
- **comments create** - As a user I want to create a comment in one article.

## Admin Stories

- **comments edit and remove moderation** - As a admin I can to edit and remove all comments.
- **books edit and remove** - As a admin I can to edit and remove all books.

## Client Routes

## React Router Routes (React App)

| Path                          | Page         | Components        | Permissions             | Behavior                                                      |
| ----------------------------- | ------------ | ----------------- | ----------------------- | ------------------------------------------------------------- |
| `/:lang/homepage`             | HomePage     |                   | public                  | Home page                                                     |
| `/signup`                     | Signup       |                   | public                  | Signup form, link to login, navigate to homepage after signup |
| `/login`                      | Login        |                   | public                  | Login form, link to signup, navigate to homepage after login  |
| `/profile`                    | Profile      | EditProfile       | user only `<IsPrivate>` | Navigate to homepage after logout, expire session             |
| `/:lang/course/:nameCourse/`  | Course       | AddGame, GameCard | public                  | Shows a course page                                           |
| `/:lang/article/:nameArticle` | Article      |                   | public                  | Shows an article page                                         |
| `/:lang/about-author`         | About author |                   | public                  | Shows information about author                                |
| `/books`                      | Books        |                   | public                  | Shows all books                                               |

## Other Components

- Navbar
- Footer
- AuthorBoox
- Comment
- SearchBooks

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

## Context

- auth.context

## Links

### Collaborators

[Elliot Fernandez](https://elliotfern.com)

### Project

[Client Repository](https://github.com/elliotfern/open-history-client)

[Server Repository](https://github.com/elliotfern/open-history-server)

[Deploy Link](https://elliotfern.com)
