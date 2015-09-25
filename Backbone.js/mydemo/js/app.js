(function($) {
  var Brand = Backbone.Model.extend({
    urlRoot: "http://www.brandservice.com/brands", // this is a RESTful service
    defaults: {
      brandSource: "Default_Source"
    },
    initialize: function() {
      console.log("Go Brand!");
      var handleChangeBrandSource = function(model) {
        console.log("brandSource: " + model.get("brandSource"));
      };
      var handleChangeAge = function(model) {
        console.log("age: " + model.get("age"));
      }
      this.on({
        "change:brandSource": handleChangeBrandSource,
        "change:age": handleChangeAge
      });
      // or
      this.on("change:name", function(model) {
        alert("Changed my name to " + model.get("name"));
      });
    }
  });

  var staticBrand = new Brand({
    name: "<Static Brand>",
    age: 100
  });
  staticBrand.set({
    name: "Nokia",
    age: 83
  });
  console.log(staticBrand.toJSON());

  // must use "id":
  // if use "id", the url will be "http://www.brandservice.com/brands/<your_id>"
  // if not use "id", the url is still "http://www.brandservice.com/brands"
  var brand = new Brand({id: "bf3edb3435ff4c9fb5b3c765f9f23269"});
  console.log(brand.toJSON());
  // "fetch" is an async call, which is non-blocking
  brand.fetch({
    success: function(model, response) {
      console.log("Success get ID: " + model.get("_id"));
      console.log(response); // info fetched from server, not include default Brand info like "brandSource"
      console.log(model.toJSON()); // info which response is merged with original Brand model
    },
    error: function(response) {
      console.log("Error!");
      console.log(response);
    }
  });
  console.log("Processing...");

  var Brands = Backbone.Collection.extend({
    model: Brand
  });

  var tmpBrand1 = new Brand({name: "Sony"}),
    tmpBrand2 = new Brand({name: "Apple"});

  var myBrands = new Brands([staticBrand, tmpBrand1]);
  myBrands.add(tmpBrand2);

  var BrandView = Backbone.View.extend({
    tagName: "section", // default is "div", the render result will be included within the specific tagName
    className: "brand",
    template: $("#brand-template").html(),
    /////////////////////////////////////////////////
    // for modelBinder, it can auto bind Model and View
    modelBinder: new Backbone.ModelBinder(),
    bindingCfgs: { // <Model_JSON_key>: <JS_selector>
      name: ".name",
      brandSource: ".brand-source"
    },
    /////////////////////////////////////////////////
    initialize: function() {
      console.log(this.model.toJSON());
    },
    render: function() {
      // this JS template is provided by underscore.js
      var tmpl = _.template(this.template);
      this.$el.html(tmpl(this.model.toJSON())); // you can also append pure HTML string like: this.$el.append("<h5>Hello!</h5>");
      this.modelBinder.bind(this.model, this.el, this.bindingCfgs);
      return this;
    },
    // Events triggers are declared as keys on the events object, formatted as "<event_type>: <selector>"
    // if use modelBinder, first execute function defined in "events", then model is updated
    events: {
      "click input[type='button']": "onUpdate",
      "change input[type='text']": "onUpdate"
    },
    onUpdate: function(evt) {
      console.log(evt);
      // define model key names in HTML page, then this function auto updates current model!
      var currKey = $(evt.currentTarget).data("key");
      if(!currKey) {
        return;
      }
      var currVal = $(evt.currentTarget).val();
      var attrPair = {};
      attrPair[currKey] = currVal;
      this.model.set(attrPair);
      // this.model.save(); // async call, non blocking
      this.render(); // re-render the template to display updated model
    }
  });

  var BrandsView = Backbone.View.extend({
    el: "#brands-view",
    initialize: function(brands) {
      // feel free to define "this.xxx" and use them within this View
      this.collection = brands;
      // "this.$el" is a jQuery object, feel free to use jQuery functions like "html", "append", "insertAfter"
      this.brandsField = this.$el.find("#all-brands");
      this.render();
    },
    render: function() {
      var that = this;
      _.each(this.collection.models, function(item) {
        that.renderBrand(item);
      }, this);
    },
    // following are user defined functions
    renderBrand: function(item) {
      var brandView = new BrandView({
        model: item
      });
      this.brandsField.append(brandView.render().el);
    }
  });

  var brandsView = new BrandsView(myBrands);
})(jQuery);
