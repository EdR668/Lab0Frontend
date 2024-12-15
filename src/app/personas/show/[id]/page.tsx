"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export default function PersonaShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: viviendaData, isLoading: viviendaIsLoading } = useOne({
    resource: "viviendas",
    id: record?.vivienda_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  console.log(viviendaData)
  const { data: municipioData, isLoading: municipioIsLoading } = useOne({
    resource: "municipios",
    id: viviendaData?.data?.municipio_id || "",
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

        {/* Nombre */}
        <Typography variant="body1" fontWeight="bold">
          {"Nombre"}
        </Typography>
        <TextField value={record?.nombre} />

        {/* Edad */}
        <Typography variant="body1" fontWeight="bold">
          {"Edad"}
        </Typography>
        <TextField value={record?.edad} />

        {/* Teléfono */}
        <Typography variant="body1" fontWeight="bold">
          {"Teléfono"}
        </Typography>
        <TextField value={record?.telefono} />

        {/* Vivienda */}
        <Typography variant="body1" fontWeight="bold">
          {"Vivienda"}
        </Typography>
        {viviendaIsLoading ? (
  <>Loading...</>
) : (
  <>{`${viviendaData?.data?.direccion}, ${municipioData?.data?.nombre}` || "No registrado"}</>
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
