var Map = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function(){
    return {
      bench: undefined,
      benches: BenchStore.all()
    }
  },
  render: function(){
    return(

        <div ref="google-map" id="map" />

    )
  },
  addSingleMarker: function(bench){
    var benchPos = new google.maps.LatLng(bench.lat, bench.lng);
    this.marker = new google.maps.Marker({
      position: benchPos,
      map: this.map,
      title: 'THIS IS MAP',
			icon: "assets/skyrim-icon.png"
    })

    google.maps.event.addListener(this.marker, 'click', function() {
      that.transitionTo('/bench/' + bench.id)
    })
    this.map.setCenter(this.marker.getPosition());
  },

  addMarkers: function() {
    this.setState({benches: BenchStore.all()})
    var benches = BenchStore.all();
    var that = this;
    var currentBenches = {};

    benches.forEach(function(bench){
      var benchPos = new google.maps.LatLng(bench.lat, bench.lng);
      currentBenches[bench.id] = true;
      if (!that.currentMarkers[bench.id] && bench.rooms >= window.GLOBAL_FILTER_PARAMS["rooms"]) {
        var marker = new google.maps.Marker({
          position: benchPos,
          map: that.map,
          title: 'THIS IS MAP',
          benchID: bench.id,
					icon: "assets/skyrim-icon.png"
        })
				
        google.maps.event.addListener(marker, 'click', function() {
          that.transitionTo('/property/' + bench.id)
        })

        that.currentMarkers[bench.id] = marker;
      }
			
    })
		
    for(var key in this.currentMarkers) {
      if (!currentBenches[key]) {
        this.currentMarkers[key].setMap(null);
        delete this.currentMarkers[key]
      }
    }

  },

  removeAllMarkers: function(){
    for(var key in this.currentMarkers) {
        this.currentMarkers[key].setMap(null);
        delete this.currentMarkers[key]
    }
  },

  boundsChanged: function() {
    var bounds = this.map.getBounds()
    window.GLOBAL_FILTER_PARAMS["bounds"] = bounds
    ApiUtil.fetchBenches(bounds);
  },
  handleClick: function(e) {
   this.transitionTo('/new?latitude='+e.latLng.A + "&longitude=" + e.latLng.F)
  },
  componentWillMount: function(){
    this.currentMarkers = {};
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({bench: nextProps.bench})
    this.addSingleMarker(nextProps.bench);
  },
  componentDidMount: function(){
    this.mapDiv = React.findDOMNode(this.refs["google-map"]);
		var that = this;
		var map;
		this.mapBounds = new google.maps.LatLngBounds(
		    new google.maps.LatLng(62.999708, -25.000000),
		    new google.maps.LatLng(67.000000, -12.999253));
		var mapMinZoom = 4;
		var mapMaxZoom = 8;
		var maptiler = new google.maps.ImageMapType({
		    getTileUrl: function(coord, zoom) { 
		        var proj = that.map.getProjection();
		        var z2 = Math.pow(2, zoom);
		        var tileXSize = 256 / z2;
		        var tileYSize = 256 / z2;
		        var tileBounds = new google.maps.LatLngBounds(
		            proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
		            proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
		        );
		        var y = coord.y;
		        var x = coord.x >= 0 ? coord.x : z2 + coord.x
		        if (that.mapBounds.intersects(tileBounds) && (mapMinZoom <= zoom) && (zoom <= mapMaxZoom))
		            return "assets/newmap/" + zoom + "/" + x + "/" + y + ".png";
		        else
		            return "http://www.maptiler.org/img/none.png";
		    },
		    tileSize: new google.maps.Size(256, 256),
		    isPng: true,

		    opacity: 1.0
		});
		//function init() {
		    var opts = {
		        streetViewControl: false,
		        center: new google.maps.LatLng(64.999854, -18.999626),
					zoom: 7
		    };
			this.map = new google.maps.Map(document.getElementById("map"), opts);
			this.map.setMapTypeId('satellite');
			this.map.overlayMapTypes.insertAt(0, maptiler);
			//}

    google.maps.event.addListener(this.map, 'idle', this.boundsChanged);
    google.maps.event.addListener(this.map, 'click', this.handleClick)
		
		//init()
    this.addMarkers();
    BenchStore.addChangeListener(this.addMarkers);
	}
})
