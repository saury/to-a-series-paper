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
    scale: number;
    constructor(options?: ASeriesPaperOptions);
    getContainer(): number;
    resetHeight(): number;
    init(): void;
    judgeExist(): void;
    /**
     * compare the height of page container and each figure
     * @param {number} container_h
     * @param {number} figure_h
     */
    compare(container_h: number, figure_h: number): void;
    render(): void;
}
