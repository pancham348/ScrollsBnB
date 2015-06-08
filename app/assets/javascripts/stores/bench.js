(function(){
  var _benches = [];
  var _bench;

  var resetBenches = function(benches) {
		//if (benches) {
			_benches = benches;
			//}
    
  }
  //
  var setBench = function(bench){
    var oldBench = BenchStore.find(bench.id);
    if(typeof oldBench !== 'undefined'){
      $.extend(oldBench, bench);
    } else {
      _benches.push(bench);
    }
  }

  var CHANGE_EVENT = "change"
  window.BenchStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _benches
    },
    find: function(id){
      var foundBench;
      _benches.forEach(function(bench){
        if(bench.id === id){
          foundBench = bench;
        }
      })
      return foundBench;
    },
    // getBench: function(){
    //   return _bench;
    // },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      if(payload.actionType === BenchConstants.BENCHES_RECEIVED) {
        resetBenches(payload.properties);
        BenchStore.emit(CHANGE_EVENT);
      }else if (payload.actionType === BenchConstants.BENCH_RECEIVED) {
        setBench(payload.property);
        BenchStore.emit(CHANGE_EVENT);
      }
    })
  })
})()
