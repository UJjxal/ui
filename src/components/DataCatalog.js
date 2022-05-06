import { getOptionsForData, addOptionsForData, updateOptionsForData, updateOptionsForDataTable, deleteOptionsForData } from '../services/dataCatalogService';

export async function dataCatalog(){
    const { data } = await getOptionsForData();
    console.log("DATA IN OPTIONS", data);
    if (data.code == 200) {
        let entities = data.response;
        let dataTablesWithFields = entities
            .filter((elem, index) => entities.findIndex((obj) => obj.entity === elem.entity) === index)
            .map((row) => ({ key: row.entity, title: row.entity, type: row.type, schema: row.schema, children: [] }));

        entities.forEach((elem, i) => {
            let ent = elem.entity;
            dataTablesWithFields[
                dataTablesWithFields.findIndex((table) => table.key === ent)
            ].children.push({ title: elem.fieldName, key: elem.fieldName + '#' + i, expression: elem.expression || '', columnFilter: elem.columnFilter, filterExpression: elem.filterExpression || '' });
        });

        let dataTablesNames = dataTablesWithFields.map((row) => {
            return { key: row.key, title: row.title };
        });

        const editorTable = [];

        //SQL Editor
        dataTablesWithFields.forEach(table => {
            editorTable.push({ caption: table.key, value: table.key, meta: "table" });
            table.children.forEach(field => {
                editorTable.push({ caption: table.key + '.' + field.title, value: field.title, meta: "field" });
            })
        });

        return {
            optionsForDataField: dataTablesWithFields,
            optionsForDataTable: dataTablesNames,
            optionsForEditorTable: editorTable,
        }

      } else {
        console.error(data.message);
      }
}

export async function addDataCatalog(data){
    const response = await addOptionsForData(data);
    return response;
}

export async function updateDataCatalog(data){
    const response = await updateOptionsForData(data);
    return response;
}

export async function updateDataCatalogTable(data){
    const response = await updateOptionsForDataTable(data);
    return response;
}

export async function deleteDataCatalog(data){
    const response = await deleteOptionsForData(data);
    return response;
}