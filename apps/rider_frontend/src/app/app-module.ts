import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { appRoutes } from './app.routes';
import { NxWelcome } from './nx-welcome';
import { Login } from './login/login';
import { NgOptimizedImage } from '@angular/common';
import { Register } from './register/register';
import { FormField } from "@angular/forms/signals";

@NgModule({
  declarations: [App, NxWelcome, Login, Register],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), NgOptimizedImage, FormField],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
  exports: [Login, Register],
})
export class AppModule {}
