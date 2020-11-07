if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.GeocodioProvider = function(_externalLoader, options) {
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

    GeocoderJS.GeocodioProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.GeocodioProvider.prototype.constructor = GeocoderJS.GeocodioProvider;

    GeocoderJS.GeocodioProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.geocod.io',
        pathname: 'v1.6/geocode'
      });

      var params = {
        api_key: this.apiKey,
        q: encodeURIComponent(searchString)
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.GeocodioProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.geocod.io',
        pathname: 'v1.6/reverse'
      });

      var options = {
        api_key: this.apiKey,
        q: latitude+','+longitude
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.GeocodioProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.location.lat;
      geocoded.longitude = result.location.lng;

      geocoded.streetNumber = (result.address_components.number !== undefined) ? result.address_components.number : null;
      geocoded.city = result.address_components.city;
      geocoded.region = result.address_components.state;
      geocoded.streetName = result.address_components.formatted_street;
      geocoded.postal_code = result.address_components.zip;

      return geocoded;
    };

    GeocoderJS.GeocodioProvider.prototype.executeRequest = function(params, callback) {
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
