import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
declare const Pusher: any

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  public breakdown:any
  channelName:string=null;

  constructor(public http: HttpClient) {
    this.pusher = new Pusher('fc44950e09ecefa9effd', {
      cluster: 'ap2',
      forceTLS: true
    });

  }
  public init(name: string) {
    return this.pusher.subscribe(name);
  }
  public destroy(name: string) {
    this.pusher.unsubscribe(name);
  }
  public setChannel(name:string){
    this.channelName = name;
  }
  public getChannel(){
    return this.channelName;
  }
}