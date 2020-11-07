if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../ExternalURILoader.js");
}

;(function (GeocoderJS) {
  "use strict";

  GeocoderJS.ProviderFactory = function() {};

  /**
   * Creates new Geocoder Provider instances.
   * @options
   *   Either a string representing the registered provider, or an object with the
   *   following settings for instigating providers.
   *     - provider: A string representing the registered provider.
   * @return
   *   An object compatable with the ProviderBase class, or undefined if there's
   *   not a registered provider.
   */
  GeocoderJS.ProviderFactory.prototype.createProvider = function(options) {
    if (typeof options === "string") {
      options = {
        'provider': options
      };
    }

    var provider;
    var externalLoader = new GeocoderJS.ExternalURILoader();

    if(options.provider == 'bing'){
      provider = new GeocoderJS.BingProvider(externalLoader, options);
    } else if(options.provider == 'google'){
      provider = new GeocoderJS.GoogleAPIProvider(externalLoader, options);
    } else if(options.provider == 'locationlq'){
      provider = new GeocoderJS.LocationIQProvider(externalLoader, options);
    } else if(options.provider == 'mapbox'){
      provider = new GeocoderJS.MapboxProvider(externalLoader, options);
    } else if(options.provider == 'mapquest'){
      provider = new GeocoderJS.MapquestProvider(externalLoader, options);
    } else if(options.provider == 'openstreetmap'){
      provider = new GeocoderJS.OpenStreetMapProvider(externalLoader, options);
    } else if(options.provider == 'radar'){
      provider = new GeocoderJS.RadarProvider(externalLoader, options);
    } else if(options.provider == 'tomtom'){
      provider = new GeocoderJS.TomTomProvider(externalLoader, options);
    } else if(options.provider == 'yandex'){
      provider = new GeocoderJS.YandexProvider(externalLoader, options);
    }

    return provider;
  };

})(GeocoderJS);
