// Singleton
var createSingleInstance = function(fn) {
  var instance = null;
  return function() {
    if (!instance) {
      instance = fn.apply(this, arguments);
    }
    return instance;
  }
};

var createModal = function() {
  var modal = docuemnt.createElement('div');
  //...
  modal.style.display = 'none';
  document.getElementById('container').append(modal);
  return modal;
};

var modal = createSingleInstance(createModal);



// Observal
var observal = {
  eventObj: {},
  listen: function(key, fn) {
    this.eventObj[key] = this.eventObj[key] || [];
    this.eventObj[key].push(fn);
  },
  trigger: function(key) {
    var eventList = this.eventObj[key];
    if (!eventList || eventList.length < 1) {
      return;
    }
    var length = eventList.length;
    for (var i = 0; i < length; i++) {
      var event = eventList[i];
      event.apply(this, arguments);
    }
  }
};

observal.listen('command1', function() {
  console.log('1');
});
observal.listen('command1', function() {
  console.log('2');
});
observal.listen('command2', function() {
  console.log('3');
});
observal.listen('command2', function() {
  console.log('4');
});

observal.trigger('command1'); // 1, 2
observal.trigger('command2'); // 3, 4
