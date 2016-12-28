(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ASeriesPaper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ASeriesPaper = (function () {
    // Todo: scale value may set according to this.float value in each page for adjusting the layout
    // simply set this value to 0 as the float value now
    function ASeriesPaper(options) {
        if (options === void 0) { options = {}; }
        this.float = 0; // amount of the scaleable value of content area
        this.src = [];
        this.tmpArr = [];
        this.finalArr = [];
        // target dom need to assert to the final doc, tag figure as the default targets
        this.targets = (options.context || $(document)).find(options.targets || $('figure'));
        // page templates defined in options or the default one
        this.template = options.template ||
            "<div class=\"page\">\n            <header>TRAILBLAZERS</header>\n            <main></main>\n            <footer>Page 1 of 1</footer>\n        </div>";
        // container of the figures
        this.container = options.container || '.page > main';
        this.pageH = this.getContainer();
        this.container_H = this.resetHeight();
    }
    ASeriesPaper.prototype.getContainer = function () {
        $('body').append(this.template);
        var result = Math.floor($(this.container).innerHeight());
        $(this.container.split(' ')[0]).remove();
        return result;
    };
    // set the container_H to its initialized value
    ASeriesPaper.prototype.resetHeight = function () {
        return this.pageH + this.float;
    };
    // kick start 
    ASeriesPaper.prototype.init = function () {
        // initial the src array to get the targets:{jquery object}
        var $targs = this.targets;
        var src = this.src;
        $.each($targs, function (index, ele) { return src.push($(ele)); });
        // do judgement
        this.judgeExist();
    };
    // judge if target exists
    ASeriesPaper.prototype.judgeExist = function () {
        var src = this.src;
        if (src[0])
            this.compare(this.container_H, src[0].innerHeight());
        else
            this.render(); // render the document after all the comparation done
    };
    /**
     * compare the height of page container and each figure
     * @param {number} container_h
     * @param {number} figure_h
     */
    ASeriesPaper.prototype.compare = function (container_h, figure_h) {
        var _this = this;
        var updateSrcList = function () {
            // store the figure into the tmp array
            _this.tmpArr.push(_this.src[0]);
            // remove the figure from the target list
            _this.src.shift();
        };
        if (container_h >= figure_h) {
            // reset the container' height by minus the figure's height and update the list
            this.container_H -= figure_h;
            updateSrcList();
        }
        else {
            // update the src list in case that the single figure's height beyond the container's
            this.tmpArr.length === 0 && updateSrcList();
            // set the scale ratio
            var scale = 0;
            // add the grouped targets into the final array
            this.finalArr.push({
                figures: this.tmpArr,
                ratio: scale
            });
            // reset the container height and the tmpArr for preparing for next iteration
            this.container_H = this.resetHeight();
            this.tmpArr = [];
        }
        this.judgeExist();
    };
    // render the document to a4 paper doc
    ASeriesPaper.prototype.render = function () {
        var _this = this;
        // in case that tmpArr is not empty
        var scale = 0;
        this.tmpArr.length && this.finalArr.push({
            figures: this.tmpArr,
            ratio: scale
        });
        // empty all the content
        $('body').empty();
        console.log(this.finalArr);
        // generate the page according to the amount of the grouped figures
        $.each(this.finalArr, function (index, obj) {
            $('body').append(_this.template);
            // wrap each group with the single page template
            var page = $('body').find($(_this.container).eq(index));
            $.each(obj.figures, function (order, ele) {
                page.append(ele);
            });
        });
    };
    return ASeriesPaper;
}());
module.exports = ASeriesPaper;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYVNlcmllc1BhcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEFTZXJpZXNQYXBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gVG9kbzogc2NhbGUgdmFsdWUgbWF5IHNldCBhY2NvcmRpbmcgdG8gdGhpcy5mbG9hdCB2YWx1ZSBpbiBlYWNoIHBhZ2UgZm9yIGFkanVzdGluZyB0aGUgbGF5b3V0XG4gICAgLy8gc2ltcGx5IHNldCB0aGlzIHZhbHVlIHRvIDAgYXMgdGhlIGZsb2F0IHZhbHVlIG5vd1xuICAgIGZ1bmN0aW9uIEFTZXJpZXNQYXBlcihvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRoaXMuZmxvYXQgPSAwOyAvLyBhbW91bnQgb2YgdGhlIHNjYWxlYWJsZSB2YWx1ZSBvZiBjb250ZW50IGFyZWFcbiAgICAgICAgdGhpcy5zcmMgPSBbXTtcbiAgICAgICAgdGhpcy50bXBBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5maW5hbEFyciA9IFtdO1xuICAgICAgICAvLyB0YXJnZXQgZG9tIG5lZWQgdG8gYXNzZXJ0IHRvIHRoZSBmaW5hbCBkb2MsIHRhZyBmaWd1cmUgYXMgdGhlIGRlZmF1bHQgdGFyZ2V0c1xuICAgICAgICB0aGlzLnRhcmdldHMgPSAob3B0aW9ucy5jb250ZXh0IHx8ICQoZG9jdW1lbnQpKS5maW5kKG9wdGlvbnMudGFyZ2V0cyB8fCAkKCdmaWd1cmUnKSk7XG4gICAgICAgIC8vIHBhZ2UgdGVtcGxhdGVzIGRlZmluZWQgaW4gb3B0aW9ucyBvciB0aGUgZGVmYXVsdCBvbmVcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHxcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwicGFnZVxcXCI+XFxuICAgICAgICAgICAgPGhlYWRlcj5UUkFJTEJMQVpFUlM8L2hlYWRlcj5cXG4gICAgICAgICAgICA8bWFpbj48L21haW4+XFxuICAgICAgICAgICAgPGZvb3Rlcj5QYWdlIDEgb2YgMTwvZm9vdGVyPlxcbiAgICAgICAgPC9kaXY+XCI7XG4gICAgICAgIC8vIGNvbnRhaW5lciBvZiB0aGUgZmlndXJlc1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8ICcucGFnZSA+IG1haW4nO1xuICAgICAgICB0aGlzLnBhZ2VIID0gdGhpcy5nZXRDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJfSCA9IHRoaXMucmVzZXRIZWlnaHQoKTtcbiAgICB9XG4gICAgQVNlcmllc1BhcGVyLnByb3RvdHlwZS5nZXRDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQodGhpcy50ZW1wbGF0ZSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBNYXRoLmZsb29yKCQodGhpcy5jb250YWluZXIpLmlubmVySGVpZ2h0KCkpO1xuICAgICAgICAkKHRoaXMuY29udGFpbmVyLnNwbGl0KCcgJylbMF0pLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLy8gc2V0IHRoZSBjb250YWluZXJfSCB0byBpdHMgaW5pdGlhbGl6ZWQgdmFsdWVcbiAgICBBU2VyaWVzUGFwZXIucHJvdG90eXBlLnJlc2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlSCArIHRoaXMuZmxvYXQ7XG4gICAgfTtcbiAgICAvLyBraWNrIHN0YXJ0IFxuICAgIEFTZXJpZXNQYXBlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaW5pdGlhbCB0aGUgc3JjIGFycmF5IHRvIGdldCB0aGUgdGFyZ2V0czp7anF1ZXJ5IG9iamVjdH1cbiAgICAgICAgdmFyICR0YXJncyA9IHRoaXMudGFyZ2V0cztcbiAgICAgICAgdmFyIHNyYyA9IHRoaXMuc3JjO1xuICAgICAgICAkLmVhY2goJHRhcmdzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZSkgeyByZXR1cm4gc3JjLnB1c2goJChlbGUpKTsgfSk7XG4gICAgICAgIC8vIGRvIGp1ZGdlbWVudFxuICAgICAgICB0aGlzLmp1ZGdlRXhpc3QoKTtcbiAgICB9O1xuICAgIC8vIGp1ZGdlIGlmIHRhcmdldCBleGlzdHNcbiAgICBBU2VyaWVzUGFwZXIucHJvdG90eXBlLmp1ZGdlRXhpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzcmMgPSB0aGlzLnNyYztcbiAgICAgICAgaWYgKHNyY1swXSlcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZSh0aGlzLmNvbnRhaW5lcl9ILCBzcmNbMF0uaW5uZXJIZWlnaHQoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7IC8vIHJlbmRlciB0aGUgZG9jdW1lbnQgYWZ0ZXIgYWxsIHRoZSBjb21wYXJhdGlvbiBkb25lXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBjb21wYXJlIHRoZSBoZWlnaHQgb2YgcGFnZSBjb250YWluZXIgYW5kIGVhY2ggZmlndXJlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbnRhaW5lcl9oXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpZ3VyZV9oXG4gICAgICovXG4gICAgQVNlcmllc1BhcGVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKGNvbnRhaW5lcl9oLCBmaWd1cmVfaCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdXBkYXRlU3JjTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmaWd1cmUgaW50byB0aGUgdG1wIGFycmF5XG4gICAgICAgICAgICBfdGhpcy50bXBBcnIucHVzaChfdGhpcy5zcmNbMF0pO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBmaWd1cmUgZnJvbSB0aGUgdGFyZ2V0IGxpc3RcbiAgICAgICAgICAgIF90aGlzLnNyYy5zaGlmdCgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY29udGFpbmVyX2ggPj0gZmlndXJlX2gpIHtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb250YWluZXInIGhlaWdodCBieSBtaW51cyB0aGUgZmlndXJlJ3MgaGVpZ2h0IGFuZCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyX0ggLT0gZmlndXJlX2g7XG4gICAgICAgICAgICB1cGRhdGVTcmNMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNyYyBsaXN0IGluIGNhc2UgdGhhdCB0aGUgc2luZ2xlIGZpZ3VyZSdzIGhlaWdodCBiZXlvbmQgdGhlIGNvbnRhaW5lcidzXG4gICAgICAgICAgICB0aGlzLnRtcEFyci5sZW5ndGggPT09IDAgJiYgdXBkYXRlU3JjTGlzdCgpO1xuICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSByYXRpb1xuICAgICAgICAgICAgdmFyIHNjYWxlID0gMDtcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBlZCB0YXJnZXRzIGludG8gdGhlIGZpbmFsIGFycmF5XG4gICAgICAgICAgICB0aGlzLmZpbmFsQXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGZpZ3VyZXM6IHRoaXMudG1wQXJyLFxuICAgICAgICAgICAgICAgIHJhdGlvOiBzY2FsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyByZXNldCB0aGUgY29udGFpbmVyIGhlaWdodCBhbmQgdGhlIHRtcEFyciBmb3IgcHJlcGFyaW5nIGZvciBuZXh0IGl0ZXJhdGlvblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJfSCA9IHRoaXMucmVzZXRIZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMudG1wQXJyID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5qdWRnZUV4aXN0KCk7XG4gICAgfTtcbiAgICAvLyByZW5kZXIgdGhlIGRvY3VtZW50IHRvIGE0IHBhcGVyIGRvY1xuICAgIEFTZXJpZXNQYXBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBpbiBjYXNlIHRoYXQgdG1wQXJyIGlzIG5vdCBlbXB0eVxuICAgICAgICB2YXIgc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLnRtcEFyci5sZW5ndGggJiYgdGhpcy5maW5hbEFyci5wdXNoKHtcbiAgICAgICAgICAgIGZpZ3VyZXM6IHRoaXMudG1wQXJyLFxuICAgICAgICAgICAgcmF0aW86IHNjYWxlXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBlbXB0eSBhbGwgdGhlIGNvbnRlbnRcbiAgICAgICAgJCgnYm9keScpLmVtcHR5KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmluYWxBcnIpO1xuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgcGFnZSBhY2NvcmRpbmcgdG8gdGhlIGFtb3VudCBvZiB0aGUgZ3JvdXBlZCBmaWd1cmVzXG4gICAgICAgICQuZWFjaCh0aGlzLmZpbmFsQXJyLCBmdW5jdGlvbiAoaW5kZXgsIG9iaikge1xuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChfdGhpcy50ZW1wbGF0ZSk7XG4gICAgICAgICAgICAvLyB3cmFwIGVhY2ggZ3JvdXAgd2l0aCB0aGUgc2luZ2xlIHBhZ2UgdGVtcGxhdGVcbiAgICAgICAgICAgIHZhciBwYWdlID0gJCgnYm9keScpLmZpbmQoJChfdGhpcy5jb250YWluZXIpLmVxKGluZGV4KSk7XG4gICAgICAgICAgICAkLmVhY2gob2JqLmZpZ3VyZXMsIGZ1bmN0aW9uIChvcmRlciwgZWxlKSB7XG4gICAgICAgICAgICAgICAgcGFnZS5hcHBlbmQoZWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBU2VyaWVzUGFwZXI7XG59KCkpO1xubW9kdWxlLmV4cG9ydHMgPSBBU2VyaWVzUGFwZXI7XG4iXX0=
