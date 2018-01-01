import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule} from 'angularfire2';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MonstersComponent } from './monsters/monsters.component';
import { MonstersViewComponent } from './monsters-view/monsters-view.component';
import { AlignmentPipe } from './alignment.pipe';
import { TypePipe } from './type.pipe';
import { ItemsViewComponent } from './items-view/items-view.component';
import { ItemsComponent } from './items/items.component';
import { ItemTypePipe } from './item-type.pipe';
import { ToolsFilterPipe } from './tools-filter.pipe';
import { WeaponFilterPipe } from './weapon-filter.pipe';
import { MountsFilterPipe } from './mounts-filter.pipe';
import { AddMonsterComponent } from './add-monster/add-monster.component';
import { AddItemComponent } from './add-item/add-item.component';
import { CharactersComponent } from './characters/characters.component';
import { CreatorPipe } from './creator.pipe';
import { AddedMonstersPipe } from './added-monsters.pipe';
import { ItemCreatorPipe } from './item-creator.pipe';
import { ItemsAddedPipe } from './items-added.pipe';
import { MonsterSearchPipe } from './monster-search.pipe';
import { MapListComponent } from './map-list/map-list.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket,
  messagingSenderId: masterFirebaseConfig.messagingSenderId
};

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'createmap', component: MapComponent },
  { path: 'my-maps', component: MapListComponent },
  { path: 'map/:i', component: MapComponent },
  { path: 'monsters-view', component: MonstersViewComponent },
  { path: 'items-view', component: ItemsViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginPageComponent,
    HomepageComponent,
    MonstersComponent,
    MonstersViewComponent,
    AlignmentPipe,
    TypePipe,
    ItemsViewComponent,
    ItemsComponent,
    ItemTypePipe,
    ToolsFilterPipe,
    WeaponFilterPipe,
    MountsFilterPipe,
    AddMonsterComponent,
    AddItemComponent,
    CharactersComponent,
    CreatorPipe,
    AddedMonstersPipe,
    ItemCreatorPipe,
    ItemsAddedPipe,
    MonsterSearchPipe,
    MapListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, "test"),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
