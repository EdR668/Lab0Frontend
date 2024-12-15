"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export default function EmpleadoShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: personaData, isLoading: personaIsLoading } = useOne({
    resource: "personas",
    id: record?.persona_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: rolData, isLoading: rolIsLoading } = useOne({
    resource: "roles",
    id: record?.rol_id || "",
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
        {personaIsLoading ? (
          <>Loading...</>
        ) : (
          <TextField value={personaData?.data?.nombre || "No registrado"} />
        )}

        {/* Teléfono */}
        <Typography variant="body1" fontWeight="bold">
          {"Teléfono"}
        </Typography>
        {personaIsLoading ? (
          <>Loading...</>
        ) : (
          <TextField value={personaData?.data?.telefono || "No registrado"} />
        )}

        {/* Sexo */}
        <Typography variant="body1" fontWeight="bold">
          {"Sexo"}
        </Typography>
        {personaIsLoading ? (
          <>Loading...</>
        ) : (
          <TextField value={personaData?.data?.sexo || "No registrado"} />
        )}

        {/* Rol */}
        <Typography variant="body1" fontWeight="bold">
          {"Rol"}
        </Typography>
        {rolIsLoading ? (
          <>Loading...</>
        ) : (
          <TextField value={rolData?.data?.nombre || "No registrado"} />
        )}

        {/* Salario */}
        <Typography variant="body1" fontWeight="bold">
          {"Salario"}
        </Typography>
        <TextField value={record?.salario ? `$${record.salario.toLocaleString()}` : "No registrado"} />

        {/* Tipo de Contrato */}
        <Typography variant="body1" fontWeight="bold">
          {"Tipo de Contrato"}
        </Typography>
        <TextField value={record?.tipo_contrato || "No registrado"} />

        {/* Años de Experiencia */}
        <Typography variant="body1" fontWeight="bold">
          {"Años de Experiencia"}
        </Typography>
        <TextField value={record?.años_experiencia || "No registrado"} />

        {/* Fecha de Ingreso */}
        <Typography variant="body1" fontWeight="bold">
          {"Fecha de Ingreso"}
        </Typography>
        <DateField value={record?.fecha_ingreso} />

        {/* Activo */}
        <Typography variant="body1" fontWeight="bold">
          {"Activo"}
        </Typography>
        <TextField value={record?.activo ? "Sí" : "No"} />

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
