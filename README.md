# Travlr Getaways — Full Stack Web Application

A MEAN stack travel booking application built for CS 465, featuring a customer-facing 
Express/Handlebars website and an Angular admin single-page application (SPA) secured 
with JWT authentication.

## Tech Stack
- **MongoDB** — NoSQL database (via Mongoose)
- **Express** — Node.js web framework, REST API, and server-rendered customer site
- **Angular** — Admin SPA for CRUD trip management
- **Node.js** — server runtime

## Project Reflection

### Architecture

This project used three distinct approaches to frontend development, and building 
all three side by side made their tradeoffs clear. The earliest version of the 
customer-facing site was static HTML/CSS — simple, but every page was hand-written 
and disconnected from any real data. That evolved into server-rendered Handlebars 
templates, where Express controllers pull data from MongoDB and inject it into HTML 
before the browser ever sees it; this keeps the client simple and works well for 
public pages that don't need rich interactivity. The Angular admin SPA is a different 
model entirely: the browser downloads the application once, then handles routing, 
rendering, and data-fetching itself, talking to the server only through a JSON REST 
API. The SPA gave the admin side a much richer feel — adding or editing a trip updates 
instantly without a page reload — but it came with real added complexity, from routing 
and component structure to change-detection issues I didn't have to think about at 
all on the Handlebars side.

The backend uses MongoDB, a NoSQL database, mainly because trip data doesn't need 
the rigid relational structure a SQL database would enforce. Documents map naturally 
onto JavaScript objects, which meant less translation between what the database 
stores and what the API sends and the frontend consumes. Using Mongoose on top of 
MongoDB still let me enforce structure through schemas and required-field validation, 
so I got flexibility without giving up data integrity entirely.

### Functionality

JSON and JavaScript are related but not the same thing: JSON is a plain-text data 
format (a subset of JavaScript's object-literal syntax) used purely to represent data, 
while JavaScript is the programming language that can create, parse, and manipulate 
that data. JSON is what actually ties the frontend and backend together in this 
project — Mongoose queries return JavaScript objects that Express serializes to JSON 
in an API response, and Angular's HttpClient deserializes that same JSON back into 
TypeScript objects the components can bind to. Neither side needs to know the other's 
internal implementation; JSON is the shared contract between them.

I refactored code at several points to improve functionality and reduce duplication. 
The clearest example was pulling trip-rendering logic out of a single monolithic 
Angular component and splitting it into a `trip-listing` component (fetching data 
and looping over results) and a reusable `trip-card` component (displaying one trip). 
That let the same card markup get reused anywhere a trip needs to be displayed, 
instead of duplicating HTML. Similarly, moving all HTTP calls into a single 
`trip-data.service.ts` meant every component that needed trip data called the same 
methods instead of each writing its own HTTP logic. Reusable UI components like this 
pay off in a few concrete ways: changes to how a trip is displayed only need to happen 
in one place, testing is easier since each piece has a narrow responsibility, and 
new features can be built faster by composing existing components rather than writing 
new markup from scratch.

### Testing

Testing a full stack app with a security layer meant testing in layers, not all at 
once. I always tested the API endpoints directly in Postman first, independent of 
any frontend — checking that GET, POST, PUT, and DELETE all returned the correct 
JSON bodies and HTTP status codes (200 for success, 201 for created, 404 for a 
missing resource, 401 for unauthorized). Adding JWT authentication added a new 
dimension to that testing: I had to verify not just that an endpoint worked, but 
that it correctly rejected requests without a valid token (401) and correctly 
accepted requests with one, by registering a user, logging in to get a token, and 
manually attaching it as a Bearer token in Postman before testing the protected 
routes. Only after the API was verified on its own did I move to testing the Angular 
SPA end-to-end in the browser, confirming the same CRUD operations worked through 
the actual UI and that the login flow correctly gated access to admin features. 
Keeping these layers separate made debugging much faster, since a failure in the 
browser could usually be traced back to whether the API itself was already confirmed 
working in Postman or not.

### Reflection

This course gave me hands-on experience with the full breadth of a modern web 
application stack, not just isolated pieces of it. Going into this course I had a 
fairly strong backend and scripting background from personal projects, but I hadn't 
built a browser-based frontend framework application or wired a full REST API to a 
database and a client. By the end of this project I had done all of that: designing 
a MongoDB schema, building a REST API with proper status codes and validation, 
building an Angular SPA with components and services, and layering authentication 
on top of it. That combination — comfortable across the whole stack rather than 
just one layer — is exactly the kind of skill set I think makes a candidate more 
marketable, since most real development work touches more than one layer of an 
application. I'm leaving this course with a much clearer mental model of how a 
request actually flows from a browser click all the way to a database and back, 
and a lot more confidence troubleshooting when something in that chain breaks.

## AI Usage Acknowledgment

I used Claude (Anthropic) throughout this project to help troubleshoot environment 
and configuration issues, scaffold and debug the MEAN stack application, and draft 
supporting documentation including this README. All code was written and tested by 
me, and functionality was verified at each stage through direct testing in the 
browser, Postman, and MongoDB Compass.
