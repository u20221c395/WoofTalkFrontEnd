import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  petFriends = [
    'avatar1.png',
    'avatar2.jpg',
    'avatar3.jpg',
    'avatar4.jpg',
    'avatar5.jpg',
    'avatar6.png',
    'avatar7.jpg',
  ];
}
