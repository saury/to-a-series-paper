declare function require(path: string): any;
var $ = require('jquery');

interface Options {
    targets?: any, // jquery object
    context?: any, // jquery object
    template?: string, // template string
    container?: string // container's position in dom tree
}

class ASeriesPaper {
    targets: any
    template: string
    container: any
    pageH: number
    container_H: number
    readonly float: number = 0
    src: Array<any> = []
    tmpArr: Array<any> = []
    finalArr: Array<any> = []
    scale: number = 0
    constructor(options: Options = {}) {
        this.targets = (options.targets || $(document)).find(
            options.targets || $('figure')
        );
        this.template = options.template || 
        `<div class="page">
            <header>TRAILBLAZERS</header>
            <main></main>
            <footer>Page 1 of 1</footer>
        </div>`;
        this.container = options.container || '.page > main';
        this.pageH = this.getContainer()
        this.container_H = this.resetHeight()
    }

    getContainer(){
        $('body').append(this.template);
        let result = Math.floor($(this.container).innerHeight());
        $(this.container.split(' ')[0]).remove();
        return result;
    }
    
    // set the container_H to its initialized value
    resetHeight() {
        return this.pageH + this.float
    }

    // kick start 
    init() {
        console.log('init')
        // initial the src array to get the targets:{jquery object}
        let $targs = this.targets;
        let _self = this;
        let src = _self.src;
        $.each($targs, function (index, ele) {
            src.push($(ele));
        });

        // do judgement
        this.judgeExist()
    }

    // judge if target exists
    judgeExist() {
        let src = this.src;
        if (src[0]) this.compare(this.container_H, src[0].innerHeight());
        else this.render() // render the document after all the comparation done
    }

    /**
     * compare the height of page container and each figure
     * @param {number} container_h
     * @param {number} figure_h
     */
    compare(container_h: number, figure_h: number) {
        let updateSrcList = () => {
            // store the figure into the tmp array
            this.tmpArr.push(this.src[0])
            // remove the figure from the target list
            this.src.shift();
        }

        if (container_h >= figure_h) {
            // reset the container' height by minus the figure's height and update the list
            this.container_H -= figure_h;
            updateSrcList();
            // console.log(container_h, figure_h)
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
    }

    // render the document to a4 paper doc
    render() {
        // in case that tmpArr is not empty
        this.tmpArr.length && this.finalArr.push({
            figures: this.tmpArr,
            ratio: this.scale
        });
        // empty all the content
        $('body').empty();
        
        console.log(this.finalArr)
        let _self = this;
        $.each(this.finalArr, function(index, obj){
            $('body').append(_self.template);
            let page = $('body').find($(_self.container).eq(index));
            $.each(obj.figures, function(order, ele){
                page.append(ele)
            });
        })
    }
}

module.exports = ASeriesPaper;