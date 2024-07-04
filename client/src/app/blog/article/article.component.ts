import { Component, Input } from '@angular/core';
import { Blog } from '../types/blog';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() blog: Blog | undefined;
}
