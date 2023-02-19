# RocketchatAngularEmbeddedExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Rocket.Chat Setup

Rocket.Chat requires some configuration to prepare it for other applications to embed in an iframe. In particular the channel/group chat page component in embedded layout mode.

- First step is to disable the "Restrict access inside any Iframe" under the General settings.
- Also in General settings, under REST API section, you should enable "Enable CORS". You can set "CORS Origin" also to *
- Still at General setting, but now under Iframe Integration, for this application example that listen and send events to Rocket.Chat, you should enable both "Enable Send" and "Enable Receive", and set for both "Send Target Origin" and "Receive Origins" to http://localhost:4200
- As an important note for this application you won't need to change anything under Accounts settings and can keep "Enabled" in fact disabled under the Iframe section.

## Running Angular App

### Requirements

You will need to have installed NodeJS on your machine and after install the angular client:

```
npm install -g @angular/cli
```

After you can just clone this project it into your environment and after inside the cloned project execute:

```
ng serve --open
```

The `--open` will give the instruction to open a browser window pointing to your app under http://localhost:4200

The application as it is will expect a Rocket.Chat instance running on http://localhost:3000.

## Troubleshooting

You may find some issues connecting to Rocket.Chat from the angular app possibly related to your environment. In particular we have found important that your /etc/hosts file dont have directly mapped `::1`to localhost. So you may need to remove comment any such mapping and just keep the IP6 related mappings:

```
#::1             localhost
::1     ip6-localhost ip6-loopback
```

Check how above we have commented out the mapping with localhost.

## How the application works

The idea of a scenario of chat engine where you may want to embed channel/group chat Rocket.Chat component in embedded mode into your application.
In most of those cases what usually happens is that you will have your own login mechanism for end users on your application but want to be able to present the user with the chat component as an extra feature, handling yourself behind the scenes the login into Rocket.Chat for the user in a transparent way.
Typically this is done by leveraging the Create User Token optional capability of Rocket.Chat. Check https://developer.rocket.chat/reference/api/rest-api/endpoints/core-endpoints/users-endpoints/create-users-token

So you would have a backend service as part of your app (only accessible to authenticated users on your platform) that would leverage a system administrator account in Rocket.Chat to ask for a token session for the user in Rocket.Chat once he is authenticated in your platform. After that all requests to Rocket.Chat are made leveraging the userId and authToken provided by the Create Token API for the user.

This application in its current state still does not do exactly that but is structured in a way to facilitate this option if needed an din the future. and for demonstration purposes is in fact compatible to such scenario (where the login happens against your platform and not Rocket.Chat).

The application in its current state and without any changes to its code will present the option to login for the user. This login in fact is executed the corresponding REST API of Rocket.Chat. (But this code is isolated enough that could be easily replaced by what it was described before.)

After that the behaviour is the expected one with the authToken and userId obtained from Rocket.Chat all API calls and embeddings will happen.

First a list of channels (public) and groups (private) that he belongs (more exactly has subscribed) are presented to him. He can select any one and an iframe is populated with corresponding embedded URL for the channel or group. The iframe is also authenticated with Rocket.Chat by sending the corresponding event (check https://developer.rocket.chat/rocket.chat/iframe-integration/iframe-integration-sending-commands), in particular the login-with-token one. But the iframe is only really displayed to the user once the event emmited by Rocket.Chat (check https://developer.rocket.chat/rocket.chat/iframe-integration/iframe-events) is captured, in particular the room-opened event. This allows as a demonstration to show that the loading page of Roclet.Chat does not need to be dispalyed and can be replaced by some other UI component representing loading that customer may prefer.

Right now as soon as user clicks to another page as Home, the user would need to relogin simulating the logout mechanism.

Its advised that for demonstrations that you open the application on incognito mode or on a different browser than the one you may open in parallel Rocket.Chat directly, so to avoid any confusions between the user logged in the application (with Rocket.Chat embedded) and the user that you may be using to access directly Rocket.Chat.

## How can you tune the example application

The configurability of the application will be improved but in any case its already quite easy to change it for demonstration purposes.

First the background image and logo image can be replaced under src/assets.

The text (title and tagline) for the home page can be tweaked under src/app/home/home.component.ts

The address test at the bottom can be tweaked at src/app/app.component.ts

The labels for the buttons on top navigation could be changed at src/app/app.component.html

Almost all the relevant stylesheet should be possible to tweak under src/styles.css

The title of the application web page can be changed at src/index.html

The two main services communicating with Rocket.Chat REST API currently are:
- UserService at src/app/user.service.ts
- RocketchatService at src/app/rocketchat.service.ts

If you want to change the URL for your rocketchat of the default localhost:3000 to another one you would need to change those two services.

(The fact there are two services currently with that information is really intentional to make it explicit that in fact the login on the application leveraging UserService is independent of Rocket.Chat.)

## Understanding / Tunning Code

If you are already familiar with Angular the code of this example project should be quite simple to understand and tune.

If you are not familiar with Angular I would suggest first learning it a bit. The Tour of Heroes its a great tutorial: https://angular.io/tutorial/tour-of-heroes

### Major Points to Pay Attention

For the mechanism of embedding and calling Rocket.Chat REST API one needs the userId and authToken. There are mainly two ways of getting it:
- Login https://developer.rocket.chat/reference/api/rest-api/endpoints/other-important-endpoints/authentication-endpoints/login
- Create Token https://developer.rocket.chat/reference/api/rest-api/endpoints/core-endpoints/users-endpoints/create-users-token

Currently the application leverages the first on UserService src/app/user.service.ts 

This happens on LoginComponent src/app/login/login.component.ts. The LoginComponent src/app/login/login.component.html also displays once authenticated the ChannelsComponent src/app/channels/channels.component.ts (and passes the response of the login to it including userId and authToken).

The ChannelsComponent when it initializes leverages the RocketchatService src/app/rocketchat.service.ts for fetching the subscrtiptions (channels/groups) of the user. It also fetches from the RocketchatService information about the Rocket.Chat host URL.

The ChannelComponent src/app/channels/channels.component.html also includes an iframe that gets populated with the layout embedded URL of the selected channel/group. And when iframe is loaded the login-with-token event is sent. The Rocket.Chat room-opened event is also captured and used to trigger the display of the iframe containing the channel/room embedded Rocket.Chat component.

## Next Steps

- Make the application easier to configure by concentrating configurations (URLs, etc) on a json file.
- Localize the strings also to make it easier to tune the application to more specific demos.
- Make the loading of iframe depending on events as a configurable option.
- Review application to make it at least as an option to implement explicitly the login leveraging the create token mechanism in general used under such scenarios.
- Review the channels list presentation to handle large channel names in a better looking way. (Currently I would advise to use short names fir the channels/rooms.)
- Cleanup stylesheet. (Currently has too many not used styles.)
- Add details as counter of incoming messages and notifications of new messages.

