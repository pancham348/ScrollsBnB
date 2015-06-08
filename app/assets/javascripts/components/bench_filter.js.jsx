var BenchFilter = React.createClass({
  getInitialState: function() {
    return {seats: 5}
  },
  updateVal: function(){
    var slider = React.findDOMNode(this.refs["bench-slider"]);
    window.GLOBAL_FILTER_PARAMS["seats"] = slider.value;
    ApiUtil.fetchBenches();

    this.setState({seats: slider.value})
  },

  render: function(){
    return(
      <div>
        {this.state.seats}
        <input onChange={this.updateVal} ref="bench-slider" type="range" default min="1" max="10" step="1"/>
      </div>
    )
  }
})
