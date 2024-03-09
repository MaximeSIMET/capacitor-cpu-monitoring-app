import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnChanges {
  @Input() charset: Array<number> = [];
  @Input() refreshIntervalMillis: number = 0;
  public chart: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.chart) {
      this.chart.data.datasets.pop();
      this.chart.data.datasets.push({
        backgroundColor: 'red',
        data: this.charset.map(charset => charset),
      });
      this.chart.update();
    } else {
      this.createChart();
    }

    if(changes['refreshIntervalMillis']) {
      this.chart && this.chart.destroy();
      this.createChart();
    }
  }

  createChart(){

    let labels = [];
    for (let i = 10; i >= 1; i--) {
      labels.push(-this.refreshIntervalMillis * i / 1000 +'s');
    }

    this.chart = new Chart("bar-chart", {
      type: 'bar',

      data: {
        labels,
        datasets: [
          {
            label: "CPU Load",
            data:  [],
            backgroundColor: '#e28743'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
        },
        animation: {
          duration: 0
        },
        aspectRatio: 1.2,
        scales: {
          y: {
            min: 0,
            max: 100,
          }
        }
      }

    });
  }
}
