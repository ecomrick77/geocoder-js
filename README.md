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
      <td>Google Maps</td>
      <td>yes</td>
      <td>yes</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Mapquest</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>OpenStreetMap</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Bing</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Yandex</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>LocationIQ</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Mapbox</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
  </tbody>
</table>


Building
--------

You can build an uglified version of the script by running 'grunt build'.

Testing
-------

Unit tests are handled by Jasmine. To run unit tests from the command line, use 'grunt test'.

Contributing
------------

The parent branch of GeocoderJS appears to have been abandoned. 
Contributions to this fork are welcome.

