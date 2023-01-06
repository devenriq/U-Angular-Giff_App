import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  // Esta es la key de mi cuenta de Giphy
  private apiKey: string= 'IIYlL3sOlKdXnziZ3RH2xKRf7cm4wRwF'

  // Inicializamos una variable privada que contiene un array de strings. Se hizo privada para que solo sea accesible desde este espacio
  private _historial: string[]=[]

  // Inicialización de una variable pública cuyo tipado es de Gif, sacado de la estructura de la API. Guarda los resultados de la data traída por el método .http
  public resultados: Gif[]=[]


  // Con este getter se obtiene la información del historial y se copia de tal forma que el problema de cómo son guardados los datos en JS es solucionado y se evitan intromisiones por parte del cliente
  get historial(){
    return [...this._historial]
  }

  // Este constructor hace el fetch con una manera especial de angular
  constructor(private http: HttpClient){

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []


  }

  // Este método se encarga de buscar los gifs con las palabras coincidentes del input de búsqueda. Recibe una palabra
  buscarGifs(query:string=''){
    // Se estandariza la palabra que recibe. Se cortan los espacios en blancos y se convierte en minúscula
    query = query.trim().toLocaleLowerCase()

    // Condicional que dice que si el array del historial NO incluye la palabra introducida, haga lo que está dentro
    if (!this._historial.includes(query)) {
      // Se introduce la última palabra buscada al principio del array de historial
      this._historial.unshift(query)
      // Se corta el historial para que solo tenga 10 espacios, del 0 al 9
      this._historial = this._historial.splice(0,10)

      //Se guarda en el local storage lo contenido en el historial en formato JSON
      localStorage.setItem('historial',JSON.stringify(this._historial))

      // Se guarda la visualización de los resultados obtenidos del consumo del API
      localStorage.setItem('resultados',JSON.stringify(this.resultados))
    }

    // Se hace la petición de la información a la API con este nuevo método .http; parecido a fetch
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=IIYlL3sOlKdXnziZ3RH2xKRf7cm4wRwF&q=${query}&limit=10`)
      .subscribe((res)=>{
        console.log(res.data)
        this.resultados=res.data
      })
  }
}
