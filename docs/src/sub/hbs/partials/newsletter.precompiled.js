(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newsletter'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section class=\"newsletter\">\n    <div class=\"form\">\n        <h2 style=\"padding: 10px;\" class=\"subtitle has-text-weight-bold has-background-success-light\">\n            Sign-up for the newsletter\n        </h2>\n        <div class=\"control has-icons-left\">\n            <input\n                type=\"text\"\n                class=\"input is-medium\"\n                placeholder=\"your@email.com\"\n            />\n            <span class=\"icon is-left\">\n                <i class=\"fas fa-envelope\"></i>\n            </span>\n            <button type=\"submit\" class=\"button is-info mt-3\">Sign-Up</button>\n        </div>\n    </div>\n    <hr>\n</section>";
},"useData":true});
})();