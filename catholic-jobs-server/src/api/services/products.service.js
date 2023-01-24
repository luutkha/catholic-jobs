"use strict";

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "products",
	// version: 1
	/**
	 * Mixins
	 */
	// mixins: [DbMixin("products")],

	/**
	 * Settings
	 */
	// settings: {
	// 	// Available fields in the responses
	// 	fields: [
	// 		"_id",
	// 		"name",
	// 		"quantity",
	// 		"price"
	// 	],

	// 	// Validator for the `create` & `insert` actions.
	// 	entityValidator: {
	// 		name: "string|min:3",
	// 		price: "number|positive"
	// 	}
	// },

	/**
	 * Action Hooks
	 */
	// hooks: {
	// 	before: {
	// 		/**
	// 		 * Register a before hook for the `create` action.
	// 		 * It sets a default value for the quantity field.
	// 		 *
	// 		 * @param {Context} ctx
	// 		 */
	// 		create(ctx) {
	// 			ctx.params.quantity = 0;
	// 		}
	// 	}
	// },

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		// --- ADDITIONAL ACTIONS ---

		/**
		 * Increase the quantity of the product item.
		 */
		increaseQuantity: {
			rest: "GET /quantity/",
			// params: {
			// 	id: "string",
			// 	value: "number|integer|positive"
			// },
			/** @param {Context} ctx */
			async handler(ctx) {
				consolelog('xxxx')
				return {};
			}
		},

		/**
		 * Decrease the quantity of the product item.
		 */
		decreaseQuantity: {
			rest: "PUT /:id/quantity/decrease",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { quantity: -ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		}
	},
};
