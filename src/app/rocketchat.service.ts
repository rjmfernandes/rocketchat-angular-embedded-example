import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Channel } from './Channel';
import { LoginResponse } from './LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class RocketchatService {

  public rocketChatServer = 'http://localhost:3000';

  private groupsApi = '/api/v1/subscriptions.get';



  constructor(
    private http: HttpClient) { }

  listRooms(loginResponse: LoginResponse): Observable<Channel[]> {
    const options = {
      headers: {
        'X-Auth-Token': loginResponse.authToken,
        'X-User-Id': loginResponse.userId
      }
    };
    return this.http.get(this.rocketChatServer + this.groupsApi, options).pipe(map((res: any) => res['update']));
  }


  getChannelUrl(channel: Channel): string  {
    let groupChannel='channel';
    if(channel.t==='p') {
      groupChannel = 'group';
    }
    return this.rocketChatServer+"/"+groupChannel+"/"+channel.name+"/?layout=embedded";
  }

}
