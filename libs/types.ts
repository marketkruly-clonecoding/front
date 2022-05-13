export interface Product {
  product_idx: number;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
  category_idx: number;
  brand_idx: number;
  discount: number;
  discount_price: number;
  price: number;
  name: string;
  subname: string;
  sales_unit: string;
  weight: string;
  type: string;
  packaging_gype: string;
  Allergie_info: string;
  distinct_delivery: string;
  source: string;
  notice: string;
  desc_html: string;
}

export interface ProductImage {
  productimage_idx: number;
  product_idx: number;
  url: string;
}

export interface ProductDetailList {
  product_idx: number;
  name: string;
  origin_price: number;
  discount_price: number;
  save_point_yn: string;
  index: number;
}

export interface ProductReview {
  review_idx: number;
  review_desc: string;
  user_idx: number;
  product_idx: number;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
}
export interface ProductQnA {
  qna_idx: number;
  product_idx: number;
  user_idx: number;
  parent_idx: number;
  qna_desc: string;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
}

export interface Brand {
  brand_idx: number;
  brand_name: string;
  delete_yn: string;
}

export interface Category {
  category_idx: number;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
  name: string;
  category_parent: number;
}

export interface Ad {
  ad_idx: number;
  url: string;
  image: string;
  category_idx: number;
}

export interface User {
  user_idx: number;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
  id: string;
  pwd: string;
  email: string;
  phone: string;
  birth: string;
  sex: string;
  grade: string;
  name: string;
}

export interface Address {
  address_idx: number;
  desc: string;
  default_yn: string;
  recevied_name: string;
  recevied_phone: string;
  user_idx: number;
}

export interface UserPointLog {
  point_log_idx: number;
  user_idx: number;
  create_at: Date;
  is_minus: string;
  point_amount: number;
}

export interface Favorite {
  product_idx: number;
  user_idx: number;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
}

export interface Cart {
  user_idx: number;
  product_idx: number;
  product_amount: number;
}

export interface Coupon {
  coupon_idx: number;
  name: string;
  allowable_price: number;
  specific_yn: string;
  start_tme: Date;
  end_time: Date;
  codition: string;
}

export interface Order {
  order_idx: number;
  product_price: number;
  delivery_fee: string;
  product_discount: number;
  coupon_discount: number;
  use_point: number;
  final_fee: number;
  earnpoint: number;
  pay_method: string;
  user_idx: number;
  orderer: string;
  sender: string;
  recevied_name: string;
  recevied_phone: string;
  deliver_method: string;
  address_dexc: string;
  pickup_location: string;
  entrance_method: string;
  packaging_method: string;
  notify_time: string;
  non_release: string;
  create_at: Date;
  update_at: Date;
  delete_yn: string;
}
