describe("Here Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.HereProvider(new GeocoderJS.ExternalURILoader());
  var geocoded;

  var stubHereResult = [
    {
      "title": "1600 Pennsylvania Ave NW, Washington, DC 20500-0005, United States",
      "id": "here:af:streetsection:7r2QxWJf9A9EhK7TaGTRyA:CggIBCDima62ARABGgQxNjAwKGQ",
      "resultType": "houseNumber",
      "houseNumberType": "PA",
      "address": {
        "label": "1600 Pennsylvania Ave NW, Washington, DC 20500-0005, United States",
        "countryCode": "USA",
        "countryName": "United States",
        "stateCode": "DC",
        "state": "District of Columbia",
        "county": "District of Columbia",
        "city": "Washington",
        "district": "Washington Mall",
        "street": "Pennsylvania Ave NW",
        "postalCode": "20500-0005",
        "houseNumber": "1600"
      },
      "position": {
        "lat": 38.89768,
        "lng": -77.03655
      },
      "access": [
        {
          "lat": 38.89875,
          "lng": -77.03653
        }
      ],
      "mapView": {
        "west": -77.03792,
        "south": 38.89661,
        "east": -77.03518,
        "north": 38.89875
      },
      "scoring": {
        "queryScore": 1.0,
        "fieldScore": {
          "city": 1.0,
          "streets": [
            1.0
          ],
          "houseNumber": 1.0
        }
      }
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubHereResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.89768, -77.03655]);
  });

  it ("maps street number correctly", function() {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Ave NW");
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Washington");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20500-0005");
  });
});
