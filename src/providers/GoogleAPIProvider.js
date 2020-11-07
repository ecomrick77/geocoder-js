if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../Geocoded.js");
  require("../providers/ProviderBase.js");
}

;(function (GeocoderJS) {
  "use strict";

  GeocoderJS.GoogleAPIProvider = function(_externalLoader, options) {
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

  GeocoderJS.GoogleAPIProvider.prototype = new GeocoderJS.ProviderBase();
  GeocoderJS.GoogleAPIProvider.prototype.constructor = GeocoderJS.GoogleAPIProvider;

  GeocoderJS.GoogleAPIProvider.prototype.geocode = function(searchString, callback) {
    this.externalLoader.setOptions({
      protocol: 'https',
      host: 'maps.googleapis.com',
      pathname: 'maps/api/geocode/json'
    });

    var params = {
      key: this.apiKey,
      sensor: false,
      address: searchString
    };

    this.executeRequest(params, callback);
  };

  GeocoderJS.GoogleAPIProvider.prototype.geodecode = function(latitude, longitude, callback) {
    this.externalLoader.setOptions({
      protocol: 'https',
      host: 'maps.googleapis.com',
      pathname: 'maps/api/geocode/json'
    });

    var params = {
      key: this.apiKey,
      "sensor": false,
      "latlng": latitude + "," + longitude
    };

    this.executeRequest(params, callback);
  };

  GeocoderJS.GoogleAPIProvider.prototype.executeRequest = function(params, callback) {
    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];
      for (var i in data.results) {
        results.push(_this.mapToGeocoded(data.results[i]));
      }
      callback(results);
    });
  };

  GeocoderJS.GoogleAPIProvider.prototype.mapToGeocoded = function(result) {
    var geocoded = new GeocoderJS.Geocoded();
    geocoded.latitude = result.geometry.location.lat;
    geocoded.longitude = result.geometry.location.lng;

    for (var i in result.address_components) {
      for (var j in result.address_components[i].types) {
        switch (result.address_components[i].types[j]) {
          case "street_number":
            geocoded.streetNumber = result.address_components[i].long_name;
            break;
          case "route":
            geocoded.streetName = result.address_components[i].long_name;
            break;
          case "locality":
            geocoded.city = result.address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            geocoded.region = result.address_components[i].long_name;
            break;
          case "postal_code":
            geocoded.postal_code = result.address_components[i].long_name;
            break;
        }
      }
    }

    return geocoded;
  };
})(GeocoderJS);
