import { ColumnsDummy, IColumn } from "./ColumnsSchema";
import { IInputs } from "./generated/ManifestTypes";


const getFetchXmlForQuickFind= (objectTypeCode : number) => ["<fetch top='1' >",
"<entity name='savedquery' >",
  "<attribute name='layoutjson' />",
  "<filter>",
    "<condition attribute='isquickfindquery' operator='eq' value='1' />",
    "<condition attribute='returnedtypecode' operator='eq' value='"+ objectTypeCode + "' />",
  "</filter>",
"</entity>",
"</fetch>"];

export const retrieveView = async (tableName : string, context: ComponentFramework.Context<IInputs>) : Promise<IColumn[]> => {
    try{
    const otc = (await context.utils.getEntityMetadata(tableName))?.ObjectTypeCode ?? 1;
    const quickFindQuery = await context.webAPI.retrieveMultipleRecords("savedquery", `?fetchXml=${getFetchXmlForQuickFind(otc)}` );
    const myQueryRecord = quickFindQuery.entities[0];
    const myQuery = JSON.parse(myQueryRecord.layoutjson);
    const columns = myQuery.Rows[0]?.Cells;
    const columnNames = columns.map((column: any) => column.Name);
    const attributesMetadata = await context.utils.getEntityMetadata(tableName, columnNames);
    return columns.map((column: any)=> {
        return {
            ColName : column.Name,
            ColWidth : column.Width,
            ColDisplayName : attributesMetadata.Attributes.get(column.Name)?.DisplayName
        }
    })

}
catch(e){
    if(e instanceof Error){
        if(e.name === "PCFNonImplementedError"){
            return ColumnsDummy.Value;
        }
    }
    throw e;
}

}