describe("OpenCage Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.OpenCageProvider(new GeocoderJS.ExternalURILoader());
  var geocoded;

  var stubOpenCageResult = [
    {
      "annotations": {
        "DMS": {
          "lat": "38° 53' 51.71928'' N",
          "lng": "77° 2' 11.59152'' W"
        },
        "FIPS": {
          "county": "11001",
          "state": "11"
        },
        "MGRS": "18SUJ2338907395",
        "Maidenhead": "FM18lv55ok",
        "Mercator": {
          "x": -8575669.869,
          "y": 4680193.667
        },
        "OSM": {
          "edit_url": "https://www.openstreetmap.org/edit?way=238241022#map=16/38.89770/-77.03655",
          "note_url": "https://www.openstreetmap.org/note/new#map=16/38.89770/-77.03655&layers=N",
          "url": "https://www.openstreetmap.org/?mlat=38.89770&mlon=-77.03655#map=16/38.89770/-77.03655"
        },
        "UN_M49": {
          "regions": {
            "AMERICAS": "019",
            "NORTHERN_AMERICA": "021",
            "US": "840",
            "WORLD": "001"
          },
          "statistical_groupings": [
            "MEDC"
          ]
        },
        "callingcode": 1,
        "currency": {
          "alternate_symbols": [
            "US$"
          ],
          "decimal_mark": ".",
          "disambiguate_symbol": "US$",
          "html_entity": "$",
          "iso_code": "USD",
          "iso_numeric": "840",
          "name": "United States Dollar",
          "smallest_denomination": 1,
          "subunit": "Cent",
          "subunit_to_unit": 100,
          "symbol": "$",
          "symbol_first": 1,
          "thousands_separator": ","
        },
        "flag": "🇺🇸",
        "geohash": "dqcjqcpew0y96kgmm4sq",
        "qibla": 56.56,
        "roadinfo": {
          "drive_on": "right",
          "road": "Pennsylvania Avenue Northwest",
          "speed_in": "mph"
        },
        "sun": {
          "rise": {
            "apparent": 1604749440,
            "astronomical": 1604743980,
            "civil": 1604747760,
            "nautical": 1604745840
          },
          "set": {
            "apparent": 1604786400,
            "astronomical": 1604791860,
            "civil": 1604788080,
            "nautical": 1604789940
          }
        },
        "timezone": {
          "name": "America/New_York",
          "now_in_dst": 0,
          "offset_sec": -18000,
          "offset_string": "-0500",
          "short_name": "EST"
        },
        "what3words": {
          "words": "deeply.bunk.farmer"
        },
        "wikidata": "Q35525"
      },
      "bounds": {
        "northeast": {
          "lat": 38.897911,
          "lng": -77.0362526
        },
        "southwest": {
          "lat": 38.8974907,
          "lng": -77.0368537
        }
      },
      "components": {
        "ISO_3166-1_alpha-2": "US",
        "ISO_3166-1_alpha-3": "USA",
        "_category": "unknown",
        "_type": "historic",
        "city": "Washington",
        "continent": "North America",
        "country": "United States of America",
        "country_code": "us",
        "historic": "White House",
        "house_number": "1600",
        "postcode": "20500",
        "road": "Pennsylvania Avenue Northwest",
        "state": "District of Columbia",
        "state_code": "DC"
      },
      "confidence": 9,
      "formatted": "White House, 1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States of America",
      "geometry": {
        "lat": 38.8976998,
        "lng": -77.0365532
      }
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubOpenCageResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.8976998, -77.0365532]);
  });

  it ("maps street number correctly", function() {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Washington");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20500");
  });
});
