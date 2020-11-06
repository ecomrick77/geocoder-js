if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.MapboxProvider = function(_externalLoader, options) {
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

    GeocoderJS.MapboxProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.MapboxProvider.prototype.constructor = GeocoderJS.MapboxProvider;

    GeocoderJS.MapboxProvider.prototype.geocode = function(searchString, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.mapbox.com',
        pathname: 'geocoding/v5/mapbox.places/'+encodeURIComponent(searchString)+'.json'
      });

      var params = {
        access_token: this.apiKey
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.MapboxProvider.prototype.geodecode = function(latitude, longitude, callback) {
      this.externalLoader.setOptions({
        protocol: 'https',
        host: 'api.mapbox.com',
        pathname: 'geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json'
      });

      var options = {
        access_token: this.apiKey
      };

      this.executeRequest(options, callback);
    };

    GeocoderJS.MapboxProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.center[1];
      geocoded.longitude = result.center[0];

      var address=[];
      result.context.forEach(function(v,i){
        address[v.id.split('.')[0]]=v.text;
      })

      geocoded.city = address.place;
      geocoded.region = address.region;
      geocoded.streetName = result.text;
      geocoded.postal_code = address.postcode;

      return geocoded;
    };

    GeocoderJS.MapboxProvider.prototype.executeRequest = function(params, callback) {
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
