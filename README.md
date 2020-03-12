# Case Frontend

This project is written in [React](https://pt-br.reactjs.org/) and use the component library [material-ui](https://material-ui.com/) for visual elements and the [axios](http) library for REST api calls.

You can see the live demo of this project on this link: [https://stuffs.appspot.com](https://stuffs.appspot.com)

## Requirements
- nodejs
- create-react-app
- case-backend project running on port 8080 (if you need a different port, see instructions bellow)
- Google Cloud SDK (gcloud) for Google App Engine deploy

### Instructions

Install the dependencies:

```bash
npm install
```

To run this project on development environment:

```bash
npm start
```

This project redirect all the "/api/*" calls for the port 8080. If you need a different port, change the "proxy" value on the **package.json** to the desired value.

To build:

```bash
npm run build
```

### Google App Engine

After build the application, you can deploy the app:

```
gcloud app deploy
```