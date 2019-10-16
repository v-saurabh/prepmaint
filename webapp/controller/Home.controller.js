sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ndc/BarcodeScanner",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, BarcodeScanner, JSONModel, MessageToast, MessageBox) {
	"use strict";
	
	return Controller.extend("com.demo.zprepmaint.controller.Home", {
		//global declarations
		abc:"",

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.demo.zprepmaint.view.Home
		 */
	 
		onInit: function () {

		},
		
		onBarcodePress: function() {
		//	var that = this;
		//	MessageToast.show("This opens your camera to scan the returnable code...");
		sap.ndc.BarcodeScanner.scan(
		   function (mResult) {
		      	//var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		      	if(mResult.text !== "") {
		      	//	that.abc = mResult.text;
		      	//	alert("code scanned - " + that.abc);
		      		MessageBox.success(
						"Work Order has been updated with IBC " + mResult.text + ".",
						{
							styleClass: "sapUiSizeCompact" 
						}
					);
		      	} else {
		      		MessageBox.error(
		      			"No barcode entered, please scan again.",
		      			{
		      				styleClass: "sapUiSizeCompact"
		      			}
		      		);	
		      	}
		   },
		   function (Error) {
		      //alert("Scanning failed: " + Error);
		   }
		);
		},
		
		onCreatePoPress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("addservice");
		},
		
		handleDelete: function(oEvent) {
			var oList = this.getView().byId("oTabWorkitem");
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var iLength = sPath.length;
			var iIndex = sPath.slice(iLength - 1);
			var oModel = oList.getModel("workorders");
			var oData = oModel.getData();
			oData.Workorders.splice(iIndex, 1);
			oModel.setData(oData);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.demo.zprepmaint.view.Home
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.demo.zprepmaint.view.Home
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.demo.zprepmaint.view.Home
		 */
		//	onExit: function() {
		//
		//	}

	});

});