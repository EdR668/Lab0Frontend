"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  useDataGrid,
  ShowButton,
} from "@refinedev/mui";
import React from "react";

export default function AlcaldiaList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: municipiosData, isLoading: municipiosIsLoading } = useMany({
    resource: "municipios",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.municipio_id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "direccion",
        flex: 1,
        headerName: "Dirección",
        minWidth: 200,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 200,
      },
      {
        field: "presupuesto_anual",
        flex: 1,
        headerName: "Presupuesto Anual",
        type: "number",
        minWidth: 200,
        valueFormatter: ({ value }) =>
          new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(value),
      },
      {
        field: "activo",
        flex: 1,
        headerName: "Activo",
        minWidth: 100,
        renderCell: ({ value }) => (value ? "Sí" : "No"),
      },
      {
        field: "municipio_id",
        flex: 1,
        headerName: "Municipio",
        minWidth: 200,
        valueGetter: ({ row }) => {
          const value = row?.municipio_id;
          return value;
        },
        renderCell: function render({ value }) {
          if (municipiosIsLoading) {
            return <>Loading...</>;
          }

          const municipio = municipiosData?.data?.find((item) => item.id === value);
          return municipio ? municipio.nombre : "No registrado";
        },
      },
      {
        field: "created_at",
        flex: 1,
        headerName: "Fecha de Creación",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updated_at",
        flex: 1,
        headerName: "Fecha de Actualización",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Acciones",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [municipiosData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
