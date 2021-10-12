import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DirectionService } from '../direction.service';
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss'],
})
export class DirectionComponent implements OnInit {
  map!: mapboxgl.Map;

  //style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = -25.97612;
  lng = 28.19961;

  coords: any;
  sourceCoords: any;
  constructor(private directionService: DirectionService) {}

  ngOnInit(): void {
    this.directionService.coords_cast.pipe().subscribe((data) => {
      this.coords = data;
    });

    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibWJob25pNTU4NSIsImEiOiJja3VjeGRncGkxNHRwMnVtdjdzaGsyZG5uIn0.A4zZliHtCuE0Oq-0JKq7Kw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 17,
      center: [this.lng, this.lat],
    });

    this.directionService.sourceCoords_cast.pipe().subscribe((data: any) => {
      this.sourceCoords = data;
    });

    // var mapboxgl = require('mapbox-gl');
    // var MapboxDirections = require('mapbox-gl-directions');

    // this.map.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   }),
    //   'top-left'
    // );
  }
}
