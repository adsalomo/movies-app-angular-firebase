import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  async logout() {
    const resp = await Swal.fire({
      title: 'Cerrar sesión',
      icon: 'info',
      text: '¿Está seguro de cerrar su sesión?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    });

    if (resp.value) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    }
  }

}
