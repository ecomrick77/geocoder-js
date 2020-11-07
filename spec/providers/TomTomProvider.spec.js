describe("TomTom Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.TomTomProvider(new GeocoderJS.ExternalURILoader());
  var geocoded;

  var stubTomTomResult = [
    {
      "type": "Point Address",
      "id": "US/PAD/p0/46995",
      "score": 12.0986700058,
      "address": {
        "streetNumber": "1600",
        "streetName": "Pennsylvania Avenue Northwest",
        "municipalitySubdivision": "The Mall",
        "municipality": "Washington",
        "countrySecondarySubdivision": "District of Columbia",
        "countrySubdivision": "DC",
        "countrySubdivisionName": "District of Columbia",
        "postalCode": "20006",
        "countryCode": "US",
        "country": "United States",
        "countryCodeISO3": "USA",
        "freeformAddress": "1600 Pennsylvania Avenue Northwest, Washington, DC 20006",
        "localName": "Washington"
      },
      "position": {
        "lat": 38.8977,
        "lon": -77.03654
      },
      "viewport": {
        "topLeftPoint": {
          "lat": 38.90015,
          "lon": -77.03969
        },
        "btmRightPoint": {
          "lat": 38.89525,
          "lon": -77.03339
        }
      },
      "entryPoints": [
        {
          "type": "main",
          "position": {
            "lat": 38.89877,
            "lon": -77.0366
          }
        },
        {
          "type": "minor",
          "position": {
            "lat": 38.89877,
            "lon": -77.03668
          }
        },
        {
          "type": "minor",
          "position": {
            "lat": 38.89677,
            "lon": -77.03363
          }
        }
      ]
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubTomTomResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.8977, -77.03654]);
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
    expect(geocoded.getZipcode()).toEqual("20006");
  });
});
