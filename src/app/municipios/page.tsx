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

export default function MunicipioList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: viviendasData, isLoading: viviendasIsLoading } = useMany({
    resource: "viviendas",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.id)
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
        field: "nombre",
        flex: 1,
        headerName: "Nombre",
        minWidth: 200,
      },
      {
        field: "area",
        flex: 1,
        headerName: "Área (km²)",
        type: "number",
        minWidth: 150,
      },
      {
        field: "presupuesto",
        flex: 1,
        headerName: "Presupuesto",
        type: "number",
        minWidth: 200,
        valueFormatter: ({ value }) =>
          new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(value),
      },
      {
        field: "viviendas",
        flex: 1,
        headerName: "Cantidad de Viviendas",
        minWidth: 300,
        renderCell: function render({ row }) {
          if (viviendasIsLoading) {
            return <>Loading...</>;
          }

          const viviendas = viviendasData?.data?.filter(
            (vivienda) => vivienda.municipio_id === row.id
          );

          return viviendas?.length
            ? viviendas?.length
            : "Sin viviendas registradas";
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
    [viviendasData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
