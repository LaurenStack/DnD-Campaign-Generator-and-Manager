import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addFormShown: boolean = false;
  selectedEntry: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  showAddForm() {
    this.addFormShown = true;
  }

  addButtonClicked(name, type, weaponRange, range, weight, damage, costQuantity, costCurrency, description) {
    if (!name || !type || !weight || !costQuantity || !costCurrency) {
      alert("Please complete all required fields to create an item!");
    }
    else {
      this.addFormShown = false;
      var newItem = {
        name: name,
        type: type,
        weapon_range: weaponRange,
        range: range,
        weight: weight,
        damage: damage,
        cost: {
          quantity: parseInt(costQuantity),
          unit: costCurrency},
        description: description,
        private: this.selectedEntry
      }
      this.userService.createItem(newItem);
    }

  }

  cancelItemAdd() {
    this.addFormShown = false;
  }

  onSelectionChange(entry) {
        this.selectedEntry = entry;
  }

}
