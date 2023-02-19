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

## Troubleshooting

You may find some issues connecting to Rocket.Chat from the angular app possibly related to your environment. In particular we have found important that your /etc/hosts file dont have directly mapped `::1`to localhost. So you may need to remove comment any such mapping and just keep the IP6 related mappings:

```
#::1             localhost
::1     ip6-localhost ip6-loopback
```

Check how above we have commented out the mapping with localhost.
