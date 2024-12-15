"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export default function AlcaldiaShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: municipioData, isLoading: municipioIsLoading } = useOne({
    resource: "municipios",
    id: record?.municipio_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        {/* ID */}
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        {/* Dirección */}
        <Typography variant="body1" fontWeight="bold">
          {"Dirección"}
        </Typography>
        <TextField value={record?.direccion} />

        {/* Email */}
        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <TextField value={record?.email} />

        {/* Presupuesto Anual */}
        <Typography variant="body1" fontWeight="bold">
          {"Presupuesto Anual"}
        </Typography>
        <TextField value={`$${record?.presupuesto_anual?.toLocaleString()}`} />

        {/* Activo */}
        <Typography variant="body1" fontWeight="bold">
          {"Activo"}
        </Typography>
        <TextField value={record?.activo ? "Sí" : "No"} />

        {/* Municipio */}
        <Typography variant="body1" fontWeight="bold">
          {"Municipio"}
        </Typography>
        {municipioIsLoading ? (
          <>Loading...</>
        ) : (
          <>{municipioData?.data?.nombre || "No registrado"}</>
        )}

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
