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
  const [modifiedRows, setModifiedRows] = useState<Record<string, Set<number>>>(
    {}
  );
  const [newRowValues, setNewRowValues] = useState<
    Record<string, Record<string, any>>
  >({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (orgId !== "") {
      const loadTables = async () => {
        const fetchedTables = await fetchOrgTables(orgId);
        setTables(fetchedTables);

        const data: Record<string, TableRow[]> = {};
        for (const { table_name } of fetchedTables) {
          data[table_name] = await fetchTableData(table_name);
        }
        setTableData(data);

        // Initialize modified rows for each table
        const modified: Record<string, Set<number>> = {};
        fetchedTables.forEach(({ table_name }) => {
          modified[table_name] = new Set();
        });
        setModifiedRows(modified);
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

    setModifiedRows((prev) => {
      const updatedSet = new Set(prev[table]);
      updatedSet.add(rowId);
      return { ...prev, [table]: updatedSet };
    });
  };

  const handleSave = async (table: string, rowId: number) => {
    const row = tableData[table].find((row) => row.id === rowId);
    if (row) {
      try {
        await updateRow(table, rowId, row.fields);
        setModifiedRows((prev) => {
          const updatedSet = new Set(prev[table]);
          updatedSet.delete(rowId);
          return { ...prev, [table]: updatedSet };
        });
      } catch (error) {
        setErrorMessage(`Failed to save row ${rowId} in ${table}.`);
      }
    }
  };

  const handleAddRow = async (table: string) => {
    const newRow = newRowValues[table]; // Get values from state
    try {
      await addRow(table, newRow);
      const updatedData = await fetchTableData(table);
      setTableData((prev) => ({ ...prev, [table]: updatedData }));

      // Reset new row values
      const fields = Object.keys(newRow);
      setNewRowValues((prev) => ({
        ...prev,
        [table]: fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
      }));
    } catch (error) {
      setErrorMessage(`Failed to add a new row to ${table}.`);
    }
  };

  const handleDeleteRow = async (table: string, rowId: number) => {
    try {
      await deleteRow(table, rowId);
      setTableData((prev) => ({
        ...prev,
        [table]: prev[table].filter((row) => row.id !== rowId),
      }));
    } catch (error) {
      setErrorMessage(`Failed to delete row ${rowId} in ${table}.`);
    }
  };

  const handleNewRowChange = (table: string, field: string, value: string) => {
    setNewRowValues((prev) => ({
      ...prev,
      [table]: {
        ...prev[table],
        [field]: value,
      },
    }));
  };

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
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
                    <button
                      onClick={() => {
                        console.log("save");
                        handleSave(table_name, id);
                      }}
                      disabled={!modifiedRows[table_name]?.has(id)}
                      style={{
                        marginRight: 10,
                        marginLeft: 10,
                        cursor: modifiedRows[table_name]?.has(id)
                          ? "pointer"
                          : undefined,
                        color: !modifiedRows[table_name]?.has(id)
                          ? "gray"
                          : undefined,
                      }}
                    >
                      Save
                    </button>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this item?"
                        );
                        if (confirmed) {
                          handleDeleteRow(table_name, id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* Empty row for adding a new row */}
              <tr>
                {Object.keys(tableData[table_name]?.[0]?.fields || {}).map(
                  (field) => (
                    <td key={field}>
                      <input
                        type="text"
                        placeholder={`Enter ${field}`}
                        value={newRowValues[table_name]?.[field] || ""}
                        onChange={(e) =>
                          handleNewRowChange(table_name, field, e.target.value)
                        }
                      />
                    </td>
                  )
                )}
                <td>
                  <button
                    style={{ marginLeft: 10, cursor: "pointer" }}
                    onClick={() => handleAddRow(table_name)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OrganizationTables;
