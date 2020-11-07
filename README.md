GeocoderJS
==========

Convert addresses to latitude and longitude, and vice versa, to easily display maps such as lower-cost Google Maps 
alternatives. This fork of **GeocoderJS** is a JavaScript port of the [Geocoder PHP](http://geocoder-php.org/Geocoder/) 
library that's been updated a bit. It's meant as a compliment for client-side geocoding applications.

[![Build
Status](https://travis-ci.org/ecomrick77/geocoder-js.svg?branch=master)](https://travis-ci.org/geocoder-php/geocoder-js)

[![Dependency Status](https://david-dm.org/ecomrick77/geocoder-js.png)](https://david-dm.org/geocoder-php/geocoder-js)

[![devDependency Status](https://david-dm.org/ecomrick77/geocoder-js/dev-status.png)](https://david-dm.org/geocoder-php/geocoder-js#info=devDependencies)

Providers
---------

GeocoderJS comes with modules to integrate with various geocoding providers.
The following table summarizes the features of each:

<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Works in browsers?</th>
      <th>Works in Node.JS?</th>
      <th>Supports reverse geocoding?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://docs.microsoft.com/en-us/bingmaps/rest-services/" target="_blank">Bing</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://www.geoapify.com/" target="_blank">Geoapify</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://www.geocod.io/" target="_blank">Geocodio</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://developers.google.com/maps/documentation/geocoding/overview" target="_blank">Google</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html" target="_blank">Here</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://locationiq.com/geocoding" target="_blank">LocationIQ</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://docs.mapbox.com/api/search/" target="_blank">Mapbox</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://developer.mapquest.com/documentation/geocoding-api/" target="_blank">Mapquest</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://opencagedata.com/tutorials/geocode-in-javascript" target="">OpenCage</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://nominatim.org/release-docs/develop/api/Search/" target="_blank">OpenStreetMap</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://radar.io/product/api" target="_blank">Radar</a></td>
      <td>yes</td>
      <td>no</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://developer.tomtom.com/search-api/search-api-documentation-geocoding/geocode" target="_blank">TomTom</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td><a href="https://yandex.com/dev/maps/geocoder/" target="_blank">Yandex</a></td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
  </tbody>
</table>

Leaflet
---------
Easily create [Leaflet's](https://leafletjs.com) to display Google Map alternatives on a website. 
Here's an OpenStreetMap Example:
```
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="dist/geocoder.js"></script>
```
```
<div id="map" style="width:800px; height:600px;"></div>
  <script>
    let openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
    openStreetMapGeocoder.geocode('1600 Pennsylvania Ave NW, Washington, DC', function(result) {
      let ll = result[0]
      let mapOptions = {
        center: [ll.latitude, ll.longitude],
        zoom: 16
      }
      let map = new L.map('map', mapOptions);
      L.marker([ll.latitude, ll.longitude]).addTo(map);
      let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      map.addLayer(layer);
    });
  </script>
```


Building
--------

The `dist` folder contains the latest build. You are welcome to build your own uglified version of the script by running `grunt build`.

Testing
-------

Unit tests are handled by Jasmine. To run unit tests from the command line, use `grunt test`.

Contributing
------------

The parent branch of GeocoderJS appears to have been abandoned. 
Contributions to this fork are welcome.

