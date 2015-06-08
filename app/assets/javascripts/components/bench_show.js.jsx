var BenchShow = React.createClass({
  contextTypes: {
   router: React.PropTypes.func
  },
  getInitialState: function(){
    return {bench: undefined};
  },
  updateBench: function(){
    this.setState({bench: BenchStore.find(this.benchId)})
  },
  componentWillMount: function() {
    this.benchId = parseInt(this.context.router.getCurrentParams().benchId);

    BenchStore.addChangeListener(this.updateBench);
    ApiUtil.findById(this.benchId);
  },
  componentWillUnmount: function() {
    BenchStore.removeChangeListener(this.updateBench);
  },
  render: function() {
    var mapOptions, description = "unknown bench";
    var seats = 0;
    var photoUrl = " ";
    if (typeof this.state.bench !== 'undefined') {
      description = this.state.bench.description;
      seats = this.state.bench.seats;
      photoUrl = this.state.bench.photos[0].url
      mapOptions = {
          // center: {lat: 37.7758, lng: -122.435},
          center: {lat: this.state.bench.lat, lng: this.state.bench.lng},
          zoom: 13
        };
    }else{
      mapOptions = {
          center: {lat: 37.7758, lng: -122.435},
          //center: {lat: this.state.bench.lat, lng: this.state.bench.lng},
          zoom: 13
        };
    }

    return(
      <div>
        <a href="/">Home</a>
        <br />
        <img src={photoUrl} />
        // <form onSubmit={this.addPhoto}>
        //   <input type="text" name="photo[url]" />
        //   <input type='submit' value="Add photo" />
        // </form>
        <span>{description}({seats})</span>
        <Map single={true} bench={this.state.bench} />
      </div>

    )

  }
})
