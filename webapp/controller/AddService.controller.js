sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter"
], function (Controller, MessageBox, History, UIComponent, JSONModel, Filter) {
	"use strict";

	return Controller.extend("com.demo.zprepmaint.controller.AddService", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.demo.zprepmaint.view.AddService
		 */
		onInit: function () {
			var oVendorData = {
				"Vendors": [
					{
						"VendorID": "V001",
						"VendorName": "Vendor 001"
					},
					{
						"VendorID": "V002",
						"VendorName": "Vendor 002"
					},
					{
						"VendorID": "V003",
						"VendorName": "Vendor 003"
					},
					{
						"VendorID": "V004",
						"VendorName": "Vendor 004"
					},
					{
						"VendorID": "V005",
						"VendorName": "Vendor 005"
					}
				]
			};
			var oVendModel = new JSONModel(oVendorData);
			this.getView().setModel(oVendModel, "vendorModel");
			
			var oServiceData = {
				"Services": [
					{
						"ServiceID": "S001",
						"ServiceName": "Service 001"
					},
					{
						"ServiceID": "S002",
						"ServiceName": "Service 002"
					},
					{
						"ServiceID": "S003",
						"ServiceName": "Service 003"
					},
					{
						"ServiceID": "S004",
						"ServiceName": "Service 004"
					},
					{
						"ServiceID": "S005",
						"ServiceName": "Service 005"
					}
				]
			};
			var oServModel = new JSONModel(oServiceData);
			this.getView().setModel(oServModel, "serviceModel");
		},
		
		onAdd: function() {
			var sVendor = this.getView().byId("inputVendor").getValue();
			var sService = this.getView().byId("inputService").getValue();
			var sMatlText = this.getView().byId("inputMatlText").getValue();
			
			if(sVendor !== "" && sService !== "") {
				var itemRow = {
					Vendor: sVendor,
					Service: sService,
					MatlText: sMatlText
				};
				var oServModel = this.getOwnerComponent().getModel("serviceModel");
				//this._data.data.push(itemRow);
				oServModel.getData().data.push(itemRow);
				oServModel.refresh();
				
				this.getView().byId("inputVendor").setValue("");
				this.getView().byId("inputService").setValue("");
				this.getView().byId("inputMatlText").setValue("");
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("createpo");
			} else {
				var sErrorMsg = this.getView().getModel("i18n").getResourceBundle().getText("msgValidationError");
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.error(
					sErrorMsg,
					{
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}
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
		},
		
		_handleVendorValueHelp: function(oEvent) {
			var vInputValue = oEvent.getSource().getValue();
			
			this.inputId = oEvent.getSource().getId();
			if (!this._vendorvalueHelpDialog) {
				this._vendorvalueHelpDialog = sap.ui.xmlfragment(
					"com.demo.zprepmaint.view.fragment.VendorDialog",
					this
				);
				this.getView().addDependent(this._vendorvalueHelpDialog);
			}
			
			this._vendorvalueHelpDialog.open(vInputValue);
		},
		
		_handleServiceValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			
			this.inputId = oEvent.getSource().getId();
			if (!this._servicevalueHelpDialog) {
				this._servicevalueHelpDialog = sap.ui.xmlfragment(
					"com.demo.zprepmaint.view.fragment.ServiceDialog",
					this
				);
				this.getView().addDependent(this._servicevalueHelpDialog);
			}
			this._servicevalueHelpDialog.open(sInputValue);
		},
		
		_handleVendorValueHelpClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if(oSelectedItem) {
				var vendorInput = this.byId(this.inputId);
				vendorInput.setValue(oSelectedItem.getTitle());
				//this.getOwnerComponent().getModel("serviceFormModel").getData().Vendor = oSelectedItem.getTitle();
			}
			oEvent.getSource().getBinding("items").filter([]);
		},

		_handleServiceValueHelpClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if(oSelectedItem) {
				var serviceInput = this.byId(this.inputId);
				serviceInput.setValue(oSelectedItem.getTitle());
				// this.getOwnerComponent().getModel("serviceFormModel").getData().Service = oSelectedItem.getTitle();
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		
		_handleVendorValueHelpSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(
				"VendorID",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		
		_handleServiceValueHelpSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(
				"ServiceID",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		}
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.demo.zprepmaint.view.AddService
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.demo.zprepmaint.view.AddService
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.demo.zprepmaint.view.AddService
		 */
		//	onExit: function() {
		//
		//	}

	});

});