/// home.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  newItem: any = {
    code: '',
    name: '',
    brand: '',
    unitPrice: '',
  };
  newItemForAdd: any = {
    name: '',
    brand: '',
    unitPrice: '',
  };
  isEditMode: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  editItem(code: string): void {
    const selectedItem = this.items.find((item) => item.code === code);
    if (selectedItem) {
      this.newItem = { ...selectedItem };
      this.isEditMode = true;
    }
  }
  addItem(): void {
    // Use newItemForAdd and set its values from the top textboxes
    this.newItemForAdd.name = this.newItemForAdd.name;
    this.newItemForAdd.brand = this.newItemForAdd.brand;
    this.newItemForAdd.unitPrice = this.newItemForAdd.unitPrice;
  
    this.dataService.addItem(this.newItemForAdd).subscribe(
      (response) => {
        this.items.push(response);
        this.newItemForAdd = {
          name: '',
          brand: '',
          unitPrice: '',
        };
        this.refreshTable();
      },
      (error) => {
        console.error('Add item error:', error);
        // You can add a more user-friendly error message or handle the error as needed
      }
    );
  }
  deleteItem(code: string): void {
    this.dataService.deleteItem(code).subscribe(() => {
      this.items = this.items.filter((item) => item.code !== code);
      this.refreshTable();
    });
  }

  saveChanges(): void {
    if (this.isEditMode) {
      this.dataService.editItem(this.newItem.code, this.newItem).subscribe(
        () => {
          const index = this.items.findIndex((item) => item.code === this.newItem.code);
          if (index !== -1) {
            this.items[index] = { ...this.newItem };
          }

          this.newItem = {
            code: '',
            name: '',
            brand: '',
            unitPrice: '',
          };
          this.isEditMode = false;

          // Refresh the table by fetching the latest data
          this.refreshTable();
        },
        (error) => {
          console.error('Edit item error:', error);
          // You can add a more user-friendly error message or handle the error as needed
        }
      );
    } else {
      this.dataService.addItem(this.newItem).subscribe(
        (response) => {
          this.items.push(response);
          this.newItem = {
            code: '',
            name: '',
            brand: '',
            unitPrice: '',
          };

          // Refresh the table by fetching the latest data
          this.refreshTable();
        },
        (error) => {
          console.error('Add item error:', error);
          // You can add a more user-friendly error message or handle the error as needed
        }
      );
    }
  }

  refreshTable(): void {
    this.dataService.getItems().subscribe((items) => {
      this.items = items;
    });
  }
}




