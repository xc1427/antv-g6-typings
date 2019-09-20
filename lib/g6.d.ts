
// tslint:disable no-empty-interface member-access array-type
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module '@antv/g6' {
  type ValueOf<T> = T[keyof T];
  type ShapeName<T> = T extends { shape?: any } ? T['shape'] : never;

  export type ObjectLiteral = { [k: string]: any };

  type AnchorPoints = Array<[number, number]>;

  // ~ Node
  interface DescartesNode {
    x: number;
    y: number;
  }
  export interface BaseNodeCfg extends Partial<DescartesNode> {
    id?: string;
    anchorPoints?: AnchorPoints; // 锚点. 每一项也是一个数组如 [0, 0.5] 表示在节点上的相对位置
  }

  interface NodeLabel {
    label?: string;
    labelCfg?: {
      position?: 'center' | 'bottom' | 'top' | 'right' | 'left'; // 默认 'center'
      offset?: number;
      style?: {
        stroke?: string; // node 标签的字体框色（所以说可以实现空心字体）
        fill?: string; // node 标签的字体色
        textAlign?: string; // 'center' etc
        fontWeight?: string | number;
        fontSize?: string | number;
      };
    };
  }

  interface CommonNodeCfg extends NodeLabel {}
  // Add Label definition on top of BaseNode
  interface NonImageNodeStyle {
    cursor: string; // 鼠标形状
    stroke?: string; // node 边框颜色
    lineWidth?: number; // node 边框宽度
    lineDash?: number[]; // node 边框虚线
    fill?: string; // node 填充颜色
    fillOpacity?: number; // node 透明度
  }

  interface RectNodeStyle extends NonImageNodeStyle {
    radius?: number;
  }
  interface RectNodeCfg extends CommonNodeCfg {
    size?: number | [number, number];
    color?: string; // 也可以定义 node 边框颜色
    style?: RectNodeStyle;
  }
  export interface RectNode extends BaseNodeCfg, RectNodeCfg {
    shape: 'rect';
  }

  interface CircleNodeStyle extends NonImageNodeStyle {}
  interface CircleNodeCfg extends CommonNodeCfg {
    size?: number;
    color?: string;
    style?: CircleNodeStyle;
  }
  export interface CircleNode extends BaseNodeCfg, CircleNodeCfg {
    shape: 'circle';
  }

  interface EllipseNodeStyle extends NonImageNodeStyle {}
  interface EllipseNodeCfg extends CommonNodeCfg {
    size?: [number, number];
    color?: string;
    style?: EllipseNodeStyle;
  }
  export interface EllipseNode extends BaseNodeCfg, EllipseNodeCfg {
    shape: 'ellipse';
  }

  interface ImageNodeStyle {
    cursor: string;
  }
  interface ImageNodeCfg extends CommonNodeCfg {
    size?: number | [number, number];
    img: string; // URL, imageData
    style: ImageNodeStyle;
  }
  export interface ImageNode extends BaseNodeCfg, ImageNodeCfg {
    shape: 'image';
  }

  export interface AnonymousNode extends BaseNodeCfg, RectNodeCfg {}

  export interface CustomNode extends BaseNodeCfg {
    [key: string]: any;
    shape: string;
  }

  export type InnerNodeShapeName = ShapeName<RectNode | CircleNode | EllipseNode | ImageNode>;

  // ~ Edge
  interface Connection {
    source: string;
    target: string;
  }

  interface BaseEdgeCfg extends Connection {
    id?: string;
  }

  interface EdgeLabel {
    label?: string;
    labelCfg?: Partial<{
      position: 'bottom' | 'top' | 'right' | 'left' | 'center';
      autoRotate: boolean;
      refY: number; // refY 默认是顺时针方向向下
      refX: number;
      style: Partial<{
        lineWidth: number; // 标签所在行高
        stroke: string; // edge 标签的背景色, 注意：和 node 标签不同
        fill: string; // edge 标签的文字颜色
      }>;
    }>;
  }

  interface EdgeStyle {
    lineDash?: [number, number];
    endArrow?: boolean; // 箭头
    stroke?: string; // edge 线的颜色
  }
  interface CommonEdgeCfg extends EdgeLabel {
    color?: string; // 边的颜色
    size?: number; // 边的宽度
    style?: EdgeStyle;
  }

  interface LineEdgeCfg extends CommonEdgeCfg {}
  export interface LineEdge extends BaseEdgeCfg, LineEdgeCfg {
    shape: 'line';
  }

  interface PolylineEdgeCfg extends CommonEdgeCfg {
    controlPoints?: DescartesNode[];
  }
  export interface PolylineEdge extends BaseEdgeCfg, PolylineEdgeCfg {
    shape: 'polyline';
  }

  interface QuadraticEdgeCfg extends CommonEdgeCfg {
    controlPoints?: DescartesNode[];
  }
  export interface QuadraticEdge extends BaseEdgeCfg, QuadraticEdgeCfg {
    shape: 'quadratic';
  }

  interface CubicEdgeCfg extends CommonEdgeCfg {
    controlPoints?: DescartesNode[];
  }
  export interface CubicEdge extends BaseEdgeCfg, CubicEdgeCfg {
    shape: 'cubic';
  }

  export interface AnonymousEdge extends BaseEdgeCfg, LineEdgeCfg {}
  export interface CustomEdge extends BaseEdgeCfg {
    [key: string]: any;
    shape: string;
  }

  export type InnerEdgeShapeName = ShapeName<LineEdge | PolylineEdge | QuadraticEdge | CubicEdge>;

  // ~ G6 Instance API

  // https://www.yuque.com/antv/g6/item
  export interface Item {
    // Item是G6中绘图元素实例，目前包含节点和边的实例。对于实例的变更建议在graph上进行。
    getType: () => string | 'node' | 'edge';
    get: <T_Type extends string = string>(type: T_Type) => any;
    getContainer: () => Group;
    getModel: () => any;
    getInEdges: () => Item[];
    getOutEdges: () => Item[];
    getAnchorPoints: () => Array<{ anchorIndex?: number; index: number; x: number; y: number }>;
    [k: string]: any;
    getBBox: () => {
      height: number;
      maxX: number;
      maxY: number;
      minX: number;
      minY: number;
      width: number;
      x: number;
      y: number;
    };
    getKeyShape: () => any;
  }

  // Node 继承自 Item，所以，Item 上面的方法在 Node 实例中都可以调用。
  export interface Node extends Item {
    getEdges: () => Edge[];
    getInEdges: () => Edge[];
    getOutEdges: () => Edge[];
    getLinkPoint: (point: DescartesNode) => AnchorPoints;
    getLinkPointByAnchor: (index: number) => AnchorPoints;
    addEdge: (edge: Edge) => void;
    removeEdge: (edge: Edge) => void;
  }

  export interface Edge extends Item {
    getNodes: () => Node[];
  }

  // ~~ Data

  export interface Data<T_Node, T_Edge> {
    nodes?: Array<T_Node extends BaseNodeCfg ? T_Node : never>;
    edges?: Array<T_Edge extends BaseEdgeCfg ? T_Edge : never>;
  }

  // ~~ Event

  interface EventTarget {
    isKeyShape: boolean;
    isShape: boolean;
    [k: string]: any;
  }

  export interface Event {
    target: EventTarget & Shape;
    item: Item;
  }

  type NodeEventName = 'node' | 'node:click' | 'node:mouseenter' | 'node:mouseleave';
  type ActionName = 'click' | 'mouseenter' | 'mouseleave';
  type EventName = ActionName | NodeEventName;

  function OnFunc(event: EventName, eventHandler: (ev: Event) => void): void;

  // ~~ Update

  type UpdateObj = {
    style: ObjectLiteral;
  };
  type Updater = (id: string, update: UpdateObj) => void;

  // https://www.yuque.com/antv/g6/graph
  export class Graph {
    on: typeof OnFunc;

    data: <T_Node, T_Edge>(data: Data<T_Node, T_Edge>) => void;

    render: () => void;

    setMode: (mode: string) => void;

    update: Updater;

    refresh: () => void;

    refreshItem: (id: string) => void;

    findById: <T_Item extends Item = Item>(id: string) => T_Item;

    findAllByState: <T_State>(state: keyof T_State) => Item[];

    setItemState: <T_State>(item: Item, name: keyof T_State, value: ValueOf<T_State>) => void;

    destroy: () => void;

    setAutoPaint: (isAutoPaint: boolean) => void;

    getEdges: () => Edge[];

    getNodes: () => Node[];

    hideItem: (item: Item) => void;

    showItem: (item: Item) => void;

    clearItemStates: <T_State>(
      itemOrId: Item | string,
      states?: Array<keyof T_State> | keyof T_State
    ) => void;

    paint: () => void;

    changeSize: (width: number, height: number) => void;

 // 改变画布大小
    changeData: (data: { nodes: any[]; edges: any[] }) => void; // 更新数据源，根据新的数据重新渲染视图。
  }

  // ~ G API
  export type GShapeName = 'text' | 'circle' | 'path' | 'image' | 'rect' | 'marker';

  // https://www.yuque.com/antv/g6/smhvyn#eacfb1bf
  export interface Group {
    on: (event: ActionName, eventHandler: (args: any[]) => void) => void;
    addShape: (name: GShapeName, cfg: { attrs: ObjectLiteral; className?: string }) => Shape;
    addGroup: (cfgs?: any) => Group;
    findByClassName: (className: string) => Shape | undefined;
    getLast: () => Shape;

    // NOTE: 以下这些大概率是通用方法，和 Node Edge Item Shape Canvas 等共同继承
    // https://www.yuque.com/antv/g6/smhvyn#98b2f067
    attr: (args: any) => void;
    get: (type: 'children' | string) => any;
    set: (name: any, value: any) => any;
    remove: () => void;
    destroy: () => void;
    show: () => void;
    hide: () => void;
    getBBox: () => {
      height: number;
      maxX: number;
      maxY: number;
      minX: number;
      minY: number;
      width: number;
      x: number;
      y: number;
    };
    setZIndex: (zIndex: number) => any;
  }

  function AttrFunc(attr: ObjectLiteral): Shape; // 批量更新实例绘图属性
  function AttrFunc(name: string, value: any): Shape; // 更新实例的单个绘图属性
  function AttrFunc(name: string): any; // 读取

  // https://www.yuque.com/antv/g6/smhvyn#98b2f067
  export interface Shape {
    attr: typeof AttrFunc;
    getBBox: () => {
      height: number;
      maxX: number;
      maxY: number;
      minX: number;
      minY: number;
      width: number;
      x: number;
      y: number;
    };
    on: (event: string, cb: (...args: any[]) => void) => void;
    animate: (
      cfg: {
        onFrame?: (ratio: any) => any;
        repeat?: boolean;
        stroke?: string;
        [key: string]: any;
      },
      duration?: number,
      mode?: 'easeCubic' | string
    ) => void;
    translate: (x: number, y: number) => void;
    show: () => void;
    hide: () => void;
    remove: () => void;
  }

  // ~ G6 Public API

  // ~~ Edge Register
  export interface GetControlPointsCfg {
    startPoint: any;
    endPoint: any;
    [k: string]: any;
  }

  type EdgeMixinDrawExtraCfg = { sourceNode: Node; targetNode: Node };
  export type EdgeMixins<
    T_EdgeCfg extends ObjectLiteral = ObjectLiteral,
    T_CustomMixins extends ObjectLiteral = {},
    T_State extends ObjectLiteral = {}
  > = {
    draw?: (cfg: T_EdgeCfg & EdgeMixinDrawExtraCfg, group: Group) => Shape | void;
    afterDraw?: (cfg: T_EdgeCfg & EdgeMixinDrawExtraCfg, group: Group) => any;
    getControlPoints?: (cfg: GetControlPointsCfg) => any[];
    setState?: (name: keyof T_State, value: ValueOf<T_State>, item: Item) => any;
  } & T_CustomMixins;

  interface EdgeRegister {
    <
      T_CustomEdge extends CustomEdge = never,
      T_CustomMixins extends ObjectLiteral = {},
      T_State extends ObjectLiteral = {}
    >(
      shape: T_CustomEdge['shape'] extends never ? string : T_CustomEdge['shape'],
      edgeMixins: EdgeMixins<T_CustomEdge, T_CustomMixins, T_State>,
      extendEdgeName?: string
    ): void; // tslint:disable-line callable-types
  }

  // ~~ Node Register

  export type NodeMixins<
    T_NodeCfg extends ObjectLiteral = ObjectLiteral,
    T_CustomMixins extends ObjectLiteral = {},
    T_State extends ObjectLiteral = {}
  > = {
    /**
     * @param cfg - 节点的配置项
     * @param group - 节点的容器, antv/g里面的绘图对象
     */
    draw?: (cfg: T_NodeCfg, group: Group) => Shape | void;
    afterDraw?: (cfg: T_NodeCfg, group: Group) => any;
    /**
     * @param cfg - 节点的配置项
     * @param node - node 节点
     */
    update?: (cfg: T_NodeCfg, node: any) => any;
    afterUpdate?: (cfg: T_NodeCfg, node: any) => any;
    setState?: (name: keyof T_State, value: ValueOf<T_State>, item: Item) => any;
    getAnchorPoints?: (cfg: T_NodeCfg) => AnchorPoints;
    shapeType?: 'path' | string;
    getShapeStyle?: (cfg: T_NodeCfg) => ObjectLiteral;
  } & T_CustomMixins;

  interface NodeRegister {
    <
      // tslint:disable-line callable-types
      T_CustomNode extends CustomNode = never,
      T_CustomMixins extends ObjectLiteral = {},
      T_State extends ObjectLiteral = {}
    >(
      shape: T_CustomNode['shape'] extends never ? string : T_CustomNode['shape'],
      mixins: NodeMixins<T_CustomNode, T_CustomMixins, T_State>,
      extendNodeName?: string
    ): void;
  }
  // ~~ Util

  interface G6Util {
    getControlPoint: (
      startPoint: any,
      endPoint: any,
      ratio: number,
      offset: number
    ) => DescartesNode;
    mix: (...args: any[]) => any;
    mat3: {
      create: (...args: any[]) => any;
    };
    transform: (matrix: any, cfg: any) => any;
    each: <T_Style extends ObjectLiteral>(
      style: T_Style,
      cb: (val: ValueOf<T_Style>, attr: keyof T_Style) => void
    ) => void;
  }

  type TooltipMode = {
    type: 'tooltip';
    formatText: (model: ObjectLiteral) => string;
  };
  // ~~ Class
  interface GraphCreateBaseParams {
    container: string | HTMLElement;
    width: number;
    height: number;
    modes?: { [k: string]: Array<string | TooltipMode> };
  }

  interface GraphCreateDefaultParams {
    defaultNode?: ObjectLiteral;
    nodeStyle?: {
      default?: ObjectLiteral;
      selected?: ObjectLiteral;
    };
    defaultEdge?: ObjectLiteral;
    edgeStyle?: {
      default?: ObjectLiteral;
      selected?: ObjectLiteral;
    };
  }

  interface GraphCreateParams extends GraphCreateBaseParams, GraphCreateDefaultParams {}

  interface GraphConstructor {
    new (createParams: GraphCreateParams): Graph; // tslint:disable-line callable-types
  }

  interface G6 {
    Util: G6Util;
    Graph: GraphConstructor;
    registerNode: NodeRegister;
    registerEdge: EdgeRegister;
  }

  const G6: G6;
  export default G6;

  export const G: {
    Path: any;
  };
}

// 全局默认 G6.Global，参考 ：https://www.yuque.com/antv/g6/gq1m6a#9440f45e
