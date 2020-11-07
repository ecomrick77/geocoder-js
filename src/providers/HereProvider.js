if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.HereProvider = function(_externalLoader, options) {
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

    GeocoderJS.HereProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.HereProvider.prototype.constructor = GeocoderJS.HereProvider;

    GeocoderJS.HereProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'geocode.search.hereapi.com',
        pathname: 'v1/geocode'
      });

      var params = {
        apiKey: this.apiKey,
        q: encodeURIComponent(searchString)
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.HereProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'geocode.search.hereapi.com',
        pathname: 'v1/revgeocode'
      });

      var options = {
        apiKey: this.apiKey,
        at: latitude+','+longitude
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.HereProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.position.lat;
      geocoded.longitude = result.position.lng;

      geocoded.streetNumber = (result.address.houseNumber !== undefined) ? result.address.houseNumber : null;
      geocoded.city = result.address.city;
      geocoded.region = result.address.state;
      geocoded.streetName = result.address.street;
      geocoded.postal_code = result.address.postalCode;

      return geocoded;
    };

    GeocoderJS.HereProvider.prototype.executeRequest = function(params, callback) {
      var _this = this;

      this.externalLoader.executeRequest(params, function(data) {
        var results = [];
        if (data.items.length) {
          for (var i in data.items) {
            results.push(_this.mapToGeocoded(data.items[i]));
          }
        }

        callback(results);
      });
    };
})(GeocoderJS);
