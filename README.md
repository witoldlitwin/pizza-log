# Pizza Log

Just a fun 5-minute (literally 5-minute!) AI side project that aims to visualize a team's pizza intake in the form of a github-style heatmap.

Built with ChatGPT and Bolt.new.

I used this ChatGPT prompt to get the prompt for Bolt:

```
Please write a detailed prompt that will help an AI system to develop a web app with the following criteria:

App name - Pizza Log
Description - Pizza Log is an app that lets team members visualize their pizza consumption in a form of a github-style heatmap

Details:
The web app should be hostable on Cloudflare Pages (using Cloudflare Workers as a backend)

The front-end should be built with Vue 3 and Vite.

It should allow for selecting a person's name, the date and number of pizza slices consumed on that date.

The UI should display a separate heatmap for each person (all people and their heatmaps should be listed on a single page) and also a joint-one reflecting the pizza consumption of the whole team.

The data should be stored in Cloudflare D1 database.
```
