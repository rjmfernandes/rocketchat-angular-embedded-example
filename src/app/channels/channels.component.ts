import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Channel } from '../Channel';
import { LoginResponse } from '../LoginResponse';
import { RocketchatService } from '../rocketchat.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit, AfterViewInit {

  private isInited: boolean = false;

  @Input()
  loginResponse!: LoginResponse;

  selectedChannel: Channel | undefined;

  channelUrl: SafeResourceUrl | undefined;

  channels: Channel[] = [];

  rocketchatServer: string | undefined;

  showIframe: boolean = false;

  @ViewChild('rcChannel')
  rcChannel!: ElementRef;
  globalListenFunc:Function | undefined;


  constructor(
    private rocketchatService: RocketchatService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.isInited = true;
  }


  ngOnInit(): void {
    this.rocketchatServer = this.rocketchatService.rocketChatServer;
    this.rocketchatService.listRooms(this.loginResponse).subscribe(rooms => this.channels = rooms);
    this.globalListenFunc = this.renderer.listen('window', 'message', e => {
      if(e.data.eventName === 'room-opened') {
        this.showIframe=true;
      }
    });
  }

  ngOnDestroy() {
    if(this.globalListenFunc)
      this.globalListenFunc();
  }

  onSelect(channel: Channel) {
    this.selectedChannel = channel;
    this.channelUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rocketchatService.getChannelUrl(channel));
    this.showIframe =false;
  }

  onIframeLoad() {
    if (this.isInited) {
      setTimeout(() => {
        this.rcChannel.nativeElement.contentWindow.postMessage({
          externalCommand: 'login-with-token',
          token: this.loginResponse.authToken
        }, '*');
      }, 0);
    }
  }





}
