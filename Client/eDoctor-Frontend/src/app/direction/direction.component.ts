import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DirectionService } from '../direction.service';
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';
declare var H: any;
@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss'],
})
export class DirectionComponent implements OnInit {
  private platform: any;
  origin_coords: any;
  dest_coords: any;

  @ViewChild('map')
  public mapElement!: ElementRef;

  constructor(private directionService: DirectionService) {
    this.platform = new H.service.Platform({
      apikey: '5GKX1NtN2vCLyKiOLmaB_u2OhKn5wwqYTsyfNQuC6KM',
    });
  }

  ngOnInit(): void {}

  public ngAfterViewInit() {
    this.directionService.origin_Coords_cast.pipe().subscribe((data: any) => {
      this.origin_coords = data;
    });

    this.directionService.dest_coords_cast.pipe().subscribe((data: any) => {
      this.dest_coords = data;
    });

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

    /////////////////////////////////////////////////////
    var routingParameters = {
      routingMode: 'fast',
      transportMode: 'car',
      // The start point of the route:
      origin: this.origin_coords['lat'] + ',' + this.origin_coords['lng'],
      // The end point of the route:
      destination: this.dest_coords['lat'] + ',' + this.dest_coords['lng'],
      // Include the route shape in the response
      return: 'polyline',
    };

    // Define a callback function to process the routing response:
    var onResult = function (result: any) {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section: any) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );

          // Create a polyline to display the route:
          let routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 },
          });

          // Create a marker for the start point:
          let startMarker = new H.map.Marker(section.departure.place.location);

          // Create a marker for the end point:
          let endMarker = new H.map.Marker(section.arrival.place.location);

          // Add the route polyline and the two markers to the map:
          map.addObjects([routeLine, startMarker, endMarker]);

          // Set the map's viewport to make the whole route visible:
          map
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() });
        });
      }
    };

    // Get an instance of the routing service version 8:
    var router = this.platform.getRoutingService(null, 8);

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, function (error: any) {
      alert(error.message);
    });
  }
}
