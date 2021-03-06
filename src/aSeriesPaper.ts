declare let $:any;
declare let module:any;

interface ASeriesPaperOptions {
    targets?: any; // jquery object
    context?: any; // jquery object
    template?: string; // template string
    container?: string; // container's position in dom tree
    [propName: string]: any;
}

class ASeriesPaper {
    targets: any
    readonly container: any // container in template which hold the content area
    readonly template: string
    pageH: number // height of the content area
    readonly float = 0 // amount of the scaleable value of content area
    container_H: number // just the sum of the content area's height and the scaleable value
    src = []
    tmpArr = []
    finalArr = []
    // Todo: scale value may set according to this.float value in each page for adjusting the layout
    // simply set this value to 0 as the float value now

    constructor(options: ASeriesPaperOptions = {} as ASeriesPaperOptions) {
        // options which can be overload
        let {
            /* default options: */
            // target dom need to assert to the final doc, tag figure as the default targets
            targets = $('figure'),
            context = $(document),
            // page templates defined in options or the default one
            template = `<div class="page">
                            <header>TRAILBLAZERS</header>
                            <main></main>
                            <footer>Page 1 of 1</footer>
                        </div>`,
            // container of the figures
            container = '.page > main'
        }:ASeriesPaperOptions = options as ASeriesPaperOptions;
        
        // overload
        this.targets = context.find(targets);
        this.template = template;
        this.container = container;
        this.pageH = this.getContainer()
        this.container_H = this.resetHeight()
    }

    private getContainer(): number {
        $('body').append(this.template);
        let result = Math.floor($(this.container).innerHeight());
        $(this.container.split(' ')[0]).remove();
        return result;
    }

    // set the container_H to its initialized value
    private resetHeight(): number {
        return this.pageH + this.float
    }

    // kick start 
    init(): void {
        // initial the src array to get the targets:{jquery object}
        let $targs = this.targets;
        let src = this.src;
        $.each($targs, (index, ele) => src.push($(ele)));
        // do judgement
        this.judgeExist()
    }

    // judge if target exists
    private judgeExist(): void {
        let src = this.src;
        if (src[0]) this.compare(this.container_H, src[0].innerHeight());
        else this.render() // render the document after all the comparation done
    }

    /**
     * compare the height of page container and each figure
     * @param {number} container_h
     * @param {number} figure_h
     */
    private compare(container_h: number, figure_h: number): void {
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
            let scale = 0;
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
    }

    // render the document to a4 paper doc
    private render(): void {
        // in case that tmpArr is not empty
        let scale = 0
        this.tmpArr.length && this.finalArr.push({
            figures: this.tmpArr,
            ratio: scale
        });
        // empty all the content
        $('body').empty();

        console.log(this.finalArr)
        // generate the page according to the amount of the grouped figures
        $.each(this.finalArr, (index, obj) => {
            $('body').append(this.template);
            // wrap each group with the single page template
            let page = $('body').find($(this.container).eq(index));
            $.each(obj.figures, (order, ele) => {
                page.append(ele)
            });
        })
    }
}

module.exports = ASeriesPaper;