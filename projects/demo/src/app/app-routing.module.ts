import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MeetingPreviewComponent } from './pages/meeting-preview/meeting-preview.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { InputOutputSettingsComponent } from './shared/components/input-output-settings/input-output-settings.component';
import { MeetingPageComponent } from './pages/meeting-page/meeting-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'preview', component: MeetingPreviewComponent },
  { path: 'settings', component: InputOutputSettingsComponent },
  { path: 'meeting', component: MeetingPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
