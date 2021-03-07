import { PeerProvider, SignalingProvider, StreamProvider } from './app.adapter'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { A11yModule } from '@angular/cdk/a11y'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { DrawerModule, UiComponentsModule } from '@speek/ui/components'
import { createSpeekIcon, getFire, getLogo } from '@speek/util/format'
import { UserSetupStorage, UserRoomStorage } from '@speek/data/storage'
import { ServiceWorkerModule } from '@angular/service-worker'
import { UserSetupAdapter } from '@speek/core/adapter'
import { MaterialModule } from './shared/material.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { LayoutModule } from '@angular/cdk/layout'

import { PeerSignalBadgePipe, PeerStateBadgePipe } from './shared/pipes'
import { TransferComponent } from './meet/transfer/transfer.component'
import { MeetAddonDirective } from './meet/meet-addon.directive'
import { SettingComponent } from './setting/setting.component'
import { AudioDialog } from './setting/audio/audio.dialog'
import { VideoDialog } from './setting/video/video.dialog'
import { HomeComponent } from './home/home.component'
import { MeetComponent } from './meet/meet.component'
import { AppComponent } from './app.component'
import {
  AudioModule,
  ShareModule,
  SplashModule,
  ToolbarModule,
} from '@speek/ui/components'
import { environment } from './../environments/environment'
import { MeetGuard } from './meet/meet.guard'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeetComponent,
    AudioDialog,
    VideoDialog,
    SettingComponent,
    TransferComponent,
    MeetAddonDirective,
    PeerStateBadgePipe,
    PeerSignalBadgePipe,
  ],
  imports: [
    A11yModule,
    DrawerModule,
    BrowserModule,
    ToolbarModule,
    SplashModule,
    AudioModule,
    ShareModule,
    LayoutModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        {
          path: 'invite',
          component: HomeComponent,
        },
        {
          path: 'setting',
          component: SettingComponent,
        },
        {
          path: 'invite/:code',
          component: HomeComponent,
        },
        {
          path: ':code',
          redirectTo: ':code/meet',
        },
        {
          path: ':code/meet',
          canActivate: [MeetGuard],
          canDeactivate: [MeetGuard],
          component: MeetComponent,
        },
      ],
      {
        // useHash: true,
        initialNavigation: 'enabled',
        relativeLinkResolution: 'legacy',
      }
    ),
    UiComponentsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    UserRoomStorage,
    UserSetupStorage,
    UserSetupAdapter,
    PeerProvider.withConfig(environment.configs),
    StreamProvider.withConfig(environment.constraints),
    SignalingProvider.withConfig(environment.gateway),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly sanitizer: DomSanitizer
  ) {
    const name = 'speek-logo'
    const icon = getLogo('#999')
    createSpeekIcon(iconRegistry, sanitizer, [icon, name])
  }
}
