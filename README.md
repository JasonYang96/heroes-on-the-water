# Heroes on the Water 2.0
## Created by Swag Ramon
### AT&T Intern Coding Challenge, Summer 2016

Swag Ramon presents a fully responsive, end to end solution for the nonprofit Heroes on the Water. Features at a glance include a flat and minimal design, public-facing front-end with optimized donation and signup strategies, and an intelligent management system on the back-end to facilitate and lend structure to various levels of user access and responsibilities within the organization. Both facets of the website are responsive and look great on popular screen sizes. We hope that this take on Heroes on the Water proves useful, thought-provoking, and inspiring. 

### Requirements
- [NodeJS](https://nodejs.org/en/download/)
- [Node Package Manager NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/download-center#community)
- A web browser (Chrome required)

### Technologies Used
- PassportJS 
- Paypal API
- Bootstrap 3.0
- EJS Templating Engine
- MongoDB, NodeJS, ExpressJS, AngularJS

### Installation Instructions
1. [Install node and npm](https://nodejs.org/en/download/) for your respective OS.

2. [Install MongoDB](https://www.mongodb.com/download-center#community) for your respective OS.
3. Clone our [code repository](https://codecloud.web.att.com/projects/ST_HOW2016) by either:
   1. Downloading a [zip file](https://codecloud.web.att.com/plugins/servlet/archive/projects/ST_HOW2016/repos/swag_ramon?at=refs%2Fheads%2Fmaster)
   2. Or cloning via git on cmd  
   `$ git clone https://jy092m@codecloud.web.att.com/scm/st_how2016/swag_ramon.git` 
4. Change into product directory: `$cd swag_ramon`
5. Import our example database
  `$ mongoimport --db test --collection users --drop --file [path to swag_ramon]/json/users.json`
  `$ mongoimport --db test --collection regions --drop --file [path to swag_ramon]/json/regions.json`
6. Make sure $PATH variable is updated and start a MongoDB server: `$ mongod --dbpath ./data`
7. Install application: `$ npm install`
8. Our app runs on port 8080, please make sure there is nothing running on this port
9. Start Server: `$ node server.js`
10. Access Application on browser: `localhost:8080`

### Usage Scenarios
We thought you might like to see our app in action, so we loaded up a database with some filler data and made accounts for you to log in through. In order of descending privileges: 

To be an admin, login with:   
`Email: admin`  
`Password: admin`

To be a regional manager:   
`Email: reg_manager`  
`Password: reg_manager`  

To be a chapter manager:   
`Email: chap_manager`  
`Password: chap_manager`  

To be an event manager:   
`Email: event_manager`  
`Password: event_manager`  

To be a volunteer:   
`Email: volunteer`  
`Password: volunteer`  

To be a participant:   
`Email: participant`  
`Password: participant`

### Features
##### Front End
###### Home Page
* Less information that tells more about the organization and the work they do
* User signup is optimized and makes it easy to get involved with the org at any level
* Complete revamp of aesthetic elements to look modern and pleasing to the eye
* Animations that show info in a timely manner to keep your mind focused 

###### Donation System
* Created a donor wall to honor and thank the people who have donated
* Made it simple and quick to donate, consolidated all forms on original website into one 
* More personal and adaptive system, allowing all potential donors to be welcomed 
* Integration with Paypal as before to keep things simple

###### Events List
* Anyone can view a list of events in their area and choose to go, before ever making an account 
* Styling updated to reflect a more friendly and joyful atmosphere. 

###### User Authentication
* Leveraged PassportJS to allow for different types of users
* Each type of user has a subtype (Managers can be Event Managers, Chapter Managers, or Regional Managers)
* Special privileges for 'admin' account 
* Consolidated all forms on website into a single form to make it easy to get involved 
* Participants can choose to make accounts to view their progress and time

##### Backend
###### Dashboard
* Fully responsive and integrated solution for management systems and allows for all management and signup tasks to be completed on the go via phone or tablet
* Updates itself to dynamically show added content or information
* Shows personalized views for each kind of user (admin will see a different view than a participant will)
* Detects and shows viable metrics (future: making metrics reporting fully functional. It is currently only foundational)

###### Admin Manager
* Can view and manage all regions
* Has complete access to data and management systems for administrative tasks such as website upkeep
* Only 1 administrator account 
* Has all permissions of Regional Manager, Chapter Manager, and Event Manager

###### Regional Management
* Can view and manage all chapters with in a region
* Only used by regional manager for a specific region and admins
* Has all permissions of Chapter and Event Managers (shown below) 

###### Chapter Management 
* Can view and manage all events within a chapter
* Only used by chapter managers, regional managers, and admins
* Has all permissions Event Manager does (shown below)
* Can also create new events, with their own details and inventory information

###### Event Management
* Can easy view all event details such as location, place, and time, and manage all such details for a specific event
* Has an embedded inventory manager and donation system to easily track what inventory each event is using up 
* Information combined with donation management provides a complete and accurate picture of events
* Can sign people up to participate at your event (in future: send a notification to those people) and assign volunteers
* Only used by an authorized event manager for a specific event

###### Donation Management
* Can view and manage all donors and donations right from list
* Easily view all information in database, visually compressed for ease of use 
* Can develop leads and contacts to call/contact donors in the future for more donations or to update on the org

###### User Management 
* Admin can elevate user privileges 
* Users can sign themselves up for events, to participate, volunteer, or to manage
* Users can easily donate, right from the dashboard
* Users can update their settings and changes will propagate throughout database

###### Public Site Integration
* Links to logout, go home, or view donors and events, just as in the public facing site
* Continued color scheme, indicating that the website is an end to end, customized solution
* No need to deal with extraneous features or bulk that website builders attach
* Completely customizable, modularly written, templated HTML that allows for quick addition or subtraction of features and pages

###### Metrics 
* Different metrics are shown to different types of users to indicate health and responsiveness of organization at various levels
* Creates a sense of clarity and vision, you can really tell whats going on with your subordinates
* Admin can view site specific metrics such as website views, growth, amount of users, active users, etc 
* Participants can see how much time they have spent with Heroes on the Water as well as how many events they go to in a time period 
* Allows management at each level, from event manager to regional manager to executive board, to easily view and improve the organization to help as many people as effectively as possible. 

### Screenshots
For screenshots, please visit [Rakshit Garg's tSpace Files](https://www.tspace.web.att.com)  

### Known Issues
* Event and inventory deletion is buggy. Regional deletion works but deleting nested documents throw errors.
* Managing permissions, participation, volunteering, and inventory tracking systems are functional for first event only.
* A manager can only manage one single entity, i.e. a chapter manager can only manage one single chapter and everything in that chapter.  
* Adding permisions to managers does not work on firefox. 

### Next Steps

Because we only had 3 weeks to work on the website, we had to prioritize features and user stories. Below is a list of features and capabilities that we would have added in future releases and iterations.  

* Facebook Authorization, to allow for easy signup and login
* Location Services, to show events that are nearest that person's location
* Functional Metrics Services, currently only the idea and foundation are present in the code 
* Graphs and charts to leverage metrics from above
* Time tracking and reporting services for volunteers and managers
* Email and Text notification system (we would've used the Twilio API)
* Easy integration with Facebook Events since more people are more comfortable using Facebook
* A fully featured iOS and Android wrapper app to make use of the responsive website 


### Licensing 

Swag Ramon was influenced by numerous talented designers and templaters. We used a series of Bootstrap templates and adapted them to fit our needs. The following works are represented in our project: 
SNoW by Visual Soldiers
CleanBlog by StartBootstrap
Gentelella Alela

All works are free to use under the GPL and MIT licenses. 
