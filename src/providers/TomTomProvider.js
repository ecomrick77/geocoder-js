if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.TomTomProvider = function(_externalLoader, options) {
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

    GeocoderJS.TomTomProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.TomTomProvider.prototype.constructor = GeocoderJS.TomTomProvider;

    GeocoderJS.TomTomProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.tomtom.com',
        pathname: 'search/2/geocode/'+encodeURIComponent(searchString)+'.json'
      });

      var params = {
        key: this.apiKey
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.TomTomProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.mapbox.com',
        pathname: 'search/2/reverseGeocode/'+latitude+','+longitude+'.json'
      });

      var options = {
        key: this.apiKey
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.TomTomProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.position.lat;
      geocoded.longitude = result.position.lon;

      geocoded.streetNumber = (result.address.streetNumber !== undefined) ? result.address.streetNumber : null;
      geocoded.city = result.address.municipality;
      geocoded.region = result.address.countrySubdivisionName;
      geocoded.streetName = result.address.streetName;
      geocoded.postal_code = result.address.postalCode;

      return geocoded;
    };

    GeocoderJS.TomTomProvider.prototype.executeRequest = function(params, callback) {
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
