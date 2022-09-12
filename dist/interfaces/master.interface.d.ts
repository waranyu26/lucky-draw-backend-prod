import { Double } from 'typeorm';
import { Station } from './station.interface';
export interface MasterUsers {
    username: string;
    password: string;
    password_mobile_pos: string;
    name: string;
    phone_number: string;
    role_name: string;
}
export interface MasterProducts {
    code: string;
    name: string;
}
export interface MasterCondtions {
    id?: bigint;
    product_id: bigint;
    special_type: number;
    special_num: number;
}
export interface MasterTemplates {
    id?: bigint;
    promotion_template_id?: bigint;
    type: number;
    type_detail: string;
    line_type: number;
    detail: Array<MasterTemplateDetails>;
}
export interface MasterTemplateDetails {
    id?: bigint;
    promotion_template_id?: bigint;
    type: number;
    text_detail: string;
    text_font: number;
}
export interface MasterPromotions {
    id: bigint;
    code: string;
    name: string;
    start_date: Date;
    end_date: Date;
    condtion_type: number;
    start_price: Double;
    end_price: Double;
    use_num: number;
    use_max: number;
    priority: number;
    child_id: bigint;
    conditions: Array<MasterCondtions>;
    templates: Array<MasterTemplates>;
}
export interface MasterData {
    station: Station;
    users: Array<MasterUsers>;
    products: Array<MasterProducts>;
    promotions: Array<MasterPromotions>;
}
