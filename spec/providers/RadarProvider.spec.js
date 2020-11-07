describe("Mapbox Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.RadarProvider(new GeocoderJS.ExternalURILoader());
  var geocoded;

  var stubLocationIQResult = [
    {
      "latitude": 38.897678,
      "longitude": -77.036552,
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.036552,
          38.897678
        ]
      },
      "country": "United States",
      "countryCode": "US",
      "countryFlag": "",
      "distance": 0,
      "confidence": "exact",
      "city": "Washington",
      "number": "1600",
      "neighborhood": "White House Grounds",
      "postalCode": "20500",
      "stateCode": "DC",
      "state": "District of Columbia",
      "street": "Pennsylvania Ave Nw",
      "layer": "address",
      "formattedAddress": "1600 Pennsylvania Ave Nw, Washington, DC 20500 USA",
      "addressLabel": "1600 Pennsylvania Ave Nw"
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubLocationIQResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.897678, -77.036552]);
  });

  it ("maps street number correctly", function() {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Ave Nw");
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
