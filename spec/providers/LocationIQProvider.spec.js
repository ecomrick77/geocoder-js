describe("LocationIQ Provider to Geocoded mapping tests", function() {
  let provider = new GeocoderJS.LocationIQProvider(new GeocoderJS.ExternalURILoader());
  let geocoded;

  let stubLocationIQResult = [
    {
      "place_id": "288487333",
      "licence": "https://locationiq.com/attribution",
      "osm_type": "way",
      "osm_id": "238241022",
      "boundingbox": [
        "38.8974907",
        "38.897911",
        "-77.0368537",
        "-77.0362526"
      ],
      "lat": "38.8976998",
      "lon": "-77.03655315",
      "display_name": "White House, 1600, Pennsylvania Avenue Northwest, Golden Triangle, Washington D.C., Washington, Washington, D.C., 20006, USA",
      "class": "historic",
      "type": "castle",
      "importance": 1.05472115416811,
      "icon": "https://locationiq.org/static/images/mapicons/tourist_castle.p.20.png",
      "address": {
        "castle": "White House",
        "house_number": "1600",
        "pedestrian": "Pennsylvania Avenue Northwest",
        "neighbourhood": "Golden Triangle",
        "city": "Washington D.C.",
        "county": "Washington",
        "state": "Washington, D.C.",
        "postcode": "20006",
        "country": "United States of America",
        "country_code": "us"
      }
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubLocationIQResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.8976998, -77.03655315]);
  });

  it ("maps street number correctly", function() {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Washington D.C.");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("Washington, D.C.");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20006");
  });
});
