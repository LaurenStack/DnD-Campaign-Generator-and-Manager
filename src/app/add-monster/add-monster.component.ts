import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.css']
})
export class AddMonsterComponent implements OnInit {
  addFormShown: boolean = false;
  selectedEntry: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  showAddForm() {
    console.log('showform')
    this.addFormShown = true;
  }

  addButtonClicked(Name, alignment, type, armorClass, constitution, perception, intelligence, charisma, dexterity, strength, wisdom, speed, challengeRating, hitPoints, hitDice, damageImmunities, damageResistances, damageVulnerabilities, actions, legendaryActions) {
    if (!Name || !alignment || !type || !armorClass || !constitution || !perception || !intelligence || !charisma || !dexterity || !strength || !wisdom || !speed || !challengeRating || !hitPoints || !hitDice) {
      alert("Please complete all fields to create a monster!");
    }
    else {
      this.addFormShown = false;
      var newMonster = {
        name: Name,
        alignment: alignment,
        armor_class: parseInt(armorClass),
        constitution: parseInt(constitution),
        perception: parseInt(perception),
        intelligence: parseInt(intelligence),
        charisma: parseInt(charisma),
        dexterity: parseInt(dexterity),
        strength: parseInt(strength),
        speed: speed,
        challenge_rating: parseInt(challengeRating),
        hit_points: parseInt(hitPoints),
        hit_dice: hitDice,
        damage_immunities: damageImmunities,
        damage_resistances: damageResistances,
        damage_vulnerabilities: damageVulnerabilities,
        actions: actions,
        legendary_actions: legendaryActions,
        private: this.selectedEntry
      }
      this.userService.createMonster(newMonster);
    }

  }

  cancelMonsterAdd() {
    this.addFormShown = false;
  }

  onSelectionChange(entry) {
        this.selectedEntry = entry;
    }

}
