var $ = require('jquery');
var ASeriesPaper = (function () {
    function ASeriesPaper(options) {
        if (options === void 0) { options = {}; }
        this.float = 0;
        this.src = [];
        this.tmpArr = [];
        this.finalArr = [];
        this.scale = 0;
        this.targets = (options.targets || $(document)).find(options.targets || $('figure'));
        this.template = options.template ||
            "<div class=\"page\">\n            <header>TRAILBLAZERS</header>\n            <main></main>\n            <footer>Page 1 of 1</footer>\n        </div>";
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
        console.log('init');
        // initial the src array to get the targets:{jquery object}
        var $targs = this.targets;
        var _self = this;
        var src = _self.src;
        $.each($targs, function (index, ele) {
            src.push($(ele));
        });
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
        // in case that tmpArr is not empty
        this.tmpArr.length && this.finalArr.push({
            figures: this.tmpArr,
            ratio: this.scale
        });
        // empty all the content
        $('body').empty();
        console.log(this.finalArr);
        var _self = this;
        $.each(this.finalArr, function (index, obj) {
            $('body').append(_self.template);
            var page = $('body').find($(_self.container).eq(index));
            $.each(obj.figures, function (order, ele) {
                page.append(ele);
            });
        });
    };
    return ASeriesPaper;
}());
module.exports = ASeriesPaper;
