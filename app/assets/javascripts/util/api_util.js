ApiUtil = {
  fetchBenches: function(bounds){

    //var bounds = window.GLOBAL_FILTER_PARAMS["bounds"];
    var rooms = window.GLOBAL_FILTER_PARAMS["rooms"];
    var neLat = bounds.getNorthEast().A;
    var neLng = bounds.getNorthEast().F;
    var swLat = bounds.getSouthWest().A;
    var swLng = bounds.getSouthWest().F;
    var SouthWest = bounds.getSouthWest()

    var boundParams = {};
    boundParams["northEast"] = {"lat": neLat, "lng": neLng};
    boundParams["southWest"] = {"lat": swLat, "lng": swLng};

    $.ajax({
      method:"GET",
      url: "api/properties",
      data: {
        bounds: boundParams,
        rooms: rooms
      },
      success: function(properties){
        ApiActions.receiveAll(properties);
      },
      error: function(err){
        console.log(err);
      }
    })
  },
  createBench: function(data) {
    $.ajax({
      method: "POST",
      url: "api/properties",
      data: data,
      success: function(data){
        console.log(data)
      },
      error: function(err){
        console.log(err)
      }
    })
  },

  createPhoto: function(photoUrl){
    debugger
  },

  findById: function(id){
    $.ajax({

      method:"GET",
      url: "api/properties/" + id,
      success: function(property){
        ApiActions.receiveBench(property);
      },
      error: function(err){
        console.log(err);
      }
    })
  },

  filterBenches: function(rooms){
    $.ajax({
      method: "GET",
      url: "api/properties",
      data: {rooms: rooms},
      success: function(properties){
        ApiActions.receiveAll(properties);
      },
      error: function(err){
        console.log(err);
      }
    })
  }
}
