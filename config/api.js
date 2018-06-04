const ApiRootUrl = 'http://127.0.0.1:8360/api/';

module.exports = {
  IndexUrl: ApiRootUrl + 'index/index', // for index
  CatalogList: ApiRootUrl + 'catalog/index', // for all of catalogs
  CatalogCurrent: ApiRootUrl + 'catalog/current', // for current catalog list

  // UNRESOLVED
  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin', // wechat login
  
  // for goods
  GoodsCount: ApiRootUrl + 'goods/count',
  GoodsList: ApiRootUrl + 'goods/list',
  GoodsCategory: ApiRootUrl + 'goods/category',
  GoodsDetail: ApiRootUrl + 'goods/detail',
  GoodsNew: ApiRootUrl + 'goods/new',
  GoodsHot: ApiRootUrl + 'goods/hot',
  GoodsRelated: ApiRootUrl + 'goods/related', //related goods, for recommandation

  // for brand
  BrandList: ApiRootUrl + 'brand/list',
  BrandDetail: ApiRootUrl + 'brand/detail',

  // for cart
  CartList: ApiRootUrl + 'cart/index',
  CartAdd: ApiRootUrl + 'cart/add',
  CartUpdate: ApiRootUrl + 'cart/update',
  CartDelete: ApiRootUrl + 'cart/delete',
  CartChecked: ApiRootUrl + 'cart/checked',
  CartGoodsCount: ApiRootUrl + 'cart/goodscount',
  CartCheckout: ApiRootUrl + 'cart/checkout',

  // for collection
  CollectLis: ApiRootUrl + 'collect/list',
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',

  // for comments
  CommentList: ApiRootUrl + 'comment/list',
  CommentCount: ApiRootUrl + 'comment/count',
  CommentPost: ApiRootUrl + 'comment/post',

  // for topics
  TopicList: ApiRootUrl + 'topic/list',
  TopicDetail: ApiRootUrl + 'topic/detail',
  TopicRelated: ApiRootUrl + 'topic/related',

  // for searching
  SearchIndex: ApiRootUrl + 'search/index',
  SearchResult: ApiRootUrl + 'search/result',
  SearchHelper: ApiRootUrl + 'search/helper',
  SearchClearHistory: ApiRootUrl + 'search/clearhistory',

  // for addresses
  AddressList: ApiRootUrl + 'address/list',
  AddressDetail: ApiRootUrl + 'address/detail',
  AddressSave: ApiRootUrl + 'address/save',
  AddressDelete: ApiRootUrl + 'address/delete',

  // for region
  RegionList: ApiRootUrl + 'region/list',

  // for orders
  OrderList: ApiRootUrl + 'order/list',
  OrderDetail: ApiRootUrl + 'order/detail',
  OrderCancel: ApiRootUrl + 'order/cancel',
  OrderExpress: ApiRootUrl + 'order/express',
  OrderSubmit: ApiRootUrl + 'order/submit',

  // for pay
  PayPrepayId: ApiRootUrl + 'pay/prepay',

  // for footprint
  FootprintList: ApiRootUrl + 'footprint/list',
  FootprintDelete: ApiRootUrl + 'footprint/delete',
};