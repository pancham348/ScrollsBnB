var BenchForm = React.createClass({
  mixins: [ReactRouter.Navigation],

  submitForm: function(e){
    e.preventDefault()
    var formData = $('#bench-form').serializeArray();
    var dataToSubmit = {
      "lat":formData[0].value,
      "lng":formData[1].value,
      "description":formData[2].value
    }
    ApiUtil.createBench(dataToSubmit)
    this.transitionTo('/');
  },
  render: function(){
    var url = window.location.href
    var queryString = url.substring( url.indexOf('?') + 1 );
    var queryStrings = queryString.split('&')
    var latString = parseFloat(queryStrings[0].substring(queryStrings[0].indexOf('latitude=') + 9));
    var lngString = parseFloat(queryStrings[1].substring(queryStrings[1].indexOf('longitude=') + 10));

    return(
      <form action="api/benches" id="bench-form" method="POST" onSubmit={this.submitForm}>
        <label htmlFor="bench[lat]">Latitude: </label>
        <input type="text" name="bench[lat]" value={latString}></input>

        <label htmlFor="bench[lng]">Longitude: </label>
        <input type="text" name="bench[lng]" value={lngString}></input>

        <label htmlFor="bench[description]">Description: </label>
        <input type="text" name="bench[description]"></input>

        <input type="submit" value="SUBMIT" />
    </form>
    )
  }
});
