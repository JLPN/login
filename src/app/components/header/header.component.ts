import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navegar(url: string){
    if(url == 'uno'){
      this.router.navigate(['/uno']);
    }
    if(url == 'dos'){
      this.router.navigate(['/dos']);
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
