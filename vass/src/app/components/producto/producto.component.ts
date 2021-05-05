import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { NgForm } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto = new ProductoModel();

  constructor(private productoService: ProductosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo' ){
      this.productoService.getProductoId(id)
      .subscribe((resp: ProductoModel) =>{
        this.producto = resp;
        this.producto.id = id;
      })
    }
  }

  guardar( form: NgForm ){

    if(form.invalid){
      console.log('Formulario no valido');
      return;

    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.producto.id){
      peticion = this.productoService.actualizarProducto(this.producto);
    }else{
     peticion = this.productoService.createProducto(this.producto);
    }

    peticion.subscribe( resp =>{
      Swal.fire({
        title: this.producto.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      })
    });


    // console.log(form);
    // console.log(this.producto); 

  }

}
