# Kalopsia (E-commerce)

A full stack JavaScript application for sneaker enthusiasts who want to purchase sneakers.

## Why I Built This

I have always been passionate about sneakers and wanted to build an application that combined this passion to create a enjoyable shopping experience.

## Technologies Used

- React.js
- Webpack
- Tailwind CSS
- Node.js
- Express.js
- PostgreSQL
- HTML5
- CSS3
- Heroku

## Live Demo

Try the application live at [https://student-grade-table.lfz.com](https://student-grade-table.lfz.com)

## Features

- Users can search for products.
- Users can view a list of search results.
- Users can view the product.
- Users can add product to cart.

## Preview

![SGT React](assets/sgt-react.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher

### Getting Started

1. Clone the repository.
    ```shell
    git clone https://github.com/brandonechin/final-project.git
    ```
1. Install all dependencies with NPM.
    ```shell
    npm install
    ```
1. Start PostgreSQL.
    ```shell
    sudo service postgresql start
    ```
1. Create a local .env file from provided example file.
    ```shell
    cp .env.example .env
    ```
1. Update the DATABASE_URL in the .env file. Update 'changeMe' to the name-of-database you wish to create.
    ```shell
    DATABASE_URL=postgres://dev:dev@localhost/changeMe?sslmode=disable
    ```
1. Create a database using the name-of-database set in the .env file.
    ```shell
    createdb name-of-database
    ```
1. Import the example database to PostgreSQL and start the database (http://localhost:8081/).
    ```shell
    npm run db:import
    pgweb --db=name-of-database
    ```
1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
