---
title: "Assignment 3"
date: 2019-04-18T15:34:30-04:00
categories:
  - University
tags:
  - Assignment
---

# Intro

For this Spatial Data assignment, I have decided to work with Source #3 - `Travel Guide to Chennai`. I chose this source because having an accurate visualization of tourist places is crucial, based on my personal experience. When we visited this country, it was complicated for us to create a good roadmap of places and understand how to navigate various locations efficiently in terms of time and cost. I believe attempting to visualize a travel guide will help understand how useful this can be for day-to-day life.

# Source

The Travel Guide to Chennai provides a brief overview of various places to visit, a general overview of the city, and essential facilities such as parks, hospitals, shops, etc. Everything a tourist needs when visiting.

Although the Travel Guide is not very long, I think it is possible to parse everything and create a comprehensive visual illustration. However, I decided to focus on some common places that tourists would likely want to hear about. Therefore, I chose to gather data about all hospitals, movie theaters, and amusement parks. I believe this is a good proportion of what might be needed in emergency cases and for entertainment.

Below we can see brief overview of the data:

<img src="/assets/images/A3/9.jpg" style="zoom:50%"/>

# Data Preparation

With the given data, our first step is to utilize Optical Character Recognition (OCR) to obtain the required format of the text. Afterward, we can use some regex patterns to extract phone numbers and the names of the places. However, I think Language Models (LLMs) like ChatGPT can perform this task much faster and accurately. Using regex involves considering a vast number of edge cases, making it a time-consuming process. So, I fed my raw data to ChatGPT and asked it to create a CSV format needed for further operations. Since data like phone numbers and addresses could have multiple comma-separated entries, I asked ChatGPT to use a custom delimiter, `**`, to save time correcting errors later:

<img src="/assets/images/A3/1.jpg" style="zoom:50%"/>

Next, I imported the CSV files into Excel with the custom delimiter. Using the geoCode extension, I started fetching longitude and latitude data. This data preparation is for our visualization tool, Kepler.gl. We obtained three various CSV files for various categories of places: hospitals, parks, and movie theaters:

<img src="/assets/images/A3/2.jpg" style="zoom:50%"/>
<img src="/assets/images/A3/3.jpg" style="zoom:50%"/>
<img src="/assets/images/A3/4.jpgg" style="zoom:50%"/>

I decided to keep them separate as it will allow us to use Kepler tool's features to separately adjust some parameters for each cluster.

# Visualization

After importing CSV files, we get the following illustration:

<img src="/assets/images/A3/8.jpg" style="zoom:50%"/>

Each cluster is determined by its color, and we can draw polygons for better visualization. Potentially, this tool can be used as a suggestion system that will try to pick places by reducing travel costs and distances among them.

Polygon of amusement park connections:

<img src="/assets/images/A3/6.jpg" style="zoom:50%"/>

Coverage area of All places(polygon):

<img src="/assets/images/A3/5.jpg" style="zoom:50%"/>

With the help of the visualization, we easily identified an "outlier" (wrong data), that was later removed from the data:

<img src="/assets/images/A3/7.jpg" style="zoom:50%"/>