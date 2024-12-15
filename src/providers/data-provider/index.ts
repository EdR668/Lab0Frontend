"use client";

import { DataProvider } from "@refinedev/core";
import simpleRestDataProvider from "@refinedev/simple-rest";

const API_URL = "https://lab0-761c217307e5.herokuapp.com";

// Proveedor de datos personalizado
export const customDataProvider: DataProvider = {
  ...simpleRestDataProvider(API_URL),
  update: async ({ resource, id, variables, meta }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const options: RequestInit = {
      method: "PUT", // Cambia de PATCH a PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error updating ${resource}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      data,
    };
  },
};

export default customDataProvider;