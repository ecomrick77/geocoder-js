if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.OpenCageProvider = function(_externalLoader, options) {
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

    GeocoderJS.OpenCageProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.OpenCageProvider.prototype.constructor = GeocoderJS.OpenCageProvider;

    GeocoderJS.OpenCageProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.opencagedata.com',
        pathname: 'geocode/v1/json'
      });

      var params = {
        key: this.apiKey,
        q: encodeURIComponent(searchString)
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.OpenCageProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.opencagedata.com',
        pathname: 'geocode/v1/json'
      });

      var options = {
        key: this.apiKey,
        q: latitude+','+longitude
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.OpenCageProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.geometry.lat;
      geocoded.longitude = result.geometry.lng;

      geocoded.streetNumber = (result.components.house_number !== undefined) ? result.components.house_number : null;
      geocoded.city = result.components.city;
      geocoded.region = result.components.state;
      geocoded.streetName = result.components.road;
      geocoded.postal_code = result.components.postcode;

      return geocoded;
    };

    GeocoderJS.OpenCageProvider.prototype.executeRequest = function(params, callback) {
      var _this = this;

      this.externalLoader.executeRequest(params, function(data) {
        var results = [];
        if (data.results.length) {
          for (var i in data.results) {
            results.push(_this.mapToGeocoded(data.results[i]));
          }
        }

        callback(results);
      });
    };
})(GeocoderJS);
