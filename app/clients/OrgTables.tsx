import React, { useState, useEffect } from "react";
import {
  addRow,
  deleteRow,
  fetchOrgTables,
  fetchTableData,
  OrgTable,
  TableRow,
  updateRow,
} from "supa";

type Props = {
  orgId: string;
};

const OrganizationTables: React.FC<Props> = ({ orgId }) => {
  const [tables, setTables] = useState<OrgTable[]>([]);
  const [tableData, setTableData] = useState<Record<string, TableRow[]>>({});

  useEffect(() => {
    if (orgId !== "") {
      const loadTables = async () => {
        console.log("Fetching Tables");
        const fetchedTables = await fetchOrgTables(orgId);
        console.log("TABLES", fetchedTables);
        setTables(fetchedTables);

        const data: Record<string, TableRow[]> = {};
        for (const { table_name, display_name } of fetchedTables) {
          console.log(`fetching ${display_name}`);
          data[table_name] = await fetchTableData(table_name);
          console.log("Data", data[table_name]);
        }
        setTableData(data);
      };

      loadTables();
    }
  }, [orgId]);

  const handleFieldChange = (
    table: string,
    rowId: number,
    field: string,
    value: string | number
  ) => {
    setTableData((prev) => ({
      ...prev,
      [table]: prev[table].map((row) =>
        row.id === rowId
          ? { ...row, fields: { ...row.fields, [field]: value } }
          : row
      ),
    }));
  };

  const handleSave = async (table: string, rowId: number) => {
    const row = tableData[table].find((row) => row.id === rowId);
    if (row) {
      await updateRow(table, rowId, row.fields);
    }
  };

  const handleAddRow = async (table: string) => {
    const newRow: Record<string, any> = {}; // Add default values as needed
    await addRow(table, newRow);

    const updatedData = await fetchTableData(table);
    setTableData((prev) => ({ ...prev, [table]: updatedData }));
  };

  const handleDeleteRow = async (table: string, rowId: number) => {
    await deleteRow(table, rowId);

    setTableData((prev) => ({
      ...prev,
      [table]: prev[table].filter((row) => row.id !== rowId),
    }));
  };

  return (
    <div>
      {tables.map(({ table_name, display_name }) => (
        <div key={table_name}>
          <h2>{display_name}</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(tableData[table_name]?.[0]?.fields || {}).map(
                  (field) => (
                    <th key={field}>{field}</th>
                  )
                )}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData[table_name]?.map(({ id, fields }) => (
                <tr key={id}>
                  {Object.entries(fields).map(([field, value]) => (
                    <td key={field}>
                      {field === "image_url" ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <input
                            type={typeof value === "number" ? "number" : "text"}
                            value={value}
                            onChange={(e) =>
                              handleFieldChange(
                                table_name,
                                id,
                                field,
                                e.target.value
                              )
                            }
                          />
                          <img
                            src={value as string}
                            alt="Preview"
                            style={{ width: "100px", height: "auto" }}
                          />
                        </div>
                      ) : (
                        <input
                          type={typeof value === "number" ? "number" : "text"}
                          value={value}
                          onChange={(e) =>
                            handleFieldChange(
                              table_name,
                              id,
                              field,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleSave(table_name, id)}>
                      Save
                    </button>
                    <button onClick={() => handleDeleteRow(table_name, id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => handleAddRow(table_name)}>Add New Row</button>
        </div>
      ))}
    </div>
  );
};

export default OrganizationTables;
