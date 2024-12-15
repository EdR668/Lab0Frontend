"use client";

import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function ViviendaCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: municipiosAutocompleteProps } = useAutocomplete({
    resource: "municipios",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
      </Box>
    </Create>
  );
}
