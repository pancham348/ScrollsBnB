ApiActions = {
  receiveAll: function(properties) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      properties: properties
    });
  },

  receiveBench: function(property) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      property: property
    });
  }

}
