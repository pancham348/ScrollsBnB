var Search = React.createClass({
  render: function(){

    return (
      <div id="search">
        <Map />
				<div id="right">
					<BenchFilter />
	        <Index />
				</div>
      </div>
    )
  }
})
