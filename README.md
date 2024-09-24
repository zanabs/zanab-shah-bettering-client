# zanab-shah-bettering
Repo for final capstone project

# Project Title

Bettering.ca

## Overview

Bettering.ca is a social prescription platform which allows physicians and other care providers to "prescribe" things that are not medicine to vulnerable patient populations. 

### Problem 

The Canadian healthcare system is continuously overwhelmed by a growing patient population and a shortage of healthcare providers, straining its capacity to deliver timely and effective care. A significant portion of the burden stems from diseases that are largely preventable; however, due to the scarcity of personnel and the ongoing "health-human resources crisis", the system must prioritize treating advanced stages of illness over interrogating the root causes of illness. Moreover, for the most vulnerable patients disease is "oppression-borne" and caused by systemic issues such as poverty, racism, and substance abuse. Resolving illness for equity-denied patient groups requires much more than medical intervention—-it requires access to comprehensive social infrastructure that can establish long-term and sustainable health and well-being. 

It is unrealistic to expect care providers, who are already facing several limitations in their ability to practice medicine, to bridge the gap between the growing burden of oppression-borne illness and target the underlying social causes of disease. In reality, a general physician in Canada will have, on average, just 13 minutes with their patients to discuss their concerns and must prioritize the issues that are most threatening to their immediate wellbeing. Beyond these material limitations, it is not possible for any single physician or care provider to answer to *all* the social and systemic causes of disease, or know how to resolve those issues. After all, physicians are charged with implementing medical interventions--not social ones. 

On the opposite end of this problem are the social-change organizations themselves, that lack consistent funding, are relatively unknown to the broader community and are disconnected involuntarily from the medicine community. 

Currently, the most common stop-gap exists in the form of shared lists, google docs, or word of mouth between physicians and other care providers who actively document community organizations that can address the social roots of preventable illness among their vulnerable patient populations. This rudimentary solution relies on care providers themselves to do the legwork of maintaining shared lists, and even more challenging still, requires individual physicians to first *care* about concepts such as social justice, social medicine and health equity. 

Bettering.ca aims to address this problem using a *social prescription platform* that connects care providers with community organizations, charities, non-profits, foodbanks and government offices that manage access to resources such as housing, employment, financial support and nutrition. 

Through Bettering, physicians and care providers can refer their patients to 
experts with the capacity to address the root causes of illness and propagate lasting change in their overall wellbeing status. 

### User Profile
Care providers: 
    - Recognize the importance of "social medicine," and holistic care but do not have the time or expertise to implement social interventions in healthcare
    - Looking for trusted organizations and professionals in their community to refer patients' whose root causes of disease are social and not only medical 
    - Struggle keeping up with developments in social medicine and cannot prioritize underlying causes of disease 
    - Do not know which social-change organizations are culturally appropriate and/or relevant for their patient populations 

### Features

    - During an appointment with a patient I can quickly peruse a database of social-change organizations and find their working hours and general contact information
    - I can search for social-change organizations organized into the following categories: "food & nutrition", "mental health", "shelter", and more. 
    - I can apply the following filters to narrow my search based on the needs of my patients: "translation services available", "low cost/sliding scale/subsidy available", "families welcome", etc
    - I can use a map view to look at which organizations are closest to where the patient resides or my practice and refer accordingly 
    - I can look at a detailed view of 

## Implementation

### Design + Development

- React
- JavaScript
- Express
- Server Libraries:
    - express 
- Client Libraries: 
    - react, react-router & axios for API calls 
- Mui Material UI library (https://mui.com/material-ui/getting-started/)
- Google Maps React Library (in particular, the use of the Advance Marker to replace map-points)

### APIs 

- Google Maps API


### Sitemap 

- Home: headline describing site (social prescription platform), followed by "enter site" button, navigation bar with "contact" link to LinkedIn profile. Search, login/signup to be made active for demo later this week. 
![Home page](/WebPage-Screenshots/Home.png)

- City Selector Page: Select City (Only Vancouver is currently active) --> Drawer with legend describing map-markers by category (food, shelter etc), and then map-view (the MapCard component) of all social change orgs. 
![Legend Drawer](/WebPage-Screenshots/Legend-Drawer.png)
![City Selector page](/WebPage-Screenshots/City-Selector.png)
![View all resources page](/WebPage-Screenshots/View-All-Resources.png)

- Clicking any category takes you to the Category Page, where resources are listed by category. User can search using tags, or manually enter the name of the location they're looking for. The MapCard component, which renders in different forms (the most general form occuring when a city is selected and all resources are loaded), shows only those resources that are within the selected category.

- Across all map views/renderings of the MapCard component, clicking on a map-marker renders a feature of the "Advance Marker" component which provides a button leading to real time Google directions. 
![View all resources in category](/WebPage-Screenshots/View-All-Resources-in-Category.png)

- Clicking on a particular resource takes you to the Resource Detail page, which loads the most specific version of the MapCard with just a single location and a description of the services provided + the associated tags. 
![View resource details page](/WebPage-Screenshots/View-Resource-Details.png)

### Endpoints

**GET/categories**

- Retrieves different category types, in an array, + a short description of the category. 

Response

```
[
  {
    "name": "Food & Nutrition",
    "id": "food",
    "description": "Free & low cost meal plans organized by diet, cultural specifications and populations served.",
    "number_of_locations": 84
  }
...
]

```

**GET /resources** 
- Retrieves ALL different resources in an array with information about their geographical coordinates, description, opening hours, and a number of characteristics that are either shared with or unique to specific categories (such as opening times, halal food offered etc). 

```
[
  {
    "id": 1,
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-123.091066, 49.281483]
    },
    "properties": {
      "type": "food",
      "program_name": "Union Gospel Mission - Meal Program",
      "description": "Lunch every day at 11am (tickets at 10:45am). Dinner M-F at 6pm (tickets at 5:45pm), Sat-Sun at 4pm (tickets at 3:45pm). For info call (604) 253-3323.",
      "program_status": "Open",
      "organization_name": "Union Gospel Mission",
      "opening_hours": "Monday-Thursday: 10 AM - 7 PM",
      "halal_food_offered": false,
      "vegan_options": true,
      "gluten_free_options": false,
      "absolutely_free": false,
      "kosher_food_offered": false
    }
  }
  ...
]
```

**GET /resources/:categoryId/:resourceId** 

```
{
  "id": "1",
  "type": "Feature",
  "geometry": {
    "coordinates": [-123.1247, 49.283],
    "type": "Point"
  },
  "properties": {
    "mapid": "GBV001",
    "year_created": "2015",
    "program_name": "Safe Haven Support Centre",
    "type": "gbv",
    "street_number": "125",
    "street_direction": "W",
    "street_name": "Pender",
    "street_type": "St",
    "merged_address": "125 W Pender St, Vancouver, BC",
    "opening_hours": "Tuesday: 10am-4pm",
    "description": "Safe Haven Support Centre offers a safe space and essential services for individuals impacted by gender-based violence. Open every Tuesday: from 10 AM to 4 PM, our compassionate team is ready to support you.",
    "sliding_scale": true,
    "translation_services_available": true,
    "geo_local_area": "Downtown",
    "geo_point_2d": {
      "lon": -123.1247,
      "lat": 49.283
    }
  }
}
```

## Roadmap

- Server-side:
    - Create data folders with resources-by-category, and categories 
    - Extract geojson data from OpenData project at the City of Vancouver 
    - Create datasets for currently unlisted resources and format into GeoJson files 

- Client-side 
    - React with routes corresponding with datasets 
  - Feature: view all resources & categories of resources within a city using dynamic MapCard 
    - use GET/resources 
  - Feature: view all resources within a specific category using dynamic MapCard 
    - use GET/resources/:categoryId 
    - integrate into Category Page
  - Feature: view one specific resource in the Resource Detail Page 
    - use GET/resources/:categoryId/:resourceId 
    - integrate into Resource Detail Page 


### Add remaining features for Demo day/fix bugs: 

- Care providers can take patient notes (particularly important for vulnerable patients who lack electronic health records)
- Care providers can track demographic data of patients using surveys for continuous service improvement
- Patient side functionality:
    - Patients can log-in to view their upcoming appointments with the org they were referred to 
- Org side functionality: 
    - Orgs can add/update their own profile with information about what they offer to community members 
    - Orgs can collect data from patient interactions for end-of-year statistical analysis 

- For logged in users, the following features will apply: 

    - If the social-change organization has made this available, I can book an appointment for my patient directly using a calendly extension 
    - I can take a snapshot of all the relevant services that are offered and email them to my patient in real time 
    - I can view the names and specializations of specific providers at the social-change organization and contact them directly 

- Feature: Login/signup
    - Implement "login" & "signup" forms (look relatively the same)
    - Create POST /users/signup endpoint
    - Create POST /users/login endpoint


- Feature: JSON Web tokens (JWTs)
    - Server: Respond accordingly using appropriate endpoints
    - Client: Store token 



**POST /users/signup**

- Provider creates an account

Parameters:

- email:  email
- password: password

Response:
```
{
    "token": "somekindoftoken"
}
```

**POST /users/login**

- Login a user

Response:
```
{
    "token": "somekindoftoken"
}
```

## Fix issues/bugs

  - Rewrite the "opening_hours" tag to be more logical and easier to manipulate (i.e., use values and booleans for times and "open"/"close")


