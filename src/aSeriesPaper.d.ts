declare function require(path: string): any;
declare var $: any;
interface Options {
    targets?: any;
    context?: any;
    template?: string;
    container?: string;
}
declare class ASeriesPaper {
    targets: any;
    template: string;
    container: any;
    pageH: number;
    container_H: number;
    readonly float: number;
    src: Array<any>;
    tmpArr: Array<any>;
    finalArr: Array<any>;
    scale: number;
    constructor(options?: Options);
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
