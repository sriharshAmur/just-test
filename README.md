# Just Test: Workshop Application

Welcome to **Just Test**, the hands-on workshop where you will learn to build and test a restaurant menu application! This workshop is designed to help you understand the fundamentals of automated testing using Cypress, while working on a fun project inspired by Just Eat Takeaway. In this guide, you'll find all the steps required to run the Vite project, along with information about the workshop, technologies used, and the authors.

## Workshop Overview

**Just Test** is a 3-hour workshop designed for Saxion computer science students to explore end-to-end testing in web applications. You'll learn how testing plays a crucial role in ensuring quality software and gain hands-on experience writing automated tests with Cypress.

The focus will be on building a simple restaurant menu application using React and then implementing end-to-end tests to ensure all features work correctly. We'll break down concepts and give you practical experience that will leave you confident about testing modern web applications.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: Lightweight state management library to handle application state.
- **Vite**: A fast development build tool to create the React project.
- **Cypress**: A testing framework for writing end-to-end tests.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** or **yarn** (v6 or higher)

## Getting Started

Follow these steps to set up and run the Vite project on your local machine.

### Step 1: Clone the Repository

First, you'll need to either clone the repository to your local machine or download the zip file from GitHub.

To clone the repository:

```sh
git clone https://github.com/your-username/just-test.git
```

Or download the zip file and extract it.

Navigate to the project directory:

```sh
cd just-test
```

### Step 2: Install Dependencies

Once you're in the project directory, install the required dependencies.

Using npm:

```sh
npm install
```

### Step 3: Run the Development Server

Start the development server to preview the application in your browser.

Using npm:

```sh
npm run dev
```

This will start a development server, and you should see output indicating where to access the application, typically at `http://localhost:3000`.

### Step 4: Running Cypress Tests

In this workshop, we'll write end-to-end tests using Cypress. Follow these steps to open the Cypress testing environment:

1. First, build the project:

   ```sh
   npm run build
   ```

2. Run Cypress:

   ```sh
   npx cypress open
   ```

   This will open the Cypress test runner, where you can select and run the provided tests or create new ones.

## Workshop Exercises

During the workshop, you'll:

1. Learn the basics of automated testing, including why it's important.
2. See a live demo of how features are implemented, how they can break, and how testing saves the day.
3. Work alongside facilitators to build tests for the restaurant menu application.
4. Write your own tests to solidify your understanding of end-to-end testing.

By the end of this workshop, you'll have hands-on experience with state management, React components, and the Cypress testing framework.

## Authors

**Sriharsh Amur** (Web Developer)

- **GitHub**: [SriharshAmur](https://github.com/SriharshAmur)
- **LinkedIn**: [Sriharsh Amur](https://linkedin.com/in/sriharsh-amur)

**Jonathan Machado** (Lead Quality Engineer)

- **GitHub**: [jedicwb](https://github.com/jedicwb)
- **LinkedIn**: [Jonathan Machado](https://www.linkedin.com/in/jonathan-d-machado)

We hope you enjoy this workshop and gain practical skills that you can apply in future projects. Feel free to reach out if you have any questions or feedback!

Happy Testing! 🚀
