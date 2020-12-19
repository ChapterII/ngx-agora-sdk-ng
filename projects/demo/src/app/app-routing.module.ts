import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MeetingPreviewComponent } from './pages/meeting-preview/meeting-preview.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'preview', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'preview', component: MeetingPreviewComponent }
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
