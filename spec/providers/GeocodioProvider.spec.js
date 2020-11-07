describe("Geocod.io Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.GeocodioProvider(new GeocoderJS.ExternalURILoader());
  var geocoded;

  var stubGeocodioResult = [
    {
      "address_components": {
        "number": "1600",
        "street": "Pennsylvania",
        "suffix": "Ave",
        "postdirectional": "NW",
        "formatted_street": "Pennsylvania Ave NW",
        "city": "Washington",
        "county": "District of Columbia",
        "state": "DC",
        "zip": "20500",
        "country": "US"
      },
      "formatted_address": "1600 Pennsylvania Ave NW, Washington, DC 20500",
      "location": {
        "lat": 38.897675,
        "lng": -77.036547
      },
      "accuracy": 1,
      "accuracy_type": "rooftop",
      "source": "Statewide"
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubGeocodioResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.897675, -77.036547]);
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
    expect(geocoded.getRegion()).toEqual("DC");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20500");
  });
});
