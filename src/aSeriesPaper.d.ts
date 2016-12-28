declare let $: any;
declare let module: any;
interface ASeriesPaperOptions {
    targets?: any;
    context?: any;
    template?: string;
    container?: string;
    [propName: string]: any;
}
declare class ASeriesPaper {
    targets: any;
    readonly container: any;
    readonly template: string;
    pageH: number;
    readonly float: number;
    container_H: number;
    src: any[];
    tmpArr: any[];
    finalArr: any[];
    constructor(options?: ASeriesPaperOptions);
    private getContainer();
    private resetHeight();
    init(): void;
    private judgeExist();
    /**
     * compare the height of page container and each figure
     * @param {number} container_h
     * @param {number} figure_h
     */
    private compare(container_h, figure_h);
    private render();
}
