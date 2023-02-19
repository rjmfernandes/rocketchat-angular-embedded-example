# RocketchatAngularEmbeddedExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Rocket.Chat Setup

Rocket.Chat requires some configuration to prepare it for other applications to embed in an iframe. In particular the channel/group chat page component in embedded layout mode.

- First step is to disable the "Restrict access inside any Iframe" under the General settings.
- Also in General settings, under REST API section, you should enable "Enable CORS". You can set "CORS Origin" also to *
- Still at General setting, but now under Iframe Integration, for this application example that listen and send events to Rocket.Chat, you should enable both "Enable Send" and "Enable Receive", and set for both "Send Target Origin" and "Receive Origins" to http://localhost:4200
- As an important note for this application you won't need to change anything under Accounts settings and can keep "Enabled" in fact disabled under the Iframe section.


