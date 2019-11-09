Universe Generator README

Dan Duff and Michael Bosik

This project was made possible by using the Pixi.js Library. This was mainly for the Canvas and graphical calculations for developing the project.
(Pixi.JS source code can be found in the pixi.js file under the 'scripts' directory of the project).

The Project is hosted on the glitch hosting site:
https://glitch.com/

A video demonstration can be found at the link:
https://youtu.be/lhcqckQ3YpE

The ProcJam Entry can be found here:
https://dandaman2.itch.io/universe-generator

WRITEUP:

Michael Bosik and Dan Duff
11/9/19

Procjam Writeup

What we wanted to make
The objective of our project was to create a visually pleasing graphical site that users could interact with.
Our goal was to have something that we could present and have people manipulate themselves. In order to accomplish
this we planned to put the web-based project on an online hosting service such as Glitch.com.

What we made
We ended up using the PixiJS library to create a visual canvas that placed user-uploaded PNG sprites randomly in a 3D space.
They then move throughout the space in a satisfying and visually pleasing way. This is to simulate the user’s “movement”
through the digital space, with sprites stretching around them to simulate travelling distance. The sprites are manipulated
with parameters such as base speed, size, stretch, and amount; all of which can be changed by the user. This met the goals
of our initial idea, as we were able to create a graphics-based website component which users could interact with.

How we did it and what we could have changed
We chose to use Javascript to create our project because we both had a deep understanding of the language and the tools the
language provided. We originally were going to have an Express Javascript server for a backend to store user data, but we
changed to using only a client front end as we figured we would rather not persistently store data. This is because we did
not want users to upload inappropriate or oversized data to our server, so instead the project resets with a new user session.
If we were to do things differently, we could try to implement a type of scan for content we did not want in our server such
that multiple people could use the site together. In addition, if we had the time to do so, we would create an image-processing
step that occurred after uploading, trimming and shrinking the image to a predetermined height.

What we learned
	From this experience, we learned how to convert image files such as .png into a base64 string that we then stored in a data
  object. This was useful because it allowed us to not have to store image files in our project when people uploaded them. We
  saved the base64 string in an array and read the string when we needed to get the image texture. We also learned how to create
  event listeners for elements in an html page. This allowed us to parameterize the graphic’s visual components much more easily.
  While we have had some experience working with digital canvases before, this project allowed us to delve more deeply into a
  canvas-based JavaScript library.


Resources:
PixiJS (https://www.pixijs.com/)
Glitch (glitch.com)


