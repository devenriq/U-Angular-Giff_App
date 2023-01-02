import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string= 'IIYlL3sOlKdXnziZ3RH2xKRf7cm4wRwF'
  private _historial: string[]=[]

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){

  }

  buscarGifs(query:string=''){

    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)
    }

    this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=IIYlL3sOlKdXnziZ3RH2xKRf7cm4wRwF&q=dragon ball z&limit=10')
      .subscribe((res:any)=>{
        console.log(res.data)
      })

  }
}
