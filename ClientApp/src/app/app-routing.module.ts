import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent, ListsComponent, MoviesComponent, SearchComponent, AddNewComponent } from './components';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'Movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'Lists', component: ListsComponent, canActivate: [AuthGuard] },
  { path: 'List/:id', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'Search/:term', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'New/:type', component: AddNewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
