import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/api/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: any[] = [];
  media: any[] = [];
  heritageSites: any[] = [];
  mappings: any[] = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    // Fetch articles
    this.mainService.getArticlesList().subscribe((res: any) => {
      this.articles = res;
    });

    // Fetch media
    this.mainService.getMediaList().subscribe((res: any) => {
      this.media = res;
    });

    // Fetch heritage sites
    this.mainService.getSiteList().subscribe((res: any) => {
      this.heritageSites = res;
    });

    // Fetch mappings
    this.mainService.getMappingList().subscribe((res: any) => {
      this.mappings = res;
    });
  }
}
