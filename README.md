# 🛠️ GitHub Issue Tracker

A dynamic web application that allows users to fetch, filter, and track issues from GitHub repositories in real-time. This project demonstrates advanced asynchronous JavaScript techniques and seamless API integration.

<img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/8d6683b9-4389-4c05-823b-c9e40800581d" />
<img width="1779" height="866" alt="image" src="https://github.com/user-attachments/assets/6bdac21a-f557-4f12-86e9-650671876c3e" />

🚀 Live Demo :
(https://kawsarnk.github.io/Assignment-5/)

## ✨ Features
- **Real-time Data:** Fetches live data directly from the GitHub REST API.
- **Asynchronous Search:** Smooth searching experience using `fetch` and `async/await`.
- **Dynamic Filtering:** Filter issues based on status (Open/Closed) or labels.
- **Responsive Design:** Optimized for both desktop and mobile viewing.
- **Error Handling:** Graceful handling of API rate limits or invalid repository searches.

## 💻 Tech Stack
- **Frontend:** HTML5, CSS3, Tailwind CSS
- **Logic:** JavaScript (ES6+), Asynchronous Programming (Promises, Async/Await)
- **API:** GitHub REST API
- **Styling:** DaisyUI (Optional, if you used it)

## 🛠️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/kawsarnk/github-issue-tracker.git](https://github.com/kawsarnk/github-issue-tracker.git)

2. Navigate to the project folder:

```bash
cd github-issue-tracker
```
Open index.html in your browser or use Live Server in VS Code.


## 📖 What I Learned 
During this project (Assignment 5), I focused on:

Managing complex API states (loading, success, error).

Implementing Debouncing to limit API calls during search.

DOM Manipulation to render complex JSON objects into clean UI components.

Securely handling environment variables for API tokens (if applicable).

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Built with ❤️ by Kawsar Hamid












1️⃣ What is the difference between var, let, and const?
**Ans:** These keywords are used to declare variables.
var: The traditional way to declare variables. It is available throughout the function it’s defined in. It can be redeclared and reassigned.
let: It is block-scoped. It can be reassigned but cannot be redeclared in the same scope.
const: It is also used for varriable declare,but it is constant it cannot be reassigned or redeclared, but in array change value by push and pop.

2️⃣ What is the spread operator (...)?
**Ans:** The Spread Operator consists of three dots (...) and is used to expand or "unpack" an iterable (like an array or an object) into its individual elements.It is commonly used to make copies of arrays/objects, merge multiple data structures together, or pass array elements as individual arguments to a function.

3️⃣ What is the difference between map(), filter(), and forEach()?
**Ans:** Map,filter and forEach these are basicaly used for accesing array and getting value from it.
map(): Iterates through an array and returns a new array containing the results of calling a function on every element. The original array remains unchanged.
filter(): Iterates through an array and returns a new array containing only the elements that satisfy a specific condition .
forEach(): Iterates through each element of an array and executes a provided function. It does not return a new array.

4️⃣ What is an arrow function?
**Ans:** Arrow is also a funtion,but it more powerfull and useable then normal function.It uses the "fat arrow" (=>) and removes the need for the function keyword.Unlike regular functions, arrow functions do not have their own this context; they inherit this from the surrounding scope.

5️⃣ What are template literals?
**Ans:** Template Literals are string literals that allow for embedded expressions and multi-line strings.It is enclosed by backticks (`) instead of single or double quotes.It use interpolation via the ${expression} syntax, allowing variables and logic to be plugged directly into the string without using the plus (+) operator.
