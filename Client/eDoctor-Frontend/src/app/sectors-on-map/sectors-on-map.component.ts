import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';

declare var H: any;
@Component({
  selector: 'app-sectors-on-map',
  templateUrl: './sectors-on-map.component.html',
  styleUrls: ['./sectors-on-map.component.scss'],
})
export class SectorsOnMapComponent implements OnInit {
  zoomvalue = new BehaviorSubject<number>(16);
  zoomvalue_cast = this.zoomvalue.asObservable();
  private platform: any;

  @ViewChild('map')
  public mapElement!: ElementRef;

  constructor() {
    this.platform = new H.service.Platform({
      apikey: '5GKX1NtN2vCLyKiOLmaB_u2OhKn5wwqYTsyfNQuC6KM',
    });
  }

  ngOnInit(): void {
    ///////
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        // center: { lat: 52.51, lng: 13.4 },
        center: { lat: -26.2041028, lng: 28.0473051 },
        // pixelRatio: window.devicePixelRatio || 1,
      }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
  }

  ZoomIn() {}

  ZoomOut() {}
}
