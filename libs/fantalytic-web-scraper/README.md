
# Fantalytic CLI

  

## Purpose

This is a CLI tool to scrape websites for NFL player stats.

  

## Installation

To install the tool, follow the steps below:

  

- Create a directory to store the application

- Navigate to the directory and type `git init`

- Run commands below:

-  `git remote add origin https://github.com/paulmojicatech/fantalytic-web-scraper`

-  `git pull origin master`

-  `npm install`

-  `npm run link`

- This needs to be run with sudo access

  

## Commands

Command syntax:

  

fantalytic <%commandType%> <%playerPosition%> year <%yearToFetch%> location <%locationToStoreData%>

  

## Command Types

  

-  `get`
	- **Required**
		- `qb`
		- `rb`
	- **Required**
		- `year`

-  `upload`
	- Optional
		- Valid values (<%locationToStoreData%>):
			- `FILE` (**Default**)
				- This will put the fetched value in JSON format to