if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.LocationIQProvider = function(_externalLoader, options) {
      if (_externalLoader === undefined) {
        throw "No external loader defined.";
      }
      this.externalLoader = _externalLoader;

      if (typeof options !== 'object') {
        options = {};
      }

      var defaults = {
        apiKey: ''
      };

      for (var i in defaults) {
        if (options[i] === undefined) {
          options[i] = defaults[i];
        }
      }

      this.apiKey = options.apiKey;
    };

    GeocoderJS.LocationIQProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.LocationIQProvider.prototype.constructor = GeocoderJS.LocationIQProvider;

    GeocoderJS.LocationIQProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'us1.locationiq.com',
        pathname: 'v1/search.php'
      });

      var params = {
        key: this.apiKey,
        format: 'json',
        q: encodeURIComponent(searchString),
        addressdetails: 1
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.LocationIQProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'us1.locationiq.com',
        pathname: 'v1/reverse.php'
      });

      var options = {
        key: this.apiKey,
        format: 'json',
        lat: latitude,
        lon: longitude
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.LocationIQProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = parseFloat(result.lat);
      geocoded.longitude = parseFloat(result.lon);

      geocoded.streetNumber = (result.address.house_number !== undefined) ? result.address.house_number : null;
      geocoded.city = result.address.city;
      geocoded.region = result.address.state;
      geocoded.streetName = (result.address.road !== undefined) ? result.address.road : result.address.pedestrian;
      geocoded.postal_code = result.address.postcode;

      return geocoded;
    };

    GeocoderJS.LocationIQProvider.prototype.executeRequest = function(params, callback) {
      var _this = this;

      this.externalLoader.executeRequest(params, function(data) {
        var results = [];
        if (data.length) {
          for (var i in data) {
            results.push(_this.mapToGeocoded(data[i]));
          }
        } else {
          results.push(_this.mapToGeocoded(data));
        }

        callback(results);
      });
    };
})(GeocoderJS);
