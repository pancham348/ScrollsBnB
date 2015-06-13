$(function() {
  //React.render(<Search />, document.getElementById('root'));
  var root = document.getElementById('root');
  var RouteHandler = ReactRouter.RouteHandler;
  var Route = ReactRouter.Route;
  var App = React.createClass({
    render: function(){
      return (
        <div id="router">
          <RouteHandler />
        </div>
      );
    }
  });
  var routes = (
    <Route name="app" path="/" handler={App}>
      <ReactRouter.DefaultRoute handler={Search}/>
      <Route name="new" path="/new" handler={BenchForm} />
      <Route name="bench" path="/property/:propertyId" handler={BenchShow} />

    </Route>

  );

  ReactRouter.run(routes, function (Handler) {
      React.render(<Handler/>, root);
    });
})
