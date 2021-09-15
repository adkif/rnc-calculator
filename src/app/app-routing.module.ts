import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { UmtsComponent } from './umts/umts.component';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  {path:'calculator', component:CalculatorComponent},
  {path:'aboutus', component:AboutUsComponent},
  {path:'umts',component: UmtsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
