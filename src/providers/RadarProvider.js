if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.RadarProvider = function(_externalLoader, options) {
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

    GeocoderJS.RadarProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.RadarProvider.prototype.constructor = GeocoderJS.RadarProvider;

    GeocoderJS.RadarProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.radar.io',
        pathname: 'v1/geocode/forward'
      });

      var params = {
        query: encodeURIComponent(searchString)
      };

      this.executeRequest(params, callback, [{'name':'Authorization','value':this.apiKey}]);
    };

    GeocoderJS.RadarProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.radar.io',
        pathname: 'v1/geocode/reverse'
      });

      var options = {
        coordinates: longitude+','+latitude
      };

      this.executeRequest(options, callback,[{'name':'Authorization','value':this.apiKey}]);
    };

    GeocoderJS.RadarProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.latitude;
      geocoded.longitude = result.longitude;

      geocoded.streetNumber = (result.number !== undefined) ? result.number : null;
      geocoded.city = result.city;
      geocoded.region = result.state;
      geocoded.streetName = (result.street !== undefined) ? result.street : null;
      geocoded.postal_code = result.postalCode;

      return geocoded;
    };

    GeocoderJS.RadarProvider.prototype.executeRequest = function(params, callback, headers) {
      var _this = this;

      this.externalLoader.executeRequest(params, function(data) {
        var results = [];
        if (data.addresses.length) {
          for (var i in data.addresses) {
            results.push(_this.mapToGeocoded(data.addresses[i]));
          }
        }

        callback(results);
      }, headers);
    };
})(GeocoderJS);
