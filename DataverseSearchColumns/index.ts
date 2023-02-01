import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ColumnsDummy, ColumnsSchema, IColumn } from "./ColumnsSchema";
import { retrieveView } from "./RetrieveView";
import { throws } from "assert";
import { threadId } from "worker_threads";

export class DataverseSearchColumns implements ComponentFramework.StandardControl<IInputs, IOutputs> {    
    private notifyOutputChanged: () => void;
    private columns : any;
    private tableName ?: string;
    private sumWidth : number = 0;   
    private widthToAdd : number = 0;
    private ParentWidth : number = 0;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;       
    }

    private calcWidth = (columns : IColumn[]) : IColumn[] => {
        this.sumWidth= columns.reduce((sum, current) => sum + (current.Width ?? 0) , 0);
        if(this.sumWidth < this.ParentWidth) {
            const delta = Math.round( (this.ParentWidth - this.sumWidth) / columns.length);
            return columns.map((column) => {
                return {
                    ColName : column.ColName,
                    ColDisplayName : column.ColDisplayName,
                    ColWidth : (column.Width ?? 20) + delta, 
                    Width : column.Width
                };
            });
        }
        return columns;
    } 

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        if(this.tableName != context.parameters.tableName.raw){ 
            this.tableName = context.parameters.tableName.raw ?? "account";      
            this.ParentWidth = context.parameters.ParentWidth.raw ?? 0;
            retrieveView(this.tableName, context).then((columns)=>{
                this.columns = {
                    Value : this.calcWidth(columns)
                }               
                this.notifyOutputChanged();
            })                        
        }
        else {
            if(this.ParentWidth != context.parameters.ParentWidth.raw && context.parameters.ParentWidth.raw != null){
                this.ParentWidth = context.parameters.ParentWidth.raw ?? 0;
                this.columns = {
                    Value : this.calcWidth(this.columns.Value)
                }
                this.notifyOutputChanged();
            }
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        //console.log(this.columns);
        return { 
            Columns : this.columns          
        };
    }

    /**
     * It is called by the framework prior to a control init to get the output object(s) schema
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns an object schema based on nomenclature defined in manifest
     */
    public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
        return Promise.resolve({
            Columns: ColumnsSchema
        });
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
