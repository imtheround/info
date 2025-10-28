##  To get Started

Git is recommanded to install this project, you will need npm to run this webstie

To install the source code
```bash
git clone -b formulaire https://github.com/imtheround/info.git
```
To install dependencies 

```bash
cd info/
npm install
```

To run the website after installing dependencies 

```bash
npm run dev
```
Note: Running the dev build will have some lag when rendering the background picture + compile time when visiting a page first time

Or to build the website 
```bash
npm run build
```
then
```bash
npm run start
```
Webpage will typically up on `localhost:3000` unless the port is taken

--------------------------------------------------------
### FOR THE FORMULAIRE

Open `localhost:3000` to see the webpage (after installing the requirements & ran npm run dev)

The source code is in app/page.tsx and app/registered/*, the global.css is automatically generated, layout.tsx contains the basic settings of the site (description, page name)

All the code until the return function (line 162) is the typescript used to validate password, handle form and redirect, the html and css is from line 162

Im using tailwind css for styling, https://tailwindcss.com/ so the css is directly in the html, eg: className="bg-black" = background black or text-white = white text

If you want to see the css code (like .bg-black {background-color: var(--color-black)}), install tailwind extension in vscode and hover over the classname

Some varaibles arent really named properly, refer to the comments for their actual functionality

I used prettier for code format https://prettier.io/

where i used gpt:
- to prevent full refresh when submiting the form line 
- to add/remove items from the reason array 

other resources used:
stackoverflow 
tailwind docs
nextjs docs
react docs


The easter egg:
when username is set as bounce, and the form is submitted, the form will start bouncing
submit the form again with the username anything else then bounce to stop it from bouncing

--------------------------------------------------------
Added features:
```
- easter egg when entering username bounce and submitting
- animation on hover (register div) line 116
- error message 
- display live password eligibility instead of only displaying it on submit (most important feature ig)
- detection for special character
- detection for minimum 8 characters
- actual redirected page (/registered) with username displayed
- uses html directly in the page to indicate requirments
```