"use client";

import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function MunicipioCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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

        {/* Área */}
        <TextField
          {...register("area", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.area}
          helperText={(errors as any)?.area?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Área (km²)"
          name="area"
        />

        {/* Presupuesto */}
        <TextField
          {...register("presupuesto", {
            required: "Este campo es obligatorio",
          })}
          error={!!(errors as any)?.presupuesto}
          helperText={(errors as any)?.presupuesto?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Presupuesto"
          name="presupuesto"
        />
      </Box>
    </Create>
  );
}
