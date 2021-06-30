import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TinTucService } from '../../lib/tintuc.service';


declare let alertify: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  text: any;
  new: any;
  selectedTT: any;
  top: Number[]|any;
  page: any;


  constructor(private _news: TinTucService ) {
    this.top=[5,10,20,50]
  }

  ngOnInit(): void {
    this.page=1;
    this.page=1;
    this.selectedTT = 'TT0001';
    this._news
    .NewView(this.selectedTT)
    .pipe(first())
    .subscribe((res)=>{
      this.new = res;
    })
  }

  GET() {
    this._news
      .NewView(this._news)
      .pipe(first())
      .subscribe(res => {
        this.new = res;
      })
  }
  display: boolean = false;

  select(){
    this._news.postlist('/GetNews', { page: this.page, total: this.selectedTT})
      .subscribe(res => {
        this.new = res.data;
      })
  }
  showDialog() {
    this.display = true;
  }
  loadPage(page:any){
    this._news.postlist('/GetNews', { page: this.page, total: this.selectedTT})
      .subscribe(res => {
        this.new = res.data;
      })

  }
}
