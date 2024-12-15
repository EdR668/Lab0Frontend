"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export default function MunicipioShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        {/* ID */}
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        {/* Nombre */}
        <Typography variant="body1" fontWeight="bold">
          {"Nombre"}
        </Typography>
        <TextField value={record?.nombre} />

        {/* Área */}
        <Typography variant="body1" fontWeight="bold">
          {"Área (km²)"}
        </Typography>
        <TextField value={record?.area} />

        {/* Presupuesto */}
        <Typography variant="body1" fontWeight="bold">
          {"Presupuesto"}
        </Typography>
        <TextField
          value={new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(record?.presupuesto)}
        />

        {/* Fecha de Creación */}
        <Typography variant="body1" fontWeight="bold">
          {"Fecha de Creación"}
        </Typography>
        <DateField value={record?.created_at} />

        {/* Fecha de Actualización */}
        <Typography variant="body1" fontWeight="bold">
          {"Fecha de Actualización"}
        </Typography>
        <DateField value={record?.updated_at} />
      </Stack>
    </Show>
  );
}
