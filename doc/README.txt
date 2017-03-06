##############################################################################
# DESCRIPTION                                                                #
##############################################################################

webshop2.0 is a simulation of a webshop.
It was created by Julian Purkart and Thomas Schoenegger (SWD14 2016)

You can register a user and login.
After login it is possible to choose items from the shop and "buy" them.
(buying means that the item is put into your shopping cart.)

In the Cart you can modify the amount of your chosen items, or delete them
by setting the amount to 0.

Press the "Share it!" Button to share your shopping cart,
simply by copying the created link into a browser.

The views are responsive and can be used on all screen sizes.

The project is based on
- node.js
- html5
- css
- JavaScript
and uses frameworks like
- express
- bootstrap
- angular js

For more details of the used technologies, please see package.json

##############################################################################
# INSTALLATION                                                               #
##############################################################################

1.	Unzip:
	Unzip the project.

2.	Run "npm install":
	Start a new (power-)shell in the projects folder and run "npm install".
	The required node-modules should now be installed according to the package.json file.
	(If you have not installed node.js on your machine, download it from "https://nodejs.org/en/download/stable/")

3.	Start up mysql:

	After the node modules have been installed, configure the mysql db.

	- Start a mysql db on your localhost (e.g. with xampp) with following default properties:
            host: 'localhost'
            user: 'shop'
            password: 'shop'
            database: 'shop'

    - Execute sql/shop.sql to create tables and keys.

    Now the db should be set up and is ready to use.

4.	Run "npm start":
	When the node modules are installed and mysql runs,
	you can start up thew application by executing "npm start" in the project directory.

5.	Use it:
    Type in localhost:3000 in  your browser and play with it.