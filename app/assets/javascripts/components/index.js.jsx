var Index = React.createClass({
  getInitialState: function(){
    return {benches: BenchStore.all()}
  },

  updateBenches: function(){
    this.setState({benches: BenchStore.all()})
  },
  componentDidMount: function(){
    BenchStore.addChangeListener(this.updateBenches);
  },
  componentWillUnmount: function() {
    BenchStore.removeChangeListener(this.updateBenches);
  },

  render: function(){


    return(
      <ul id="benchList">
      {this.state.benches.map(function(bench){
          var photo = 'assets/house.jpg';
        if (bench.photos && bench.photos.length > 0) {
          photo = bench.photos[0].url
        }
        return(
          <li key={bench.id} className="bench">
              <a href={"#property/" + bench.id}>
                {bench.description}({bench.rooms})
                <img id="prop-photo" src={photo} />
              </a>
          </li>
        )
      })}
      </ul>
    )
  }
})
