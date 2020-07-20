import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'sign-up', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: {id: ''} },
  { path: 'my-page', canActivate: [AuthGuard], loadChildren: () => import('./my-page/my-page.module').then(m => m.MyPageModule) },
  { path: 'single-news/:id', loadChildren: () => import('./signgle-news/signgle-news.module').then(m => m.SigngleNewsModule) },
  { path: 'tests', canActivate: [AuthGuard], loadChildren: () => import('./tests/tests.module').then(m => m.TestsModule) },
  { path: 'single-test/:id', loadChildren: () => import('./signgle-test/signgle-test.module').then(m => m.SigngleTestModule) },
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
