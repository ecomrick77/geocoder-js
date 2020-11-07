if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.GeoapifyProvider = function(_externalLoader, options) {
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

    GeocoderJS.GeoapifyProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.GeoapifyProvider.prototype.constructor = GeocoderJS.GeoapifyProvider;

    GeocoderJS.GeoapifyProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.geoapify.com',
        pathname: 'v1/geocode/search'
      });

      var params = {
        apiKey: this.apiKey,
        text: encodeURIComponent(searchString)
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.GeoapifyProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.geoapify.com',
        pathname: 'v1/geocode/reverse'
      });

      var options = {
        apiKey: this.apiKey,
        lat: latitude,
        lon: longitude
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.GeoapifyProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.properties.lat;
      geocoded.longitude = result.properties.lon;

      geocoded.streetNumber = (result.properties.housenumber !== undefined) ? result.properties.housenumber : null;
      geocoded.city = result.properties.city;
      geocoded.region = result.properties.state;
      geocoded.streetName = result.properties.street;
      geocoded.postal_code = result.properties.postcode;

      return geocoded;
    };

    GeocoderJS.GeoapifyProvider.prototype.executeRequest = function(params, callback) {
      var _this = this;

      this.externalLoader.executeRequest(params, function(data) {
        var results = [];
        if (data.features.length) {
          for (var i in data.features) {
            results.push(_this.mapToGeocoded(data.features[i]));
          }
        }

        callback(results);
      });
    };
})(GeocoderJS);
