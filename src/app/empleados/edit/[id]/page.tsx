"use client";

import {
  Autocomplete,
  Box,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EmpleadosEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const empleadoData = queryResult?.data?.data;
  console.log(empleadoData);
  // Autocomplete para Alcaldías
  const { autocompleteProps: alcaldiasAutocompleteProps } = useAutocomplete({
    resource: "alcaldias",
    defaultValue: empleadoData?.alcaldia_id,
  });

  // Autocomplete para Personas
  const { autocompleteProps: personasAutocompleteProps } = useAutocomplete({
    resource: "personas",
    defaultValue: empleadoData?.persona_id,
  });

  const { autocompleteProps: municipiosAutocompleteProps } = useAutocomplete({
    resource: "municipios",
  });

  // Autocomplete para Roles
  const { autocompleteProps: rolesAutocompleteProps } = useAutocomplete({
    resource: "roles",
    defaultValue: empleadoData?.rol_id,
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
          defaultValue={empleadoData?.tipo_contrato || ""}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              select
              label="Tipo Contrato"
              variant="outlined"
              error={!!(errors as any)?.tipo_contrato}
              helperText={(errors as any)?.tipo_contrato?.message}
            >
              <MenuItem value="Fijo">Fijo</MenuItem>
              <MenuItem value="Temporal">Temporal</MenuItem>
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
                  (r) => r.id === (typeof item === "object" ? item.id : item)
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

        {/* Activo */}
        <FormControlLabel
          control={
            <Controller
              name="activo"
              control={control}
              defaultValue={empleadoData?.activo || false}
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

        <TextField
          {...register("fecha_ingreso")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Fecha ingreso"
          name="fecha_ingreso"
          disabled
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
