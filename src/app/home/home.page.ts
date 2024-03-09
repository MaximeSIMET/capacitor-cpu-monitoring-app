import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CPULoadEvents, CPULoadState, CPUMonitoring } from 'capacitor-cpu-monitoring';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas?: ElementRef;

  CPULoad: number = -1;
  refreshIntervalMillis: number = 1000;
  chart: any;
  charset: Array<number> = [0,0,0,0,0,0,0,0,0,0];

  private CPULoadListener: Array<PluginListenerHandle> = [];
  constructor() {}

  ngOnInit() {
    this.initListeners();
  }

  public getCPULoad() {
    CPUMonitoring.getLoad().then((CPULoad: CPULoadState) => {
      this.CPULoad = CPULoad.load;
    })
  }

  public updateRefreshIntervalMillis(milliseconds: number) {
    this.refreshIntervalMillis += milliseconds;
    this.setPluginRefreshIntervalMillis();
  }

  public onRangeValueChange(event: CustomEvent) {
    this.refreshIntervalMillis = event.detail.value;
    this.setPluginRefreshIntervalMillis();
  }

  public convertToSeconds(milliseconds: number): string {
    return (milliseconds / 1000).toFixed(1);
  }

  ngOnDestroy() {
    void this.CPULoadListener.map(listener => listener.remove());
  }

  private initListeners() {
    this.CPULoadListener.unshift(CPUMonitoring.addListener(CPULoadEvents.CPULoad, (CPULoad: CPULoadState) => {
      this.CPULoad = CPULoad.load;
      this.updateCharset(CPULoad.load);
    }));
  }

  private setPluginRefreshIntervalMillis() {
    CPUMonitoring.setLoadRefreshTime({ interval: this.refreshIntervalMillis });
  }

  private updateCharset(load: number): void {
    this.charset.shift();
    this.charset.push(load);
    this.charset = [...this.charset];
  }
}
