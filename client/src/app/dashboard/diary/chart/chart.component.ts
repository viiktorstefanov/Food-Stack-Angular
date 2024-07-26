import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [BaseChartDirective],
})
export class ChartComponent implements OnChanges{
  @Input() targetCalories: number = 0;
  @Input() currentCalories: number = 0;
  @Input() chartWidth: string = '';

  public doughnutChartLabels: string[] = ['Consumed', 'Remaining'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [0, 0], backgroundColor: ['#ff6c3b', '#f0f2fa'] }
    ]
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItem) => {
            return tooltipItem[0].label;
          },
          label: (tooltipItem) => {
            return "  " + tooltipItem.raw + ' kcal';
          }
        },
      }
    }
  };

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['targetCalories'] || changes['currentCalories']) {
        this.updateChartData();
      }
    };

    private updateChartData(): void {
      const consumedCalories = this.currentCalories;
      const remainingCalories = Math.max(this.targetCalories - this.currentCalories, 0);
  
      this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          { data: [consumedCalories, remainingCalories], backgroundColor: ['#ff6c3b', '#f0f2fa'] }
        ]
      };
    }
}
