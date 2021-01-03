import { Injectable } from "@angular/core";
import { IChannelClient, NgxAgoraSdkNgService } from "ngx-agora-sdk-ng";

@Injectable({
    providedIn: 'root',
})
export class AgoraService {
    public client?: IChannelClient;
    constructor(public ngxAgoraService: NgxAgoraSdkNgService) { }
}