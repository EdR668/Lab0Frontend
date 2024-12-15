"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/mui";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function EmpleadosList() {
  const [municipioId, setMunicipioId] = useState<number | null>(null); // Estado para el municipio seleccionado
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar municipios usando useMany
  const { data: municipiosData, isLoading: municipiosIsLoading } = useMany({
    resource: "municipios",
    ids: [],
  });

  // Función para cargar empleados dinámicamente
  const fetchEmpleados = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://lab0-761c217307e5.herokuapp.com/alcaldias/${id}/empleados`
      );
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar empleados cuando se selecciona un municipio
  useEffect(() => {
    if (municipioId) {
      fetchEmpleados(municipioId);
    } else {
      setEmpleados([]); // Reinicia la lista de empleados si no hay un municipio seleccionado
    }
  }, [municipioId]);

  // Columnas para la tabla de empleados
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "persona.nombre",
        headerName: "Nombre",
        flex: 1,
        minWidth: 150,
        valueGetter: ({ row }) => row.persona?.nombre || "No disponible",
      },
      {
        field: "persona.telefono",
        headerName: "Teléfono",
        flex: 1,
        minWidth: 150,
        valueGetter: ({ row }) => row.persona?.telefono || "No disponible",
      },
      {
        field: "rol.nombre",
        headerName: "Rol",
        flex: 1,
        minWidth: 150,
        valueGetter: ({ row }) => row.rol?.nombre || "No disponible",
      },
      {
        field: "salario",
        headerName: "Salario",
        flex: 1,
        minWidth: 150,
        renderCell: ({ value }) => `$${value?.toLocaleString() || 0}`,
      },
      {
        field: "tipo_contrato",
        headerName: "Tipo de Contrato",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "años_experiencia",
        headerName: "Años de Experiencia",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "fecha_ingreso",
        headerName: "Fecha de Ingreso",
        flex: 1,
        minWidth: 200,
        renderCell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        field: "actions",
        headerName: "Acciones",
        flex: 1,
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
        minWidth: 150,
      },
    ],
    []
  );

  return (
    <List>
      {/* Selector de Municipios */}
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          Selecciona un Municipio
        </Typography>
        <Select
          fullWidth
          value={municipioId || ""}
          onChange={(event) => setMunicipioId(Number(event.target.value))}
          displayEmpty
          disabled={municipiosIsLoading}
        >
          <MenuItem value="">
            {municipiosIsLoading ? "Cargando municipios..." : "Selecciona un municipio"}
          </MenuItem>
          {municipiosData?.data?.map((municipio) => (
            <MenuItem key={municipio.id} value={municipio.id}>
              {municipio.nombre}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Tabla de Empleados */}
      <DataGrid
        rows={empleados}
        columns={columns}
        loading={isLoading}
        autoHeight
        getRowId={(row) => row.id} // Asegura que el ID sea único
      />
    </List>
  );
}
