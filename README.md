This website is a traffic monitor. It can be really help full, when we want analyse traffic across different countries. to make this website functional i need a backend support.

It will be a over kill to make seperate projects for frontend and backend. so I have everything in same project. However the backend acts like a rest full api. for commucation and data transfer i have used fetch api.

Since it is a frontend task. relavant files are :
view/home.ejs(it's equivalent to index.js)
public/style.css
public/script.js

according to task :

1. Background_Tasks_API : background task is experimental for now, so i have use setInterval in public/script.js line 153.
2. Canvas_API : Chart is a canvas in view/home.ejs line 49.
3. Geolocation_API : this api only gives x and y coordinates to get location from this information opencage api is used. but it would be stupid to hardcode api key on frontend so i have used backend. on frontend i have used geolocation_api in public/script.js line 91.
4. Intersection_Observer_API : this website is just used to show data so it wasn't neccessay
5. Network_Information_API : public/script.js line 106.

to run this project you will need .env file.
PORT=
MONGODB_URI=
OPENCAGE_KEY=
