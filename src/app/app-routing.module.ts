import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {WorkingComponent} from './working/working.component';

const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'working', component: WorkingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
