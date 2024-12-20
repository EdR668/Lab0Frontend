"use client";

import { Autocomplete, Box, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function ViviendaEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const viviendaData = queryResult?.data?.data;

  const { autocompleteProps: municipiosAutocompleteProps } = useAutocomplete({
    resource: "municipios",
    defaultValue: viviendaData?.municipio_id,
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/* Dirección */}
        <TextField
          {...register("direccion", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.direccion}
          helperText={(errors as any)?.direccion?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Dirección"
          name="direccion"
          required
        />

        {/* Capacidad */}
        <TextField
          {...register("capacidad", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.capacidad}
          helperText={(errors as any)?.capacidad?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Capacidad"
          name="capacidad"
          required
        />

        {/* Niveles */}
        <TextField
          {...register("niveles", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.niveles}
          helperText={(errors as any)?.niveles?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Niveles"
          name="niveles"
          required
        />

        {/* Municipio */}
        <Controller
          control={control}
          name="municipio_id"
          rules={{ required: "Este campo es obligatorio" }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...municipiosAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                const municipio = municipiosAutocompleteProps?.options?.find((p) => {
                  const itemId =
                    typeof item === "object"
                      ? item?.id?.toString()
                      : item?.toString();
                  const pId = p?.id?.toString();
                  return itemId === pId;
                });
                return municipio ? `${municipio.id} - ${municipio.nombre}` : "";
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Municipio"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.municipio_id}
                  helperText={(errors as any)?.municipio_id?.message}
                  required
                />
              )}
            />
          )}
        />

        {/* Fecha de Creación */}
        <TextField
          {...register("created_at")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Fecha de Creación"
          name="created_at"
          disabled
        />

        {/* Fecha de Actualización */}
        <TextField
          {...register("updated_at")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Fecha de Actualización"
          name="updated_at"
          disabled
        />
      </Box>
    </Edit>
  );
}
