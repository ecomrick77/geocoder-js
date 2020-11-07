var GeocoderJS;

!function() {
    "use strict";
    var o = {
        version: "0.0.0",
        createGeocoder: function(e) {
            return new o.ProviderFactory().createProvider(e);
        }
    };
    ("object" == typeof window ? window : "object" == typeof exports ? exports : {}).GeocoderJS = o;
}(), "function" == typeof define && define.amd && define(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js")), 
function(e) {
    "use strict";
    e.ProviderBase = function() {}, e.ProviderBase.prototype = {
        geocode: function(e, o) {},
        geodecode: function(e, o, t) {},
        mapToGeocoded: function(e) {},
        executeRequest: function(e, o) {}
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("./GeocoderJS.js")), 
function(e) {
    "use strict";
    e.Geocoded = function() {}, e.Geocoded.prototype = {
        getCoordinates: function() {
            return [ this.latitude, this.longitude ];
        },
        getLatitude: function() {
            return this.latitude;
        },
        getLongitude: function() {
            return this.longitude;
        },
        getBounds: function() {},
        getStreetNumber: function() {
            return this.streetNumber;
        },
        getStreetName: function() {
            return this.streetName;
        },
        getCity: function() {
            return this.city;
        },
        getZipcode: function() {
            return this.postal_code;
        },
        getCityDistrict: function() {},
        getCounty: function() {},
        getCountyCode: function() {},
        getRegion: function() {
            return this.region;
        }
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("./GeocoderJS.js")), 
function() {
    "use strict";
    var t = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Point",
            coordinates: []
        }
    };
    GeocoderJS.GeoJSONDumper = function() {
        return {
            dump: function(e) {
                var o = t;
                return o.geometry.coordinates = [ e.getLongitude(), e.getLatitude() ], o;
            }
        };
    };
}(), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js"), 
require("../ExternalURILoader.js")), function(r) {
    "use strict";
    r.ProviderFactory = function() {}, r.ProviderFactory.prototype.createProvider = function(e) {
        var o;
        "string" == typeof e && (e = {
            provider: e
        });
        var t = new r.ExternalURILoader();
        switch (e.provider) {
          case "google":
            o = new r.GoogleAPIProvider(t, e);
            break;

          case "mapquest":
            o = new r.MapquestProvider(t, e);
            break;

          case "openstreetmap":
            o = new r.OpenStreetMapProvider(t, e);
            break;

          case "bing":
            o = new r.BingProvider(t, e);
            break;

          case "yandex":
            o = new r.YandexProvider(t, e);
            break;

          case "locationiq":
            o = new r.LocationIQProvider(t, e);
            break;

          case "mapbox":
            o = new r.MapboxProvider(t, e);
            break;

          case "tomtom":
            o = new r.TomTomProvider(t, e);
        }
        return o;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js")), 
function(a, d) {
    "use strict";
    a.ExternalURILoader = function(e) {
        this.options = {}, void 0 === e && (e = {}), this.setOptions(e);
    }, a.ExternalURILoader.prototype.setOptions = function(e) {
        var o, t = {
            protocol: null,
            host: null,
            pathname: null
        };
        for (o in t) this.options[o] = (void 0 !== e[o] ? e : t)[o];
    }, a.ExternalURILoader.prototype.executeRequest = function(e, o) {
        var t, i, r, n, s = this;
        if ("undefined" != typeof XMLHttpRequest) return function(e, o) {
            var t, r = new XMLHttpRequest(), i = s.options.protocol + "://" + s.options.host + "/" + s.options.pathname + "?", n = [];
            e.JSONPCallback && (a = e.JSONPCallback, delete e.JSONPCallback, e[a] = function(o) {
                var e = Date.now(), t = "jsonp" + Math.round(e + 1000001 * Math.random());
                return d[t] = function(e) {
                    o(e), delete d[t];
                }, t;
            }(o));
            for (t in e) e.hasOwnProperty(t) && n.push(t + "=" + e[t]);
            {
                var a;
                i += n.join("&"), a ? ((a = document.createElement("script")).src = i, document.getElementsByTagName("head")[0].appendChild(a)) : (r.onload = function() {
                    if (200 != this.status) return console.log("Received HTTP status code " + this.status + " when attempting geocoding request."), 
                    o(null);
                    if (!this.responseText || !this.responseText.length) return console.log("Received empty data when attempting geocoding request."), 
                    o(null);
                    var e = !1;
                    try {
                        e = JSON.parse(this.responseText);
                    } catch (e) {
                        return console.log("Received invalid JSON data when attempting geocoding request."), 
                        o(null);
                    }
                    return e ? o(e) : (console.log("Received unexpected JSON data when attempting geocoding request."), 
                    o(null));
                }, r.open("GET", i), r.send());
            }
        }(e, o);
        try {
            require("url");
            return t = e, i = o, r = require("url"), n = require(s.options.protocol), t = {
                protocol: s.options.protocol,
                host: s.options.host,
                pathname: s.options.pathname,
                query: t
            }, t = r.format(t), void n.get(t, function(r) {
                if (200 != r.statusCode) throw "Received HTTP status code " + r.statusCode + " when attempting geocoding request.";
                r.data = "", r.setEncoding("utf8"), r.on("data", function(e) {
                    r.data += e;
                }), r.on("end", function() {
                    if (!r.data || !r.data.length) throw "Received empty data when attempting geocoding request.";
                    var e = !1, o = 0, t = [];
                    try {
                        e = JSON.parse(r.data);
                    } catch (e) {
                        throw "Received invalid JSON data when attempting geocoding request.";
                    }
                    if (e && e.status) {
                        if ("OVER_QUERY_LIMIT" === e.status) throw "Exceeded daily quota when attempting geocoding request.";
                        if ("OK" === e.status && e.results) {
                            for (;o < e.results.length; o++) t.push(a.GoogleAPIProvider.prototype.mapToGeocoded(e.results[o]));
                            return i(t);
                        }
                    }
                    throw "Received unexpected JSON data when attempting geocoding request.";
                });
            }).on("error", function(e) {
                throw e;
            });
        } catch (e) {}
        return o(null);
    };
}(GeocoderJS, window), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js"), 
require("../Geocoded.js"), require("../providers/ProviderBase.js")), function(t) {
    "use strict";
    var r, i;
    t.BingProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, r = (o = o || {}).useSSL || !1, (i = o.apiKey || null) && (r = !0);
    }, t.BingProvider.prototype = new t.ProviderBase(), t.BingProvider.prototype.constructor = t.BingProvider, 
    t.BingProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: !0 === r ? "https" : "http",
            host: "dev.virtualearth.net",
            pathname: "REST/v1/Locations/" + e
        });
        e = {
            key: i,
            JSONPCallback: "jsonp"
        };
        this.executeRequest(e, o);
    }, t.BingProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: !0 === r ? "https" : "http",
            host: "dev.virtualearth.net",
            pathname: "REST/v1/Locations/" + e + "," + o
        });
        o = {
            key: i,
            JSONPCallback: "jsonp"
        };
        this.executeRequest(o, t);
    }, t.BingProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o, t = [];
            for (o in e.resourceSets[0].resources) t.push(i.mapToGeocoded(e.resourceSets[0].resources[o]));
            r(t);
        });
    }, t.BingProvider.prototype.mapToGeocoded = function(e) {
        var o = new t.Geocoded();
        return o.latitude = e.point.coordinates[0], o.longitude = e.point.coordinates[1], 
        o.streetName = e.address.addressLine, o.city = e.address.locality, o.region = e.address.adminDistrict, 
        o.postal_code = e.address.postalCode, o;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js"), 
require("../Geocoded.js"), require("../providers/ProviderBase.js")), function(i) {
    "use strict";
    i.GoogleAPIProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, "object" != typeof o && (o = {});
        var t, r = {
            apiKey: ""
        };
        for (t in r) void 0 === o[t] && (o[t] = r[t]);
        this.apiKey = o.apiKey;
    }, i.GoogleAPIProvider.prototype = new i.ProviderBase(), i.GoogleAPIProvider.prototype.constructor = i.GoogleAPIProvider, 
    i.GoogleAPIProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "maps.googleapis.com",
            pathname: "maps/api/geocode/json"
        });
        e = {
            key: this.apiKey,
            sensor: !1,
            address: e
        };
        this.executeRequest(e, o);
    }, i.GoogleAPIProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "maps.googleapis.com",
            pathname: "maps/api/geocode/json"
        });
        o = {
            key: this.apiKey,
            sensor: !1,
            latlng: e + "," + o
        };
        this.executeRequest(o, t);
    }, i.GoogleAPIProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o, t = [];
            for (o in e.results) t.push(i.mapToGeocoded(e.results[o]));
            r(t);
        });
    }, i.GoogleAPIProvider.prototype.mapToGeocoded = function(e) {
        var o, t = new i.Geocoded();
        for (o in t.latitude = e.geometry.location.lat, t.longitude = e.geometry.location.lng, 
        e.address_components) for (var r in e.address_components[o].types) switch (e.address_components[o].types[r]) {
          case "street_number":
            t.streetNumber = e.address_components[o].long_name;
            break;

          case "route":
            t.streetName = e.address_components[o].long_name;
            break;

          case "locality":
            t.city = e.address_components[o].long_name;
            break;

          case "administrative_area_level_1":
            t.region = e.address_components[o].long_name;
            break;

          case "postal_code":
            t.postal_code = e.address_components[o].long_name;
        }
        return t;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js")), 
function(t) {
    "use strict";
    t.LocationIQProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, "object" != typeof o && (o = {});
        var t, r = {
            apiKey: ""
        };
        for (t in r) void 0 === o[t] && (o[t] = r[t]);
        this.apiKey = o.apiKey;
    }, t.LocationIQProvider.prototype = new t.ProviderBase(), t.LocationIQProvider.prototype.constructor = t.LocationIQProvider, 
    t.LocationIQProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "us1.locationiq.com",
            pathname: "v1/search.php"
        });
        e = {
            key: this.apiKey,
            format: "json",
            q: encodeURIComponent(e),
            addressdetails: 1
        };
        this.executeRequest(e, o);
    }, t.LocationIQProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "us1.locationiq.com",
            pathname: "v1/reverse.php"
        });
        o = {
            key: this.apiKey,
            format: "json",
            lat: e,
            lon: o
        };
        this.executeRequest(o, t);
    }, t.LocationIQProvider.prototype.mapToGeocoded = function(e) {
        var o = new t.Geocoded();
        return o.latitude = parseFloat(e.lat), o.longitude = parseFloat(e.lon), o.streetNumber = void 0 !== e.address.house_number ? e.address.house_number : null, 
        o.city = e.address.city, o.region = e.address.state, o.streetName = void 0 !== e.address.road ? e.address.road : e.address.pedestrian, 
        o.postal_code = e.address.postcode, o;
    }, t.LocationIQProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o = [];
            if (e.length) for (var t in e) o.push(i.mapToGeocoded(e[t])); else o.push(i.mapToGeocoded(e));
            r(o);
        });
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js")), 
function(r) {
    "use strict";
    r.MapboxProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, "object" != typeof o && (o = {});
        var t, r = {
            apiKey: ""
        };
        for (t in r) void 0 === o[t] && (o[t] = r[t]);
        this.apiKey = o.apiKey;
    }, r.MapboxProvider.prototype = new r.ProviderBase(), r.MapboxProvider.prototype.constructor = r.MapboxProvider, 
    r.MapboxProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "api.mapbox.com",
            pathname: "geocoding/v5/mapbox.places/" + encodeURIComponent(e) + ".json"
        });
        e = {
            access_token: this.apiKey
        };
        this.executeRequest(e, o);
    }, r.MapboxProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "api.mapbox.com",
            pathname: "geocoding/v5/mapbox.places/" + o + "," + e + ".json"
        });
        e = {
            access_token: this.apiKey
        };
        this.executeRequest(e, t);
    }, r.MapboxProvider.prototype.mapToGeocoded = function(e) {
        var o = new r.Geocoded();
        o.latitude = e.center[1], o.longitude = e.center[0];
        var t = [];
        return e.context.forEach(function(e, o) {
            t[e.id.split(".")[0]] = e.text;
        }), o.streetNumber = void 0 !== e.address ? e.address : null, o.city = t.place, 
        o.region = t.region, o.streetName = e.text, o.postal_code = t.postcode, o;
    }, r.MapboxProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o = [];
            if (e.features.length) for (var t in e.features) o.push(i.mapToGeocoded(e.features[t]));
            r(o);
        });
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js")), 
function(t) {
    "use strict";
    t.MapquestProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, "object" != typeof o && (o = {});
        var t, r = {
            apiKey: ""
        };
        for (t in r) void 0 === o[t] && (o[t] = r[t]);
        this.apiKey = o.apiKey;
    }, t.MapquestProvider.prototype = new t.ProviderBase(), t.MapquestProvider.prototype.constructor = t.MapquestProvider, 
    t.MapquestProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "www.mapquestapi.com",
            pathname: "geocoding/v1/address"
        });
        e = {
            key: this.apiKey,
            outputFormat: "json",
            location: encodeURIComponent(e),
            JSONPCallback: "callback"
        };
        this.executeRequest(e, o);
    }, t.MapquestProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "www.mapquestapi.com",
            pathname: "geocoding/v1/reverse"
        });
        o = {
            key: this.apiKey,
            outputFormat: "json",
            JSONPCallback: "callback",
            location: e + "," + o
        };
        this.executeRequest(o, t);
    }, t.MapquestProvider.prototype.mapToGeocoded = function(e) {
        var o = new t.Geocoded();
        return o.latitude = e.latLng.lat, o.longitude = e.latLng.lng, o.city = e.adminArea5, 
        o.region = e.adminArea4, o.streetName = e.street, o.postal_code = e.postalCode, 
        o;
    }, t.MapquestProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o = [];
            if (e.results[0].locations.length) for (var t in e.results[0].locations) o.push(i.mapToGeocoded(e.results[0].locations[t]));
            r(o);
        });
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js"), 
require("../Geocoded.js"), require("../ExternalURILoader.js"), require("../providers/ProviderBase.js")), 
function(t) {
    "use strict";
    t.OpenStreetMapProvider = function(e) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e;
    }, t.OpenStreetMapProvider.prototype = new t.ProviderBase(), t.OpenStreetMapProvider.prototype.constructor = t.OpenStreetMapProvider, 
    t.OpenStreetMapProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "nominatim.openstreetmap.org",
            pathname: "search"
        });
        e = {
            format: "json",
            q: e,
            addressdetails: 1
        };
        this.executeRequest(e, o);
    }, t.OpenStreetMapProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "nominatim.openstreetmap.org",
            pathname: "reverse"
        });
        o = {
            format: "json",
            lat: e,
            lon: o,
            addressdetails: 1,
            zoom: 18
        };
        this.executeRequest(o, t);
    }, t.OpenStreetMapProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o = [];
            if (e.length) for (var t in e) o.push(i.mapToGeocoded(e[t])); else o.push(i.mapToGeocoded(e));
            r(o);
        });
    }, t.OpenStreetMapProvider.prototype.mapToGeocoded = function(e) {
        var o = new t.Geocoded();
        return o.latitude = +e.lat, o.longitude = +e.lon, o.streetNumber = void 0 !== e.address.house_number ? e.address.house_number : void 0, 
        o.streetName = e.address.road, o.city = e.address.city, o.region = e.address.state, 
        o.postal_code = e.address.postcode, o;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js")), 
function(t) {
    "use strict";
    t.TomTomProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, "object" != typeof o && (o = {});
        var t, r = {
            apiKey: ""
        };
        for (t in r) void 0 === o[t] && (o[t] = r[t]);
        this.apiKey = o.apiKey;
    }, t.TomTomProvider.prototype = new t.ProviderBase(), t.TomTomProvider.prototype.constructor = t.TomTomProvider, 
    t.TomTomProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "api.tomtom.com",
            pathname: "search/2/geocode/" + encodeURIComponent(e) + ".json"
        });
        e = {
            key: this.apiKey
        };
        this.executeRequest(e, o);
    }, t.TomTomProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: "https",
            host: "api.mapbox.com",
            pathname: "search/2/reverseGeocode/" + e + "," + o + ".json"
        });
        o = {
            key: this.apiKey
        };
        this.executeRequest(o, t);
    }, t.TomTomProvider.prototype.mapToGeocoded = function(e) {
        var o = new t.Geocoded();
        return o.latitude = e.position.lat, o.longitude = e.position.lon, o.streetNumber = void 0 !== e.address.streetNumber ? e.address.streetNumber : null, 
        o.city = e.address.municipality, o.region = e.address.countrySubdivisionName, o.streetName = e.address.streetName, 
        o.postal_code = e.address.postalCode, o;
    }, t.TomTomProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o = [];
            if (e.results.length) for (var t in e.results) o.push(i.mapToGeocoded(e.results[t]));
            r(o);
        });
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require && (GeocoderJS = require("../GeocoderJS.js"), 
require("../Geocoded.js"), require("../providers/ProviderBase.js")), function(r) {
    "use strict";
    var i;
    r.YandexProvider = function(e, o) {
        if (void 0 === e) throw "No external loader defined.";
        this.externalLoader = e, i = (o = o || {}).useSSL || !1, this.lang = o.lang || "en-US";
    }, r.YandexProvider.prototype = new r.ProviderBase(), r.YandexProvider.prototype.constructor = r.YandexProvider, 
    r.YandexProvider.prototype.geocode = function(e, o) {
        this.externalLoader.setOptions({
            protocol: !0 === i ? "https" : "http",
            host: "geocode-maps.yandex.ru",
            pathname: "1.x"
        });
        e = {
            format: "json",
            geocode: e,
            JSONPCallback: "callback",
            lang: this.lang
        };
        this.executeRequest(e, o);
    }, r.YandexProvider.prototype.geodecode = function(e, o, t) {
        this.externalLoader.setOptions({
            protocol: !0 === i ? "https" : "http",
            host: "geocode-maps.yandex.ru",
            pathname: "1.x"
        });
        e = {
            format: "json",
            geocode: o + "," + e,
            JSONPCallback: "callback",
            lang: this.lang
        };
        this.executeRequest(e, t);
    }, r.YandexProvider.prototype.executeRequest = function(e, r) {
        var i = this;
        this.externalLoader.executeRequest(e, function(e) {
            var o, t = [];
            for (o in e.response.GeoObjectCollection.featureMember) t.push(i.mapToGeocoded(e.response.GeoObjectCollection.featureMember[o].GeoObject));
            r(t);
        });
    }, r.YandexProvider.prototype.mapToGeocoded = function(e) {
        var o = new r.Geocoded(), t = e.Point.pos.split(" ");
        return o.latitude = +t[1], o.longitude = +t[0], !e.metaDataProperty.GeocoderMetaData.AddressDetails.Country || (e = e.metaDataProperty.GeocoderMetaData.AddressDetails.Country).AdministrativeArea && (e = e.AdministrativeArea, 
        o.region = e.AdministrativeAreaName, e.SubAdministrativeArea && (e = e.SubAdministrativeArea).Locality && (e = e.Locality, 
        o.city = e.LocalityName, e.Thoroughfare && (e = e.Thoroughfare, o.streetName = e.ThoroughfareName))), 
        o;
    };
}(GeocoderJS);