# Video and Voice Conferencing in Angular
<div style="display:flex">
  <img src="images/angular-logo.svg" width="50px" height="50px" alt="Angular"/>
  <img src="images/agora-logo.png" width="50px" height="50px" alt="Agora"/>
</div>

[![npm version](https://badge.fury.io/js/ngx-agora-sdk-ng.svg)](https://badge.fury.io/js/ngx-agora-sdk-ng)

[Angular](https://angular.io/) library for the Agora Web SDK next-generation client from [Agora.io](https://www.agora.io/en/) enabling audio and video real-time communications based on Agora SD-RTN™ and implementing scenarios such as voice-only calls, video call, voice-only interactive broadcast, and video interactive broadcast. 


## Join and Leave Channel

### 1. Join Channel
For joing a channel first of all you have to create an instance of **IChannelClient**, after that you can use **joinVideo** method to join a channel. **joinVideo** method is promise base. The result of promise is an player object. 
```ts
import { IChannelClient } from 'ngx-agora-sdk-ng';

private client!: IChannelClient;

public joinVideoChannel(): void {

    this.client = this.agoraService.createChannelClient();
    this.client.joinVideo(this.channelName, this.token).then(local => {
      local.play(this.localPlayer);
    });

}
```
### 2. Leave Channel

```ts

public leaveVideoChannel(): void {
    this.client.leaveVideo();
}

```

### 3. Connection states in the channel
When a user joins the target channel, network fluctuations may cause disconnections. You can get the connection state by **connectionStatusChange** method.

All connection states are as follows:

* **"DISCONNECTED"**: Disconnected. In this state, the SDK does not automatically reconnect. This state indicates that the user is in any of the following stages:
The user has not joined the channel by calling join.
The user has left the channel by calling leave.
The user has been kicked out of the channel by the Agora server or the connection has failed.
* **"CONNECTING"**: Connecting. This state indicates that the user is calling join.
* **"CONNECTED"**: Connected. This state indicates that the user has joined the channel and can publish or subscribe to media tracks in the channel.
* **"RECONNECTING"**: Disconnected and reconnecting. If the connection between the SDK and the server is interrupted due to network disconnection or switching, the SDK automatically reconnects and enters this state.
* **"DISCONNECTING"**: Disconnecting. This state indicates that the user is calling leave.


```ts

 this.agoraService.connectionStatusChange().subscribe((status) => {

      switch (status.current) {
        case 'DISCONNECTED': {
          const playerContainer: any = document.getElementById(this.localPlayer);
          playerContainer.remove();
          break;
        }
        
      }

});

```

