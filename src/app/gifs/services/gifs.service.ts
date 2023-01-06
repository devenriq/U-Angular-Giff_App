import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string= 'IIYlL3sOlKdXnziZ3RH2xKRf7cm4wRwF'
  private _historial: string[]=[]

  public resultados: Gif[]=[]

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

  }

  buscarGifs(query:string=''){

    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial',JSON.stringify(this._historial))
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=IIYlL3sOlKdXnziZ3RH2xKRf7cm4wRwF&q=${query}&limit=10`)
      .subscribe((res)=>{
        console.log(res.data)
        this.resultados=res.data
      })
  }
}
