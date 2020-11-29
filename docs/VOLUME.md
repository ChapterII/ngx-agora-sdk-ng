# Video and Voice Conferencing in Angular
<div style="display:flex">
  <img src="images/angular-logo.svg" width="50px" height="50px" alt="Angular"/>
  <img src="images/agora-logo.png" width="50px" height="50px" alt="Agora"/>
</div>

[![npm version](https://badge.fury.io/js/ngx-agora-sdk-ng.svg)](https://badge.fury.io/js/ngx-agora-sdk-ng)

[Angular](https://angular.io/) library for the Agora Web SDK next-generation client from [Agora.io](https://www.agora.io/en/) enabling audio and video real-time communications based on Agora SD-RTN™ and implementing scenarios such as voice-only calls, video call, voice-only interactive broadcast, and video interactive broadcast. 


## Adjust Volume Both Local and Remote Side

The library allows you to manage the sampling volume of the local audio or the playback volume of the subscribed audio as required by the actual scenario.


## Implementation

The library provides the **setVolume()** method for the local audio track and the remote audio track objects, to adjust the sampling volume of the local audio track and the playback volume of the remote audio tracks respectively.


* **setVolume(50);** // Set the volume to half of the original volume
* **setVolume(200);** // Set the volume to twice of the original volume
* **setVolume(0);** // Set the volume to 0


### **Adjust the sampling volume (local)**

In the following example, the localAudioTrack object represents the local audio track.

```ts

  public joinVoiceChannel(): void {

    this.client = this.agoraService.createChannelClient();
    this.client.joinVoice(this.channelName, this.token).then(local => {
      local.setVolume(50);
    });

  }
  
```

### **Adjust the playback volume (remote)**

In the following example, the remoteUser object represents a subscribed remote user.

```ts

    this.agoraService.remoteUsersStatusChange().subscribe(state => {

      switch (state.connectionState) {

        case 'CONNECTED': {

          if (state.mediaType === "video") {
            const playerContainer: any = document.createElement("div");
            playerContainer.id = state.user.uid.toString();
            playerContainer.style.height = "200px";
            playerContainer.style.width = "200px";
            document.getElementById(this.remotePlayeList)?.append(playerContainer);
            state.user.videoTrack?.play(playerContainer, { fit: 'cover' });
          }
          else if (state.mediaType === "audio") {
            state.user.audioTrack?.play();

            state.user.audioTrack?.setVolume(50);

          }

          break;
        }
        case 'DISCONNECTED': {

          if (state.mediaType === "video") {
            this.agoraService.remoteUsers.forEach(user => {
              const playerContainer: any = document.getElementById(user.uid.toString());
              playerContainer.remove();
            });
          }

          break;
        }

      }

    });



```



