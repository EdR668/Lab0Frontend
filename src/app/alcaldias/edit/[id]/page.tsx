"use client";

import { Autocomplete, Box, Switch, TextField, FormControlLabel } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function AlcaldiaEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const alcaldiaData = queryResult?.data?.data;

  const { autocompleteProps: municipiosAutocompleteProps } = useAutocomplete({
    resource: "municipios",
    defaultValue: alcaldiaData?.municipio_id,
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
        />

        {/* Email */}
        <TextField
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Ingrese un email válido",
            },
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label="Email"
          name="email"
        />

        {/* Presupuesto Anual */}
        <TextField
          {...register("presupuesto_anual", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.presupuesto_anual}
          helperText={(errors as any)?.presupuesto_anual?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Presupuesto Anual"
          name="presupuesto_anual"
        />

        {/* Activo */}
        <FormControlLabel
          control={
            <Controller
              name="activo"
              control={control}
              defaultValue={alcaldiaData?.activo || false}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          }
          label="Activo"
          sx={{ marginTop: "16px" }}
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
