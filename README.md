# ux-aspects-dashing
Create visual web dashboards using UX Aspects widgets

# Requirements
* Node: v8.10.0+
* Bower: 1.8.0+
* Grunt-cli: 1.2.0+
* Ruby: 2.3.3+

# Setup
* Run `npm install`
* Run `bower install`
* Run `gem install compass` (this is a Ruby command to install the 'compass' package)

# Getting started
* On terminal #1, run `grunt serve`
* On terminal #2, run `node backend/server.js`
* Navigate to http://localhost:9000/ to see all dashboards in all namespaces available

# Creating a dashboard manually
1) Add `app/views/dashboards/<namespace>/<dashboard_name>.html`
    * The contents of this file should represent the dashboard template
2) Add `backend/jobs/<dasboard_name>.job.js`
    * The logic in this file will fetch the data, process it, and send events for widgets to be updated

# Creating a widget manually
1) Add `app/scripts/directives/<widget_name>/<widget_name>.js`
    * This should declare the directive
2) Add `app/scripts/directives/<widget_name>/<widget_name>.html`
    * This should represent the markup associated with the directive
3) Add the reference to the JS file to `app/index.html`
4) (optional) Add `app/styles/widgets/_<widget_name>.scss` and import that file in `app/styles/main.scss`
    * This should contain any CSS rules for your widget, writen in [Sass](https://sass-lang.com/)
5) Reference directive as an attribute in your dashboard template. For instance, if a "widgetName" directive is created, this is the way to import it:
    * ```html
       <li data-row="1" data-col="1" data-sizex="1" data-sizey="1" widget-name="widget_id"></li>
      ```

# Dashboard example
* For reference, you can navigate to http://localhost:9000/#/demo/widgets
* The job fetching the data can be found in `backend/jobs/dummy.job.js` (update interval is 2s)
* The template can be found at `app/views/dashboards/demo/widgets.html`

# Accessing documentation
If you want to view AngularJS-like documentation for the available widgets, run `grunt docs`.
