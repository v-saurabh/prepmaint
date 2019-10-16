sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox"
], function (Controller, History, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("com.demo.zprepmaint.controller.CreatePO", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.demo.zprepmaint.view.CreatePO
		 */
		onInit: function () {
			//get the services model from component and set to the display table
			var oTableModel = this.getOwnerComponent().getModel("serviceModel");
			this.getView().byId("tabServItems").setModel(oTableModel);
		},
		
		onAddService: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("addservice", {}, true);
			}
		},
		
		onSubmit: function() {
			var sSussessMsg = this.getView().getModel("i18n").getResourceBundle().getText("msgPoCreateSuccess");
			MessageBox.success(
				sSussessMsg,
				{
					styleClass: "sapUiSizeCompact"
				}
			);
			this.getOwnerComponent().getModel("serviceModel").getData().data.length = 0;
		},
		
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("home", {}, true);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.demo.zprepmaint.view.CreatePO
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.demo.zprepmaint.view.CreatePO
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.demo.zprepmaint.view.CreatePO
		 */
		//	onExit: function() {
		//
		//	}

	});

});