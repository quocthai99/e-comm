const path = {
    PUBLIC: '/',
    HOME: '',
    LOGIN: 'login',
    REGISTER: 'register',
    PRODUCTS: 'products',
    PRODUCTS__CATE: 'products/:category',
    DETAIL_PRODUCT__CATE__ID: 'products/:category/:name/:id',


    // member
    PRIVATE: 'private',
    PERSONAL: 'personal',

    // admin
    ADMIN: 'admin',
    MANAGE_USER: 'manage-user',
    CREATE_PRODUCTS: 'create-products',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',

};

export default path;
