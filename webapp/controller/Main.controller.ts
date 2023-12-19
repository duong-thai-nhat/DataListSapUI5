import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event"
import { List$SelectionChangeEvent } from "sap/ui/webc/main/List";
import Input from "sap/m/Input";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";
import CustomListItem from "sap/m/CustomListItem";

/**
 * @namespace sap.datalist.app.controller
 */
export default class Main extends BaseController {
	private oModel = new JSONModel({
        data:[]
    });
    onInit(): void {
 
        // Set the model to the view
        this.getView().setModel(this.oModel, "data");
        this.getAllData();
    }

	onSelectionChange (event: ListBase$SelectionChangeEvent){
		
		let selectItem = event.getParameter("listItem") as CustomListItem;
		console.log(selectItem.getContent())
		selectItem.getContent()[0].setProperty("editable", true);
	}

	pressEdit (){
		
	}

    async getAllData(){
        try {
            let response = await fetch(`https://api.restful-api.dev/objects`);
            const oData = await response.json();
            this.oModel.setData({
                data: [...oData]
            });
        } catch (error) {
            console.log(error)
        }
        finally{
            console.log("finally");
        }
    };
}
