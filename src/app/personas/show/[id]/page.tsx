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

  const { data: municipioData, isLoading: municipioIsLoading } = useOne({
    resource: "municipios",
    id: viviendaData?.data?.municipio_id || "",
    queryOptions: {
      enabled: !!viviendaData,
    },
  });

  const { data: padreData, isLoading: padreIsLoading } = useOne({
    resource: "personas", // Asumiendo que el recurso es "personas".
    id: record?.padre_id || "",
    queryOptions: {
      enabled: !!record?.padre_id,
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

        {/* Sexo */}
        <Typography variant="body1" fontWeight="bold">
          {"Sexo"}
        </Typography>
        <TextField value={record?.sexo} />

        {/* Teléfono */}
        <Typography variant="body1" fontWeight="bold">
          {"Teléfono"}
        </Typography>
        <TextField value={record?.telefono} />

        {/* Vivienda */}
        <Typography variant="body1" fontWeight="bold">
          {"Vivienda"}
        </Typography>
        {viviendaIsLoading || municipioIsLoading ? (
          <>Loading...</>
        ) : (
          <>
            {viviendaData?.data
              ? `${viviendaData?.data?.direccion}, ${
                  municipioData?.data?.nombre || "Sin municipio"
                }`
              : "No registrado"}
          </>
        )}

        {/* Padre */}
        <Typography variant="body1" fontWeight="bold">
          {"Dependencia Económica"}
        </Typography>
        {padreIsLoading ? (
          <>Loading...</>
        ) : (
          <>
            {record?.padre_id === record?.id
              ? "Independiente"
              : padreData?.data?.nombre || "No registrado"}
          </>
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
