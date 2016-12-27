(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ASeriesPaper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ASeriesPaper = (function () {
    function ASeriesPaper(options) {
        if (options === void 0) { options = {}; }
        this.float = 0; // amount of the scaleable value of content area
        this.src = [];
        this.tmpArr = [];
        this.finalArr = [];
        this.scale = 0;
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
            this.scale = 0;
            // add the grouped targets into the final array
            this.finalArr.push({
                figures: this.tmpArr,
                ratio: this.scale
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
        this.tmpArr.length && this.finalArr.push({
            figures: this.tmpArr,
            ratio: this.scale
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYVNlcmllc1BhcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQVNlcmllc1BhcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBU2VyaWVzUGFwZXIob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmZsb2F0ID0gMDsgLy8gYW1vdW50IG9mIHRoZSBzY2FsZWFibGUgdmFsdWUgb2YgY29udGVudCBhcmVhXG4gICAgICAgIHRoaXMuc3JjID0gW107XG4gICAgICAgIHRoaXMudG1wQXJyID0gW107XG4gICAgICAgIHRoaXMuZmluYWxBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIC8vIHRhcmdldCBkb20gbmVlZCB0byBhc3NlcnQgdG8gdGhlIGZpbmFsIGRvYywgdGFnIGZpZ3VyZSBhcyB0aGUgZGVmYXVsdCB0YXJnZXRzXG4gICAgICAgIHRoaXMudGFyZ2V0cyA9IChvcHRpb25zLmNvbnRleHQgfHwgJChkb2N1bWVudCkpLmZpbmQob3B0aW9ucy50YXJnZXRzIHx8ICQoJ2ZpZ3VyZScpKTtcbiAgICAgICAgLy8gcGFnZSB0ZW1wbGF0ZXMgZGVmaW5lZCBpbiBvcHRpb25zIG9yIHRoZSBkZWZhdWx0IG9uZVxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fFxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJwYWdlXFxcIj5cXG4gICAgICAgICAgICA8aGVhZGVyPlRSQUlMQkxBWkVSUzwvaGVhZGVyPlxcbiAgICAgICAgICAgIDxtYWluPjwvbWFpbj5cXG4gICAgICAgICAgICA8Zm9vdGVyPlBhZ2UgMSBvZiAxPC9mb290ZXI+XFxuICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgLy8gY29udGFpbmVyIG9mIHRoZSBmaWd1cmVzXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgJy5wYWdlID4gbWFpbic7XG4gICAgICAgIHRoaXMucGFnZUggPSB0aGlzLmdldENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl9IID0gdGhpcy5yZXNldEhlaWdodCgpO1xuICAgIH1cbiAgICBBU2VyaWVzUGFwZXIucHJvdG90eXBlLmdldENvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCh0aGlzLnRlbXBsYXRlKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IE1hdGguZmxvb3IoJCh0aGlzLmNvbnRhaW5lcikuaW5uZXJIZWlnaHQoKSk7XG4gICAgICAgICQodGhpcy5jb250YWluZXIuc3BsaXQoJyAnKVswXSkucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvLyBzZXQgdGhlIGNvbnRhaW5lcl9IIHRvIGl0cyBpbml0aWFsaXplZCB2YWx1ZVxuICAgIEFTZXJpZXNQYXBlci5wcm90b3R5cGUucmVzZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VIICsgdGhpcy5mbG9hdDtcbiAgICB9O1xuICAgIC8vIGtpY2sgc3RhcnQgXG4gICAgQVNlcmllc1BhcGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBpbml0aWFsIHRoZSBzcmMgYXJyYXkgdG8gZ2V0IHRoZSB0YXJnZXRzOntqcXVlcnkgb2JqZWN0fVxuICAgICAgICB2YXIgJHRhcmdzID0gdGhpcy50YXJnZXRzO1xuICAgICAgICB2YXIgc3JjID0gdGhpcy5zcmM7XG4gICAgICAgICQuZWFjaCgkdGFyZ3MsIGZ1bmN0aW9uIChpbmRleCwgZWxlKSB7IHJldHVybiBzcmMucHVzaCgkKGVsZSkpOyB9KTtcbiAgICAgICAgLy8gZG8ganVkZ2VtZW50XG4gICAgICAgIHRoaXMuanVkZ2VFeGlzdCgpO1xuICAgIH07XG4gICAgLy8ganVkZ2UgaWYgdGFyZ2V0IGV4aXN0c1xuICAgIEFTZXJpZXNQYXBlci5wcm90b3R5cGUuanVkZ2VFeGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNyYyA9IHRoaXMuc3JjO1xuICAgICAgICBpZiAoc3JjWzBdKVxuICAgICAgICAgICAgdGhpcy5jb21wYXJlKHRoaXMuY29udGFpbmVyX0gsIHNyY1swXS5pbm5lckhlaWdodCgpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTsgLy8gcmVuZGVyIHRoZSBkb2N1bWVudCBhZnRlciBhbGwgdGhlIGNvbXBhcmF0aW9uIGRvbmVcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNvbXBhcmUgdGhlIGhlaWdodCBvZiBwYWdlIGNvbnRhaW5lciBhbmQgZWFjaCBmaWd1cmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29udGFpbmVyX2hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlndXJlX2hcbiAgICAgKi9cbiAgICBBU2VyaWVzUGFwZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiAoY29udGFpbmVyX2gsIGZpZ3VyZV9oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB1cGRhdGVTcmNMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZpZ3VyZSBpbnRvIHRoZSB0bXAgYXJyYXlcbiAgICAgICAgICAgIF90aGlzLnRtcEFyci5wdXNoKF90aGlzLnNyY1swXSk7XG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGZpZ3VyZSBmcm9tIHRoZSB0YXJnZXQgbGlzdFxuICAgICAgICAgICAgX3RoaXMuc3JjLnNoaWZ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb250YWluZXJfaCA+PSBmaWd1cmVfaCkge1xuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGNvbnRhaW5lcicgaGVpZ2h0IGJ5IG1pbnVzIHRoZSBmaWd1cmUncyBoZWlnaHQgYW5kIHVwZGF0ZSB0aGUgbGlzdFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJfSCAtPSBmaWd1cmVfaDtcbiAgICAgICAgICAgIHVwZGF0ZVNyY0xpc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3JjIGxpc3QgaW4gY2FzZSB0aGF0IHRoZSBzaW5nbGUgZmlndXJlJ3MgaGVpZ2h0IGJleW9uZCB0aGUgY29udGFpbmVyJ3NcbiAgICAgICAgICAgIHRoaXMudG1wQXJyLmxlbmd0aCA9PT0gMCAmJiB1cGRhdGVTcmNMaXN0KCk7XG4gICAgICAgICAgICAvLyBzZXQgdGhlIHNjYWxlIHJhdGlvXG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gMDtcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBlZCB0YXJnZXRzIGludG8gdGhlIGZpbmFsIGFycmF5XG4gICAgICAgICAgICB0aGlzLmZpbmFsQXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGZpZ3VyZXM6IHRoaXMudG1wQXJyLFxuICAgICAgICAgICAgICAgIHJhdGlvOiB0aGlzLnNjYWxlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb250YWluZXIgaGVpZ2h0IGFuZCB0aGUgdG1wQXJyIGZvciBwcmVwYXJpbmcgZm9yIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lcl9IID0gdGhpcy5yZXNldEhlaWdodCgpO1xuICAgICAgICAgICAgdGhpcy50bXBBcnIgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmp1ZGdlRXhpc3QoKTtcbiAgICB9O1xuICAgIC8vIHJlbmRlciB0aGUgZG9jdW1lbnQgdG8gYTQgcGFwZXIgZG9jXG4gICAgQVNlcmllc1BhcGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIGluIGNhc2UgdGhhdCB0bXBBcnIgaXMgbm90IGVtcHR5XG4gICAgICAgIHRoaXMudG1wQXJyLmxlbmd0aCAmJiB0aGlzLmZpbmFsQXJyLnB1c2goe1xuICAgICAgICAgICAgZmlndXJlczogdGhpcy50bXBBcnIsXG4gICAgICAgICAgICByYXRpbzogdGhpcy5zY2FsZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZW1wdHkgYWxsIHRoZSBjb250ZW50XG4gICAgICAgICQoJ2JvZHknKS5lbXB0eSgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbmFsQXJyKTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIHBhZ2UgYWNjb3JkaW5nIHRvIHRoZSBhbW91bnQgb2YgdGhlIGdyb3VwZWQgZmlndXJlc1xuICAgICAgICAkLmVhY2godGhpcy5maW5hbEFyciwgZnVuY3Rpb24gKGluZGV4LCBvYmopIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoX3RoaXMudGVtcGxhdGUpO1xuICAgICAgICAgICAgLy8gd3JhcCBlYWNoIGdyb3VwIHdpdGggdGhlIHNpbmdsZSBwYWdlIHRlbXBsYXRlXG4gICAgICAgICAgICB2YXIgcGFnZSA9ICQoJ2JvZHknKS5maW5kKCQoX3RoaXMuY29udGFpbmVyKS5lcShpbmRleCkpO1xuICAgICAgICAgICAgJC5lYWNoKG9iai5maWd1cmVzLCBmdW5jdGlvbiAob3JkZXIsIGVsZSkge1xuICAgICAgICAgICAgICAgIHBhZ2UuYXBwZW5kKGVsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQVNlcmllc1BhcGVyO1xufSgpKTtcbm1vZHVsZS5leHBvcnRzID0gQVNlcmllc1BhcGVyO1xuIl19
