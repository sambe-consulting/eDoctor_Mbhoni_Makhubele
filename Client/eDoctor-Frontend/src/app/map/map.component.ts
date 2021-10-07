import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { BehaviorSubject } from 'rxjs';
import { ModelsService } from '../models/models.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;

  zoomvalue = new BehaviorSubject<number>(16);
  zoomvalue_cast = this.zoomvalue.asObservable();

  //style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = -25.97612;
  lng = 28.19961;

  markers: mapboxgl.Marker[] = [];
  tempMarker!: mapboxgl.Marker;

  constructor(private _modelsService: ModelsService) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibWJob25pNTU4NSIsImEiOiJja3VjeGRncGkxNHRwMnVtdjdzaGsyZG5uIn0.A4zZliHtCuE0Oq-0JKq7Kw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 17,
      center: [this.lng, this.lat],
    });

    this.zoomvalue_cast.subscribe((data: number) => {
      this.map.zoomTo(data);
    });

    this.map.on('click', (e) => {
      let location_Lng: any = JSON.stringify(e.lngLat.wrap()['lng']);
      let location_Lat: any = JSON.stringify(e.lngLat.wrap()['lat']);

      this.lng = location_Lng;
      this.lat = location_Lat;

      const marker = new mapboxgl.Marker() // initialize a new marker
        .setLngLat([this.lng, this.lat]);
      // Marker [lng, lat] coordinates

      this.markers.push(marker);

      console.log(marker.getLngLat()['lat']);
      this._modelsService.setLocation(
        marker.getLngLat()['lng'],
        marker.getLngLat()['lat']
      );

      console.log(this.markers.length);

      if (this.markers.length == 1) {
        if (this.tempMarker != undefined) {
          this.tempMarker.remove();
        }
        this.markers[0].addTo(this.map);
      } else if (this.markers.length > 1) {
        this.markers[0].remove();
        this.markers[1].addTo(this.map);
        this.tempMarker = this.markers[1];
        this.markers = [];
      }
    });



    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });

    this.map.addControl(geocoder, 'top-left');
  }

  ZoomIn() {
    let val = 0;
    this.zoomvalue_cast.subscribe((data: number) => {
      val = data;
    });
    this.zoomvalue.next(val + 0.5);
  }

  ZoomOut() {
    let val = 0;
    this.zoomvalue_cast.subscribe((data: number) => {
      val = data;
    });
    this.zoomvalue.next(val - 0.5);
  }
}
