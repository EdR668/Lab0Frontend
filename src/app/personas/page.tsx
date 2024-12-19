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

export default function PersonaList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: viviendasData, isLoading: viviendasIsLoading } = useMany({
    resource: "viviendas",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.vivienda?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });


  const { data: MunicipiosData, isLoading: MunicipiosIsLoading } = useMany({
    resource: "municipios",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.munucipio?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });


  const { data: padresData, isLoading: padresIsLoading } = useMany({
    resource: "personas", // Asumiendo que el recurso para personas es "personas".
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.padre_id)
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
        minWidth: 150,
      },
      {
        field: "edad",
        flex: 1,
        headerName: "Edad",
        type: "number",
        minWidth: 50,
      },
      {
        field: "sexo",
        flex: 1,
        headerName: "Sexo",
        minWidth: 100,
      },
      {
        field: "telefono",
        flex: 1,
        headerName: "Telefono",
        type: "number",
        minWidth: 200,
      },
      {
        field: "vivienda_id",
        flex: 1,
        headerName: "Vivienda",
        minWidth: 250,
        valueGetter: ({ row }) => {
          const value = row?.vivienda_id;
          return value;
        },
        renderCell: function render({ value }) {
          if (viviendasIsLoading || MunicipiosIsLoading) {
            return <>Loading...</>;
          }
      
          const vivienda = viviendasData?.data?.find((item) => item.id === value);

          const municipio = vivienda
            ? MunicipiosData?.data?.find((item) => item.id === vivienda.municipio_id)
            : null;
        
          return vivienda
            ? `${vivienda.direccion}, ${municipio?.nombre || "Sin municipio"}`
            : "No registrado";
        },
      },
      {
        field: "padre_id",
        flex: 1,
        headerName: "Dependencia económica",
        minWidth: 250,
        valueGetter: ({ row }) => row?.padre_id,
        renderCell: function render({ value, row }) {
          if (padresIsLoading) {
            return <>Loading...</>;
          }

          if (value === row.id) {
            return "Independiente";
          }

          const padre = padresData?.data?.find((item) => item.id === value);

          return padre ? padre.nombre : "No registrado";
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
