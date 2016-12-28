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
