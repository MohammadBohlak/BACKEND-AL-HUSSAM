"use strict";
(() => {
var exports = {};
exports.id = 480;
exports.ids = [480];
exports.modules = {

/***/ 185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const productSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    name: {
        type: String,
        required: [
            true,
            "Product name is required"
        ],
        trim: true
    },
    type: {
        type: String,
        required: [
            true,
            "Product type is required"
        ],
        trim: true
    },
    price: {
        type: Number,
        required: [
            true,
            "Price is required"
        ],
        min: [
            0,
            "Price cannot be negative"
        ]
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Product) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Product", productSchema));


/***/ }),

/***/ 323:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(616);
/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(721);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/**
Get single product:
GET /api/products/PRODUCT_ID

Update product:

PUT /api/products/PRODUCT_ID
Content-Type: application/json
{
  "name": "Updated Product",
  "type": "Updated Type",
  "price": 1099.99,
  "description": "Updated description",
  "imageUrl": "https://example.com/new-image.jpg"
}

Delete product:
DELETE /api/products/PRODUCT_ID
*/ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET single product
handler.get(async (req, res)=>{
    try {
        const product = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(req.query.id);
        if (!product) {
            return res.status(404).send({
                error: "Product not found"
            });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch product"
        });
    }
});
// PUT update product
handler.put(async (req, res)=>{
    try {
        const updatedProduct = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedProduct) {
            return res.status(404).send({
                error: "Product not found"
            });
        }
        res.send(updatedProduct);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        res.status(500).send({
            error: "Failed to update product"
        });
    }
});
// DELETE product (حذف فعلي)
handler.delete(async (req, res)=>{
    try {
        // حذف المنتج فعلياً من قاعدة البيانات
        const deletedProduct = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndDelete */ .Z.findByIdAndDelete(req.query.id);
        if (!deletedProduct) {
            return res.status(404).send({
                error: "Product not found"
            });
        }
        res.send({
            message: "Product is delete successfully"
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to delete product"
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762], () => (__webpack_exec__(323)));
module.exports = __webpack_exports__;

})();