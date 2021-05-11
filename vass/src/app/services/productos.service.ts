import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = 'https://crud-cb55d-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  createProducto( producto: ProductoModel){
    return this.http.post(`${this.url}/producto.json`,producto)
    .pipe(
      map((resp: any) =>{
        producto.id = resp.name;
        return producto;
      })
    )
  }
 
  getProductoId(id:string){
    return this.http.get(`${this.url}/producto/${id}.json`);
  }
  actualizarProducto( producto: ProductoModel){

    const productoTemp ={
      ...producto
    };
    
    delete productoTemp.id;

    return this.http.put(`${this.url}/producto/${producto.id}.json`, productoTemp)
  }

  borrarProducto(id:string){
    return this.http.delete(`${this.url}/producto/${id}.json`);
  }

  getProducto(){
    return this.http.get(`${this.url}/producto.json`)
    .pipe(
      map( this.crearArreglo),
      delay(1500)
    );
   
  }
  private crearArreglo(productosObj: object){

    const productos: ProductoModel[] = [];

    console.log(productosObj);

    Object.keys(productosObj).forEach( key =>{

      const producto: ProductoModel = productosObj[key];
      producto.id = key;

      productos.push(producto);


    })

    if (productosObj === null){return[];}
  

    return productos;
  
  }

  

}

