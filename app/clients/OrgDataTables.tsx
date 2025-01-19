import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { MdDelete, MdSave } from "react-icons/md";

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

const OrgDataTables: React.FC<Props> = ({ orgId }) => {
  const [tables, setTables] = useState<OrgTable[]>([]);
  const [tableData, setTableData] = useState<Record<string, TableRow[]>>({});
  const [newRowValues, setNewRowValues] = useState<
    Record<string, Record<string, any>>
  >({});

  useEffect(() => {
    if (orgId) {
      const loadTables = async () => {
        const fetchedTables = await fetchOrgTables(orgId);
        setTables(fetchedTables);

        const data: Record<string, TableRow[]> = {};
        for (const { table_name } of fetchedTables) {
          data[table_name] = await fetchTableData(table_name);
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
    if (!row) return;

    try {
      await updateRow(table, rowId, row.fields);
      console.log("Row saved successfully");
    } catch (error) {
      window.alert(`Failed to save changes: ${error.message || error}`);
    }
  };

  const handleAddRow = async (table: string) => {
    const newRow = newRowValues[table];
    try {
      await addRow(table, newRow);

      const updatedData = await fetchTableData(table);
      setTableData((prev) => ({ ...prev, [table]: updatedData }));
    } catch (error) {
      window.alert(`Failed to add a new row: ${error.message || error}`);
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
      window.alert(`Failed to delete row ${rowId} in ${table}.`);
    }
  };

  return (
    <section>
      {tables.map(({ table_name, display_name }) => {
        const rows = tableData[table_name]?.map(({ id, fields }) => ({
          id,
          ...fields,
        }));

        // Generate columns dynamically based on the first row
        const columns: GridColDef[] = Object.keys(
          tableData[table_name]?.[0]?.fields || {}
        ).map((field) => ({
          field,
          headerName: field,
          flex: 1,
          editable: true, // Allow inline editing
        }));

        // Add custom actions column
        columns.push({
          field: "actions",
          headerName: "Actions",
          type: "actions",
          getActions: ({ id }: { id: GridRowId }) => [
            <GridActionsCellItem
              label="Save"
              onClick={() => handleSave(table_name, Number(id))}
              // showInMenu
              icon={<MdSave />}
            />,
            <GridActionsCellItem
              label="Delete"
              onClick={() => handleDeleteRow(table_name, Number(id))}
              // showInMenu={false}
              icon={<MdDelete />}
            />,
          ],
        });

        return (
          <div key={table_name} style={{ marginTop: 50 }}>
            <h2 className="h2">{display_name}</h2>
            <div style={{ width: "100%", backgroundColor: "white" }}>
              <DataGrid
                rows={rows || []}
                columns={columns}
                onProcessRowUpdate={(newRow) => {
                  const { id, ...fields } = newRow;
                  handleFieldChange(table_name, id, fields);
                  return newRow;
                }}
              />
              <button
                style={{ marginTop: 10 }}
                onClick={() => handleAddRow(table_name)}
              >
                Add New Row
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default OrgDataTables;
