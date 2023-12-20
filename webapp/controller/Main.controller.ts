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
    private selectItem :CustomListItem;

	private oModel = new JSONModel({
        data:[]
    });
    onInit(): void {
 
        // Set the model to the view
        this.getView().setModel(this.oModel, "data");
        this.getAllData();
    }

	onSelectionChange (event: ListBase$SelectionChangeEvent){
        if(this.selectItem) this.selectItem.getContent()[0].setProperty("editable", false);
		this.selectItem = event.getParameter("listItem") as CustomListItem;
	}

	pressEdit (){
		this.selectItem.getContent()[0].setProperty("editable", true);
	}

    async getAllData(){
        try {
            let response = await fetch(`https://api.restful-api.dev/objects`);
            const oData = await response.json();
            this.oModel.setData({
                data: [...oData]
            });
            console.log(oData)
        } catch (error) {
            console.log(error)
        }
        finally{
            console.log("finally");
        }
    };
}
