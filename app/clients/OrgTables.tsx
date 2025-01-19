import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdSave } from "react-icons/md";
import {
  addRow,
  deleteRow,
  fetchOrgTables,
  fetchTableData,
  OrgTable,
  TableRow,
  updateRow,
} from "supa";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridActionsCellItem,
} from "@mui/x-data-grid";

type Props = {
  orgId: string;
};

const OrgTables: React.FC<Props> = ({ orgId }) => {
  const [tables, setTables] = useState<OrgTable[]>([]);
  const [tableData, setTableData] = useState<Record<string, TableRow[]>>({});
  const [modifiedRows, setModifiedRows] = useState<Record<string, Set<number>>>(
    {}
  );
  const [newRowValues, setNewRowValues] = useState<
    Record<string, Record<string, any>>
  >({});

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
    value: any
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
    if (!row) return;

    try {
      await updateRow(table, rowId, row.fields);

      setModifiedRows((prev) => {
        const updatedSet = new Set(prev[table]);
        updatedSet.delete(rowId);
        return { ...prev, [table]: updatedSet };
      });
    } catch (error) {
      console.error(`Failed to save row ${rowId} in ${table}:`, error);

      window.alert(`Failed to save changes: ${error.message || error}`);
    }
  };

  const handleAddRow = async (table: string) => {
    const newRow = newRowValues[table];

    try {
      await addRow(table, newRow);

      const updatedData = await fetchTableData(table);
      setTableData((prev) => ({ ...prev, [table]: updatedData }));

      const fields = Object.keys(newRow);
      setNewRowValues((prev) => ({
        ...prev,
        [table]: fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
      }));
    } catch (error) {
      console.error(`Failed to add a new row to ${table}:`, error);
      window.alert(`Failed to add a new row: ${error.message || error}`);
    }
  };

  const handleDeleteRow = async (table: string, rowId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        await deleteRow(table, rowId);
        setTableData((prev) => ({
          ...prev,
          [table]: prev[table].filter((row) => row.id !== rowId),
        }));
      } catch (error) {
        window.alert(`Failed to delete row ${rowId} in ${table}.`);
      }
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
    <section>
      {tables.map(({ table_name, display_name }) => {
        const rows = [
          ...((tableData[table_name] || []) as TableRow[]).map(
            ({ id, fields }) => ({
              id,
              ...fields,
            })
          ),

          // Add a special row for adding new data
          {
            id: "NewRow",
            ...newRowValues[table_name],
          },
        ];

        // Generate columns dynamically based on the first row
        const columns: GridColDef[] = Object.keys(
          tableData[table_name]?.[0]?.fields || {}
        ).map((field) => ({
          field,
          headerName: field,
          flex: 1,
          editable: true, // Allow inline editing
          renderCell: (params) => {
            if (field === "image_url") {
              // Handle image_url column
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    value={params.value || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        table_name,
                        params.id as number,
                        field,
                        e.target.value
                      )
                    }
                    style={{ marginRight: 10, flex: 1, border: "none" }}
                  />
                  {params.value && (
                    <img
                      src={params.value as string}
                      alt="Preview"
                      style={{ width: "50px", height: "auto" }}
                    />
                  )}
                </div>
              );
            }

            // Default rendering for other fields
            return params.value;
          },
        }));

        // Add custom actions column
        columns.push({
          field: "actions",
          headerName: "Actions",
          type: "actions",
          getActions: ({ id }: { id: GridRowId }) =>
            id === "NewRow"
              ? [
                  <GridActionsCellItem
                    label="Add"
                    onClick={() => handleAddRow(table_name)}
                    icon={<MdAdd />}
                  />,
                ]
              : [
                  <GridActionsCellItem
                    label="Save"
                    onClick={() => handleSave(table_name, Number(id))}
                    icon={<MdSave />}
                    disabled={!modifiedRows[table_name]?.has(Number(id))}
                  />,
                  <GridActionsCellItem
                    label="Delete"
                    onClick={() => handleDeleteRow(table_name, Number(id))}
                    icon={<MdDelete />}
                  />,
                ],
        });

        return (
          <div>
            <div key={table_name} style={{ marginTop: 50 }}>
              <h2 className="h2">{display_name}</h2>
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
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <input
                                type={
                                  typeof value === "number" ? "number" : "text"
                                }
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
                              type={
                                typeof value === "number" ? "number" : "text"
                              }
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
                            handleDeleteRow(table_name, id);
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
                              handleNewRowChange(
                                table_name,
                                field,
                                e.target.value
                              )
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
            {/* TABLE TWO */}
            {/* TABLE TWO */}
            {/* TABLE TWO */}
            {/* TABLE TWO */}
            {/* TABLE TWO */}
            {/* TABLE TWO */}
            <div key={table_name + "_2"} style={{ marginTop: 50 }}>
              <h2 className="h2">{display_name}</h2>
              <div style={{ width: "100%", backgroundColor: "white" }}>
                <DataGrid
                  rows={rows || []}
                  columns={columns}
                  processRowUpdate={(newRow) => {
                    const { id, ...fields } = newRow;
                    if (id === "NewRow") {
                      setNewRowValues((prev) => ({
                        ...prev,
                        [table_name]: fields,
                      }));
                    } else {
                      for (const [field, value] of Object.entries(fields)) {
                        handleFieldChange(table_name, Number(id), field, value);
                      }
                    }
                    return newRow;
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default OrgTables;
