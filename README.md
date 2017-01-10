A command terminal that has NPM (node package manager) installed is need to run the project
To install the project open a command terminal and navigate to the project root directory.

Run:
	npm install

This will install all of the node packages required for the project
I already built the project because unfortunately the css-loader was not configuring properly.

Therefore I added:
	"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'>"
to the index.html in /build/index.html

This is needed so the bootstrap styles will work properly.

Next Run:

	npm start

This will start a webpack server and after a few moments will start listening on port 8080

I developed this project in Goolge Chrome so I am not sure the behavior or functionality in other browsers.

Pointing the browser to localhost:8080 will all for the project to be run.

Things that can be done in the app:

	Dragging an item block from the left to the right will as it as a draggable card on the right.

	The cards on the right can be dragged in an up/down order and will reorder the list depending on where the card is dropped. 

	Clicking a text card on the right wil enable an edit button which will allow for the text to be edited on the left (the text editor plugin allows for styling but I ran out of time) and will update on the right in real time.

	All of the cards on the right allow for the options of cloning the object or removing it from the list of cards.

	Once in the edit pane there is a button to toggle back to the item selection pane.

The styling is minamal so that I had the time to add all of the relevant functionality.
I'm sure there are a few bugs but I also did not have any time to test however based on some run throughs and stress tests everything seemed to work as it should given the simple nature of the app.

Inspecting an element in the browser by right clicking the window and clicking 'inspect element' in the browser will show the flow of data around the app in the inspectors console window.