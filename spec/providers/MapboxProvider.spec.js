describe("Mapbox Provider to Geocoded mapping tests", function() {
  let provider = new GeocoderJS.MapboxProvider(new GeocoderJS.ExternalURILoader());
  let geocoded;

  let stubLocationIQResult = [
    {
      "id": "address.7245011240011860",
      "type": "Feature",
      "place_type": [
        "address"
      ],
      "relevance": 1,
      "properties": {
        "accuracy": "rooftop"
      },
      "text": "Pennsylvania Avenue Northwest",
      "place_name": "1600 Pennsylvania Avenue Northwest, Washington, District of Columbia 20500, United States",
      "matching_place_name": "1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States",
      "center": [
        -77.036547,
        38.897675
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.036547,
          38.897675
        ]
      },
      "address": "1600",
      "context": [
        {
          "id": "neighborhood.291451",
          "text": "Downtown"
        },
        {
          "id": "postcode.7245011240011860",
          "text": "20500"
        },
        {
          "id": "place.7673410831246050",
          "wikidata": "Q61",
          "text": "Washington"
        },
        {
          "id": "region.14064402149979320",
          "wikidata": "Q3551781",
          "short_code": "US-DC",
          "text": "District of Columbia"
        },
        {
          "id": "country.19678805456372290",
          "wikidata": "Q30",
          "short_code": "us",
          "text": "United States"
        }
      ]
    }
  ];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubLocationIQResult[0]);
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.897675, -77.036547]);
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
