# Angular library for Agora
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
