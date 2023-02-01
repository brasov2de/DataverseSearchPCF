import { Interface } from "readline";

export const ColumnsSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "Value": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
              "ColName": {"type": "string"},
              "ColWidth": {"type": "integer"},
              "ColDisplayName": {"type": "string"}
            }
          }        
        }
    }    
};

export interface IColumn {
    ColName: string;
    CoLWidth ?: number;
    Width ?: number;
    ColDisplayName : string;
}

export const ColumnsDummy = {    
    "Value": [
        { 
            "ColName": "accountnumber",
            "ColWidth": 100,
            "Width":100,
            "ColDisplayName": "No"
        },
        { 
            "ColName": "name",
            "ColWidth": 200,
            "Width": 200,
            "ColDisplayName": "Name"
        },
        { 
            "ColName": "address1_city",
            "ColWidth": 200,
            "Width" : 200,
            "ColDisplayName": "City"
        },
        { 
            "ColName": "telephone1",
            "ColWidth": 200,
            "Width" : 200,
            "ColDisplayName": "Telephone"
        }
    ]
}
  
const QuickFindResponseExample = {
    "Name": "resultset",
    "Object": 10281,
    "Rows": [
        {
            "Name": "result",
            "Id": "diana_pcftesterid",
            "Cells": [
                {
                    "Name": "diana_name",
                    "Width": 300,
                    "RelatedEntityName": "",
                    "DisableMetaDataBinding": false,
                    "LabelId": "",
                    "IsHidden": false,
                    "DisableSorting": false,
                    "AddedBy": "",
                    "Desc": "",
                    "CellType": "",
                    "ImageProviderWebresource": "",
                    "ImageProviderFunctionName": ""
                },
                {
                    "Name": "createdon",
                    "Width": 125,
                    "RelatedEntityName": "",
                    "DisableMetaDataBinding": false,
                    "LabelId": "",
                    "IsHidden": false,
                    "DisableSorting": false,
                    "AddedBy": "",
                    "Desc": "",
                    "CellType": "",
                    "ImageProviderWebresource": "",
                    "ImageProviderFunctionName": ""
                },
                {
                    "Name": "diana_technologycode",
                    "Width": 100,
                    "RelatedEntityName": "",
                    "DisableMetaDataBinding": false,
                    "LabelId": "",
                    "IsHidden": false,
                    "DisableSorting": false,
                    "AddedBy": "",
                    "Desc": "",
                    "CellType": "",
                    "ImageProviderWebresource": "",
                    "ImageProviderFunctionName": ""
                }
            ],
            "MultiObjectIdField": "",
            "LayoutStyle": ""
        }
    ],
    "CustomControlDescriptions": [],
    "Jump": "diana_name",
    "Select": true,
    "Icon": true,
    "Preview": true,
    "IconRenderer": ""
}
