"use client";

import { Autocomplete, Box, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EmpleadosCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  // Autocomplete para Alcaldías
  const { autocompleteProps: alcaldiasAutocompleteProps } = useAutocomplete({
    resource: "alcaldias",
  });

  // Autocomplete para Personas
  const { autocompleteProps: personasAutocompleteProps } = useAutocomplete({
    resource: "personas",
  });

  // Autocomplete para Roles
  const { autocompleteProps: rolesAutocompleteProps } = useAutocomplete({
    resource: "roles",
  });

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
        {/* Salario */}
        <TextField
          {...register("salario", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.salario}
          helperText={(errors as any)?.salario?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Salario"
          name="salario"
        />

        {/* Tipo de Contrato */}
        <Controller
          control={control}
          name="tipo_contrato"
          rules={{ required: "Este campo es obligatorio" }}
  
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Tipo de Contrato"
              margin="normal"
              fullWidth
              variant="outlined"
              error={!!(errors as any)?.tipo_contrato}
              helperText={(errors as any)?.tipo_contrato?.message}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="Fijo">Fijo</MenuItem>
              <MenuItem value="Indefinido">Indefinido</MenuItem>
            </TextField>
          )}
        />

        {/* Años de Experiencia */}
        <TextField
          {...register("años_experiencia", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.años_experiencia}
          helperText={(errors as any)?.años_experiencia?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Años de Experiencia"
          name="años_experiencia"
        />

        {/* Fecha de Ingreso */}
        <TextField
          {...register("fecha_ingreso", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.fecha_ingreso}
          helperText={(errors as any)?.fecha_ingreso?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="date"
          label="Fecha de Ingreso"
          name="fecha_ingreso"
        />

        {/* Alcaldía */}
        <Controller
          control={control}
          name="alcaldia_id"
          rules={{ required: "Este campo es obligatorio" }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...alcaldiasAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                const alcaldia = alcaldiasAutocompleteProps?.options?.find(
                  (p) => p.id === (typeof item === "object" ? item.id : item)
                );
                const municipio = alcaldia
                  ? municipiosAutocompleteProps?.options?.find(
                      (m) => m.id === alcaldia.municipio_id
                    )
                  : null;
                return alcaldia
                  ? `${alcaldia.id} - ${alcaldia.direccion}, ${
                      municipio?.nombre || "Sin municipio"
                    }`
                  : "";
              }}
              isOptionEqualToValue={(option, value) => option?.id === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alcaldía"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.alcaldia_id}
                  helperText={(errors as any)?.alcaldia_id?.message}
                  required
                />
              )}
            />
          )}
        />

        {/* Persona */}
        <Controller
          control={control}
          name="persona_id"
          rules={{ required: "Este campo es obligatorio" }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...personasAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                const persona = personasAutocompleteProps?.options?.find(
                  (p) => p.id === (typeof item === "object" ? item.id : item)
                );
                return persona ? `${persona.id} - ${persona.nombre}` : "";
              }}
              isOptionEqualToValue={(option, value) => option?.id === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Persona"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.persona_id}
                  helperText={(errors as any)?.persona_id?.message}
                  required
                />
              )}
            />
          )}
        />
        {/* Activo */}
        <FormControlLabel
          control={
            <Controller
              name="activo"
              control={control}
              defaultValue={false}
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
        {/* Rol */}
        <Controller
          control={control}
          name="rol_id"
          rules={{ required: "Este campo es obligatorio" }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...rolesAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                const rol = rolesAutocompleteProps?.options?.find(
                  (p) => p.id === (typeof item === "object" ? item.id : item)
                );
                return rol ? `${rol.id} - ${rol.nombre}` : "";
              }}
              isOptionEqualToValue={(option, value) => option?.id === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Rol"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.rol_id}
                  helperText={(errors as any)?.rol_id?.message}
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
