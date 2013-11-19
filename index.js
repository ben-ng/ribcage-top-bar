var Base = require('ribcage-view')
  , Button = require('ribcage-button')
  , Menu = require('ribcage-menu')

var TopBar = Base.extend({

  template: function () {
    return ''+
      '<div class="left-button-target"></div>'+
      '<div class="title hidden"></div>'+
      '<div class="menu-target"></div>'+
      '<div class="right button-target"></div>'
  }

, className: 'top-bar'

, afterRender: function () {

    var opts = this.options

    if (opts.left) this.setLeftButton(opts.left)
    if (opts.title) this.setTitle(opts.title)
    if (opts.menu) this.setMenu(opts.menu)
    if (opts.right) this.setRightButton(opts.right)

  }

, getButton: function (opts) {

    // someone may have passed in an already built button
    // if so, just append it now
    if (typeof opts.render == 'function') {
      return opts
    }

    var self = this
      , button = new Button(opts);

    return button;
  }

, setLeftButton: function (btn) {

    if (this.leftButton) this.leftButton.close()

    this.leftButton = this.getButton(btn)
    this.leftButton.$el.addClass('left')
    this.appendSubview(this.leftButton, this.$('.left-button-target'))

  }

, setRightButton: function (btn) {

    if (this.rightButton) this.rightButton.close()

    this.rightButton = this.getButton(btn)
    this.rightButton.$el.addClass('right')
    this.appendSubview(this.rightButton, this.$('.right-button-target'))

  }

, setMenu: function (opts) {

    if (this.menu) this.menu.close()

    this.menu = new Menu(opts)
    this.appendSubview(this.menu, this.$('.menu-target'))

  }

, setTitle: function (title) {
    this.$('.title').html(title)
  }

, activateMenuItem: function (label) {
    this.menu.eachSubview(function (view) {
      if (view.label == label) view.$el.addClass('active')
    })
  }

})

module.exports = TopBar

window.TopBar = TopBar
