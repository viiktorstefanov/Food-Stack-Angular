import { Component, Input } from '@angular/core';
import { Blog } from '../../types/blog';

@Component({
  selector: 'app-archives-article',
  templateUrl: './archives-article.component.html',
  styleUrl: './archives-article.component.css'
})
export class ArchivesArticleComponent {
  @Input() blog: Blog | undefined;
}
