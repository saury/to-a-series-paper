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
        // options which can be overload
        var _a = options, 
        /* default options: */
        // target dom need to assert to the final doc, tag figure as the default targets
        _b = _a.targets, 
        /* default options: */
        // target dom need to assert to the final doc, tag figure as the default targets
        targets = _b === void 0 ? $('figure') : _b, _c = _a.context, context = _c === void 0 ? $(document) : _c, 
        // page templates defined in options or the default one
        _d = _a.template, 
        // page templates defined in options or the default one
        template = _d === void 0 ? "<div class=\"page\">\n                            <header>TRAILBLAZERS</header>\n                            <main></main>\n                            <footer>Page 1 of 1</footer>\n                        </div>" : _d, 
        // container of the figures
        _e = _a.container, 
        // container of the figures
        container = _e === void 0 ? '.page > main' : _e;
        // overload
        this.targets = context.find(targets);
        this.template = template;
        this.container = container;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYVNlcmllc1BhcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQVNlcmllc1BhcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUb2RvOiBzY2FsZSB2YWx1ZSBtYXkgc2V0IGFjY29yZGluZyB0byB0aGlzLmZsb2F0IHZhbHVlIGluIGVhY2ggcGFnZSBmb3IgYWRqdXN0aW5nIHRoZSBsYXlvdXRcbiAgICAvLyBzaW1wbHkgc2V0IHRoaXMgdmFsdWUgdG8gMCBhcyB0aGUgZmxvYXQgdmFsdWUgbm93XG4gICAgZnVuY3Rpb24gQVNlcmllc1BhcGVyKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy5mbG9hdCA9IDA7IC8vIGFtb3VudCBvZiB0aGUgc2NhbGVhYmxlIHZhbHVlIG9mIGNvbnRlbnQgYXJlYVxuICAgICAgICB0aGlzLnNyYyA9IFtdO1xuICAgICAgICB0aGlzLnRtcEFyciA9IFtdO1xuICAgICAgICB0aGlzLmZpbmFsQXJyID0gW107XG4gICAgICAgIC8vIG9wdGlvbnMgd2hpY2ggY2FuIGJlIG92ZXJsb2FkXG4gICAgICAgIHZhciBfYSA9IG9wdGlvbnMsIFxuICAgICAgICAvKiBkZWZhdWx0IG9wdGlvbnM6ICovXG4gICAgICAgIC8vIHRhcmdldCBkb20gbmVlZCB0byBhc3NlcnQgdG8gdGhlIGZpbmFsIGRvYywgdGFnIGZpZ3VyZSBhcyB0aGUgZGVmYXVsdCB0YXJnZXRzXG4gICAgICAgIF9iID0gX2EudGFyZ2V0cywgXG4gICAgICAgIC8qIGRlZmF1bHQgb3B0aW9uczogKi9cbiAgICAgICAgLy8gdGFyZ2V0IGRvbSBuZWVkIHRvIGFzc2VydCB0byB0aGUgZmluYWwgZG9jLCB0YWcgZmlndXJlIGFzIHRoZSBkZWZhdWx0IHRhcmdldHNcbiAgICAgICAgdGFyZ2V0cyA9IF9iID09PSB2b2lkIDAgPyAkKCdmaWd1cmUnKSA6IF9iLCBfYyA9IF9hLmNvbnRleHQsIGNvbnRleHQgPSBfYyA9PT0gdm9pZCAwID8gJChkb2N1bWVudCkgOiBfYywgXG4gICAgICAgIC8vIHBhZ2UgdGVtcGxhdGVzIGRlZmluZWQgaW4gb3B0aW9ucyBvciB0aGUgZGVmYXVsdCBvbmVcbiAgICAgICAgX2QgPSBfYS50ZW1wbGF0ZSwgXG4gICAgICAgIC8vIHBhZ2UgdGVtcGxhdGVzIGRlZmluZWQgaW4gb3B0aW9ucyBvciB0aGUgZGVmYXVsdCBvbmVcbiAgICAgICAgdGVtcGxhdGUgPSBfZCA9PT0gdm9pZCAwID8gXCI8ZGl2IGNsYXNzPVxcXCJwYWdlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhlYWRlcj5UUkFJTEJMQVpFUlM8L2hlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1haW4+PC9tYWluPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9vdGVyPlBhZ2UgMSBvZiAxPC9mb290ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIgOiBfZCwgXG4gICAgICAgIC8vIGNvbnRhaW5lciBvZiB0aGUgZmlndXJlc1xuICAgICAgICBfZSA9IF9hLmNvbnRhaW5lciwgXG4gICAgICAgIC8vIGNvbnRhaW5lciBvZiB0aGUgZmlndXJlc1xuICAgICAgICBjb250YWluZXIgPSBfZSA9PT0gdm9pZCAwID8gJy5wYWdlID4gbWFpbicgOiBfZTtcbiAgICAgICAgLy8gb3ZlcmxvYWRcbiAgICAgICAgdGhpcy50YXJnZXRzID0gY29udGV4dC5maW5kKHRhcmdldHMpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnBhZ2VIID0gdGhpcy5nZXRDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJfSCA9IHRoaXMucmVzZXRIZWlnaHQoKTtcbiAgICB9XG4gICAgQVNlcmllc1BhcGVyLnByb3RvdHlwZS5nZXRDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQodGhpcy50ZW1wbGF0ZSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBNYXRoLmZsb29yKCQodGhpcy5jb250YWluZXIpLmlubmVySGVpZ2h0KCkpO1xuICAgICAgICAkKHRoaXMuY29udGFpbmVyLnNwbGl0KCcgJylbMF0pLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLy8gc2V0IHRoZSBjb250YWluZXJfSCB0byBpdHMgaW5pdGlhbGl6ZWQgdmFsdWVcbiAgICBBU2VyaWVzUGFwZXIucHJvdG90eXBlLnJlc2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlSCArIHRoaXMuZmxvYXQ7XG4gICAgfTtcbiAgICAvLyBraWNrIHN0YXJ0IFxuICAgIEFTZXJpZXNQYXBlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaW5pdGlhbCB0aGUgc3JjIGFycmF5IHRvIGdldCB0aGUgdGFyZ2V0czp7anF1ZXJ5IG9iamVjdH1cbiAgICAgICAgdmFyICR0YXJncyA9IHRoaXMudGFyZ2V0cztcbiAgICAgICAgdmFyIHNyYyA9IHRoaXMuc3JjO1xuICAgICAgICAkLmVhY2goJHRhcmdzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZSkgeyByZXR1cm4gc3JjLnB1c2goJChlbGUpKTsgfSk7XG4gICAgICAgIC8vIGRvIGp1ZGdlbWVudFxuICAgICAgICB0aGlzLmp1ZGdlRXhpc3QoKTtcbiAgICB9O1xuICAgIC8vIGp1ZGdlIGlmIHRhcmdldCBleGlzdHNcbiAgICBBU2VyaWVzUGFwZXIucHJvdG90eXBlLmp1ZGdlRXhpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzcmMgPSB0aGlzLnNyYztcbiAgICAgICAgaWYgKHNyY1swXSlcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZSh0aGlzLmNvbnRhaW5lcl9ILCBzcmNbMF0uaW5uZXJIZWlnaHQoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7IC8vIHJlbmRlciB0aGUgZG9jdW1lbnQgYWZ0ZXIgYWxsIHRoZSBjb21wYXJhdGlvbiBkb25lXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBjb21wYXJlIHRoZSBoZWlnaHQgb2YgcGFnZSBjb250YWluZXIgYW5kIGVhY2ggZmlndXJlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbnRhaW5lcl9oXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpZ3VyZV9oXG4gICAgICovXG4gICAgQVNlcmllc1BhcGVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKGNvbnRhaW5lcl9oLCBmaWd1cmVfaCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdXBkYXRlU3JjTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmaWd1cmUgaW50byB0aGUgdG1wIGFycmF5XG4gICAgICAgICAgICBfdGhpcy50bXBBcnIucHVzaChfdGhpcy5zcmNbMF0pO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBmaWd1cmUgZnJvbSB0aGUgdGFyZ2V0IGxpc3RcbiAgICAgICAgICAgIF90aGlzLnNyYy5zaGlmdCgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY29udGFpbmVyX2ggPj0gZmlndXJlX2gpIHtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb250YWluZXInIGhlaWdodCBieSBtaW51cyB0aGUgZmlndXJlJ3MgaGVpZ2h0IGFuZCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyX0ggLT0gZmlndXJlX2g7XG4gICAgICAgICAgICB1cGRhdGVTcmNMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNyYyBsaXN0IGluIGNhc2UgdGhhdCB0aGUgc2luZ2xlIGZpZ3VyZSdzIGhlaWdodCBiZXlvbmQgdGhlIGNvbnRhaW5lcidzXG4gICAgICAgICAgICB0aGlzLnRtcEFyci5sZW5ndGggPT09IDAgJiYgdXBkYXRlU3JjTGlzdCgpO1xuICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSByYXRpb1xuICAgICAgICAgICAgdmFyIHNjYWxlID0gMDtcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBlZCB0YXJnZXRzIGludG8gdGhlIGZpbmFsIGFycmF5XG4gICAgICAgICAgICB0aGlzLmZpbmFsQXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGZpZ3VyZXM6IHRoaXMudG1wQXJyLFxuICAgICAgICAgICAgICAgIHJhdGlvOiBzY2FsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyByZXNldCB0aGUgY29udGFpbmVyIGhlaWdodCBhbmQgdGhlIHRtcEFyciBmb3IgcHJlcGFyaW5nIGZvciBuZXh0IGl0ZXJhdGlvblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJfSCA9IHRoaXMucmVzZXRIZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMudG1wQXJyID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5qdWRnZUV4aXN0KCk7XG4gICAgfTtcbiAgICAvLyByZW5kZXIgdGhlIGRvY3VtZW50IHRvIGE0IHBhcGVyIGRvY1xuICAgIEFTZXJpZXNQYXBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBpbiBjYXNlIHRoYXQgdG1wQXJyIGlzIG5vdCBlbXB0eVxuICAgICAgICB2YXIgc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLnRtcEFyci5sZW5ndGggJiYgdGhpcy5maW5hbEFyci5wdXNoKHtcbiAgICAgICAgICAgIGZpZ3VyZXM6IHRoaXMudG1wQXJyLFxuICAgICAgICAgICAgcmF0aW86IHNjYWxlXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBlbXB0eSBhbGwgdGhlIGNvbnRlbnRcbiAgICAgICAgJCgnYm9keScpLmVtcHR5KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmluYWxBcnIpO1xuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgcGFnZSBhY2NvcmRpbmcgdG8gdGhlIGFtb3VudCBvZiB0aGUgZ3JvdXBlZCBmaWd1cmVzXG4gICAgICAgICQuZWFjaCh0aGlzLmZpbmFsQXJyLCBmdW5jdGlvbiAoaW5kZXgsIG9iaikge1xuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChfdGhpcy50ZW1wbGF0ZSk7XG4gICAgICAgICAgICAvLyB3cmFwIGVhY2ggZ3JvdXAgd2l0aCB0aGUgc2luZ2xlIHBhZ2UgdGVtcGxhdGVcbiAgICAgICAgICAgIHZhciBwYWdlID0gJCgnYm9keScpLmZpbmQoJChfdGhpcy5jb250YWluZXIpLmVxKGluZGV4KSk7XG4gICAgICAgICAgICAkLmVhY2gob2JqLmZpZ3VyZXMsIGZ1bmN0aW9uIChvcmRlciwgZWxlKSB7XG4gICAgICAgICAgICAgICAgcGFnZS5hcHBlbmQoZWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBU2VyaWVzUGFwZXI7XG59KCkpO1xubW9kdWxlLmV4cG9ydHMgPSBBU2VyaWVzUGFwZXI7XG4iXX0=
