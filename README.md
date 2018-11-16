# magfin

A Trading Card Game (TCG) finance tool to help you track the value of your collection. Intending to be card game agnostic in the future, magfin for the moment will work only with Magic the Gathering. 

## Usage

This application is a composite of two Docker containers running the front-end and back-end of the application respectively. To achieve this, we use Docker as the medium to deploy these containers and network the two applications together.

The front-end will be comprised of a AngularJS web application which interfaces with the python-flask back-end which will serve as a RESTFUL API interface with our database of cards and cardslist. The back-end will also run periodic functions to obtain and analyze the latest prices of your cards.

### Requirements

You will need the following:

    1. Docker
    2. Python ver >= 3.0

### Installation

You will first need to build the docker images of both the front-end and back-end application. Move into each respective folders and build the images using the dockerfiles found in each.

```
cd front-end
docker build -t magfin-frontend .
```

and

```
cd back-end
docker build -t magfin-backend .
```

### Running the Application

After building the two images above, you may perform the following to deploy the application:

```
docker-compose up -d magfin.yml
```

Magfin will be reachable on your browser at localhost:8080. Alternatively you may modify the docker-compose file (magfin.yml) in order to change the port in which the front-end is served.

## About

