# ==== 20/05/2021 ===
# first steps to Migrate a React App to TypeScript
1- npm install --save typescript @types/node @types/react @types/react-dom @types/jest
2- npx tsc --init
3- convert and make changes needed to make ShowArticles/AddArticle components Typescript

NOTES :
A- A question mark after an identifier 
means that the parameter is optional. For example:

function stringify123(callback?: (num: number) => string) {
  if (callback === undefined) {
    callback = String;
  }
  return callback(123);
}

B-Optional vs. default value vs. undefined|T  
The following three parameter declarations are quite similar:

Parameter is optional: x?: number
Parameter has a default value: x = 456
Parameter has a union type: x: undefined | number

C-Rest parameters  
We can also use rest parameters in TypeScript parameter definitions. Their static types must be Arrays:

function joinNumbers(...nums: number[]): string {
  return nums.join('-');
}
assert.equal(
  joinNumbers(1, 2, 3),
  '1-2-3');


  https://2ality.com/2018/04/type-notation-typescript.html
----------------

https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
# ==== TYPESCRIPT START FROM HERE ======

# === 16/05/2021  ===
# Implement useSelector/useDispatch
- replace connect() mapStateToProps and mapDispatchToProps with
useSelector/useDispatch
- create a copy of Articles page called Articleshooks as an example of use useSelector/useDispatch
# === 11/05/2021 2 ===
- What is a Redux middleware?(thunk and saga)
Redux middleware is a function or a piece of code that sits between action and reducer and can interact with the dispatched action before reaching the reducer function.
 - https://www.eternussolutions.com/2020/12/21/redux-thunk-redux-saga/
 - example : https://medium.com/@lavitr01051977/make-your-first-call-to-api-using-redux-saga-15aa995df5b6

# === 11/05/2021 1 ===
- Saga works like a separate thread or a background process that is solely responsible for making your side effects or API calls
- redux-thunk, which uses callbacks which may lead to situations like 'callback hell' in some cases
- we will use  redux-thunk example then saga
- for redux-thunk : 
(simple example :https://www.digitalocean.com/community/tutorials/redux-redux-thunk)
- get articles from api online
- example contain loader and error display
# === 10/05/2021 4 ===
- improvement for material color ... it is not an important commite
- remove underline from Link component

# === 10/05/2021 3 ===
- check user login in App by Resrict component and redirect to login page if not loggedin
# === 10/05/2021 2 ===
- check user login in App and redirect to home if not loggedin
# === 10/05/2021  ===
- use of useLocation to search URL query
# === 9/05/2021 3 ===

- use navegate history to go back to previous page
- bmw cars list can be reached from two place : 
- from allproducts page
- from allcars page

so we will back to the correct used page by using history

also from home page we can back to the last visited page before come to home

The useHistory hook gives you access to the history instance that you may use to navigate.

# === 9/05/2021 2 ===
- route with the using of URL parameters
http://localhost:3000/myapp/products/cars/bmw/1

using useParams hook
display car details by id

# === 9/05/2021 ===
- make an example for nested routes
- prodaucts,cars,....
- explain when to use withRouter
- explain the use of useRouteMatch

# === 06/05/2021 ===
- fix change direction and clean not nessecary code
- make reddirection to theme 
- update main menu titles depending on language

# === 05/05/2021 ===
- get language from store in all existing component
- change title of website depending on that
- add languages files translator 
- change texts of interface depending on these files and current language using  language provider of "react-intl" library 

note : we shoud install specific version of  react-intl ....
 npm i -s react-intl@^2.4.0

- add DroidKufi-Regular font 

# === 04/05/2021 ===
- adding language switcher component
- adding language switcher reducer and actions
- fix : move theme switcher from container to components folder and update imports

# === 03/05/2021 ===
#
- ADDING THEME FILES AND STYLES TO REDUX (main.css)
- RE-STRUCTURE REDUX STOR , AND MAKE FOLDER FOR EVERY SPECIFIC SETTINGS
- COMBINE DEFFIRINT REDUCERS ( THEME , ARTICLES) IN ONE STORE AND WORK WITH THIS  STORE
- use materialui themeing 

