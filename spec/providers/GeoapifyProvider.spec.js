describe("Mapbox Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.GeoapifyProvider(new GeocoderJS.ExternalURILoader());
  var geocoded;

  var stubGeoapifyResult = [
    {
      "type": "Feature",
      "properties": {
        "datasource": {
          "sourcename": "openstreetmap",
          "attribution": "© OpenStreetMap contributors",
          "license": "Open Database Licence",
          "url": "https://www.openstreetmap.org/copyright"
        },
        "name": "White House",
        "housenumber": "1600",
        "street": "Pennsylvania Avenue Northwest",
        "suburb": "Golden Triangle",
        "city": "Washington",
        "state": "Washington, D.C.",
        "postcode": "20500",
        "country": "United States of America",
        "country_code": "us",
        "lon": -77.03655348862276,
        "lat": 38.8976998,
        "formatted": "White House, 1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States of America",
        "address_line1": "White House",
        "address_line2": "1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States of America",
        "result_type": "amenity",
        "rank": {
          "importance": 1.04472115416811,
          "popularity": 8.615793062435909,
          "confidence": 1,
          "match_type": "inner_part"
        },
        "place_id": "51208c71e4564253c0591850b9d3e7724340f00102f901fe44330e00000000"
      },
      "bbox": [
        -77.0368542,
        38.8974898,
        -77.0362526,
        38.897911
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.03655348862276,
          38.8976998
        ]
      }
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubGeoapifyResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.8976998, -77.03655348862276]);
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
    expect(geocoded.getRegion()).toEqual("Washington, D.C.");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20500");
  });
});
