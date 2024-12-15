"use client";

import { Autocomplete, Box, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function PersonaEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const personaData = queryResult?.data?.data;

  const { autocompleteProps: viviendaAutocompleteProps } = useAutocomplete({
    resource: "viviendas",
    defaultValue: personaData?.vivienda_id,
  });

  const { autocompleteProps: municipiosAutocompleteProps } = useAutocomplete({
    resource: "municipios",
  });


  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/* Nombre */}
        <TextField
          {...register("nombre", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.nombre}
          helperText={(errors as any)?.nombre?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Nombre"
          name="nombre"
        />

        {/* Edad */}
        <TextField
          {...register("edad", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.edad}
          helperText={(errors as any)?.edad?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Edad"
          name="edad"
        />

        {/* Teléfono */}
        <TextField
          {...register("telefono", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.telefono}
          helperText={(errors as any)?.telefono?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Teléfono"
          name="telefono"
        />

        {/* Vivienda */}
        <Controller
          control={control}
          name="vivienda_id"
          rules={{ required: "Este campo es obligatorio" }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...viviendaAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                const vivienda = viviendaAutocompleteProps?.options?.find((p) => {
                  const itemId =
                    typeof item === "object"
                      ? item?.id?.toString()
                      : item?.toString();
                  const pId = p?.id?.toString();
                  return itemId === pId;
                });
                const municipio = municipiosAutocompleteProps?.options?.find(
                  (m) => m.id === vivienda?.municipio_id
                );
                return vivienda
                  ? `${vivienda.id} - ${vivienda.direccion}, ${municipio?.nombre || "Sin municipio"}`
                  : "";
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
                  label="Vivienda"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.vivienda_id}
                  helperText={(errors as any)?.vivienda_id?.message}
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
