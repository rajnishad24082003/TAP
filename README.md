# Website Traffic Monitor

This website is a traffic monitor. It can be really helpful when we want to analyze traffic across different countries.  
To make this website functional, backend support is required.

It would be overkill to make separate projects for frontend and backend, so I have included everything in the same project.  
However, the backend acts like a RESTful API. For communication and data transfer, I have used the Fetch API.

### Since it is a frontend-focused task, the relevant files are:

- `views/home.ejs` (equivalent to `index.html`)
- `public/style.css`
- `public/script.js`

---

### According to the task requirements:

1. **Background Tasks API**  
   The Background Tasks API is still experimental. So, I have used `setInterval` instead, in `public/script.js` on **line 153**.

2. **Canvas API**  
   The chart is rendered using a `<canvas>` element in `views/home.ejs` on **line 49**.

3. **Geolocation API**  
   The Geolocation API only provides X and Y coordinates (latitude and longitude).  
   To get the actual location (city, country, etc.) from these coordinates, I have used the **OpenCage API** on the backend (to avoid hardcoding the API key in frontend code).  
   On the frontend, Geolocation API is used in `public/script.js` on **line 91**.

4. **Intersection Observer API**  
   This website is just used to show data, so using the Intersection Observer API wasn’t necessary.

5. **Network Information API**  
   Implemented in `public/script.js` on **line 106**.

---

### To run this project, you will need a `.env` file with the following:

```env
PORT=
MONGODB_URI=
OPENCAGE_KEY=
```
