var BenchFilter = React.createClass({
  getInitialState: function() {
    return {
			rooms: 3,
			start_date: moment(),
			      end_date: moment(),
			      new_date: null,
			      bound_date: null,
			      example5Selected: null,
			      example6Selected: null
		}
  },
	
	handleStartDateChange: function(date) {
	    this.setState({
	      start_date: date
	    });
	  },

	  handleEndDateChange: function(date) {
	    this.setState({
	      end_date: date
	    });
	  },

	  handleNewDateChange: function(date) {
	    this.setState({
	      new_date: date
	    });
	  },

	  handleBoundDateChange: function(date) {
	    this.setState({
	      bound_date: date
	    });
	  },

	  handleExample5Change: function(date) {
	    this.setState({
	      example5Selected: date
	    });
	  },

	   handleExample6Change: function(date) {
	    this.setState({
	      example6Selected: date
	    });
	  },

	  updateVal: function(){
	    var slider = React.findDOMNode(this.refs["bench-slider"]);
	    window.GLOBAL_FILTER_PARAMS["rooms"] = slider.value;
	    ApiUtil.fetchBenches();

	    this.setState({rooms: slider.value})
	  },

  render: function(){
    return(
      <div id="slider">
				<div className="dates">
					<DatePicker 
	        key="example1"
					selected={this.state.start_date}
				  onChange={this.handleStartDateChange} />
			
					<DatePicker 
	        key="example2"
					selected={this.state.end_date}
				  onChange={this.handleEndDateChange} />
				</div><br />
       {this.state.rooms} <input  onChange={this.updateVal} ref="bench-slider" type="range" default min="1" max="10" step="1" />
      </div>
    )
  }
})
