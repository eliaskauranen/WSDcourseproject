# Project 1: Shared shopping list

## Name: 
    Shared shopping lists application

## Description: 
    The application has a main page with statistics about the number of shopping lists and items published to this application if there are any. The main page includes a link to a page where the existing and active shopping lists are listed as links to the list specific pages. On that page it's possible to add a new active shopping list via form submitting and it's also possible to deactivate a list via form by clicking the "Deactivate list" button. On the list spesific pages the item names of the shopping list are listed in alphabetic order first the ones not collected and then the ones collected which are identified with a striked through text. It's possible to add new items to the list via form submitting and it's possible to mark items as collected by pressing the "Mark as collected" button next to the item name.

## Guidelines for running the application:
    No online development because of the credit card problem. Open the Command Prompt terminal (In Visual Studio Code open terminal -> click the arrow down sign next to the plus sign in the top right corner of the terminal and select Command Prompt). In the terminal run docker-compose up and in your browser go to http://localhost:7777/ which is the main page of the application. For running the end-to-end tests use the following command in the terminal: docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
