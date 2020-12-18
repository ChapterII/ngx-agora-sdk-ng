export class SoundMeter {

    private instant: number = 0.0;
    private script!: ScriptProcessorNode;
    private mic!: MediaStreamAudioSourceNode;
  
    constructor(private context: AudioContext) {}
  
    private connect(stream: MediaStream, callback: (event: any) => void): void {
      try {
        this.mic = this.context.createMediaStreamSource(stream);
        this.mic.connect(this.script);
        this.script.connect(this.context.destination);
        if (typeof callback !== 'undefined') {
          callback(null);
        }
      } catch (e) {
        console.error(e);
        if (typeof callback !== 'undefined') {
          callback(e);
        }
      }
    };
  
    public handleError(error: { message: any; name: any; }): void {
      console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }
  
  
    public handleSuccess(stream: MediaStream, callback: (instant: any) => void): void {
  
      this.script = this.context.createScriptProcessor(2048, 1, 1);
      this.script.addEventListener('audioprocess', (event) => {
  
        const input = event.inputBuffer.getChannelData(0);
        let i;
        let sum = 0.0;
        for (i = 0; i < input.length; ++i) {
          sum += input[i] * input[i];
        }
        this.instant = Math.sqrt(sum / input.length);
        callback(this.instant.toFixed(2));
      });
  
      this.connect(stream, (event) => {
        if (event) {
          return;
        }
      });
  
    }
  
  }