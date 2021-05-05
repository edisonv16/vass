import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel [] =[];

  cargando = false;

  constructor(private productoService: ProductosService) { }

  ngOnInit() {

    this.cargando = true;
    this.productoService.getProducto()
    .subscribe(resp =>{
      this.productos = resp;
      this.cargando = false;
    });

  }

  borrarProducto(producto: ProductoModel, i: number){

    Swal.fire({
      title: '¿Está seguro?',
      text:`Está seguro que desea borrar a {producto.nombre}`,
      icon:'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then (resp =>{
      if (resp.value){
        this.productos.splice(i,1);
        this.productoService.borrarProducto(producto.id)
        .subscribe();
      }
    })

    
  }

}
