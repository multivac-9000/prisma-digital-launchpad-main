# Logos de Clientes

Aquí van los logos de los clientes que se muestran en el carrusel de la sección **"Negocios que ya escalan con nosotros"**.

## 📋 Convención de nombres

Usa nombres en minúsculas, con guiones como separadores:

- `marco-amarillo.png`
- `atodo-vajilla.png`
- `emporio-1810.png`
- `la-regaler.png`
- `artemania.png`
- `head.png`

## 📐 Especificaciones recomendadas

- **Formato**: PNG, SVG o JPG
- **Tamaño**: máximo 200×100 px (ancho × alto)
- **Fondo**: transparente preferentemente
- **Peso**: < 50 KB por archivo

## 🔗 Actualizar componente

Para agregar o cambiar logos, edita `src/components/Clients.tsx`:

```tsx
const clients = [
  {
    name: "Marco Amarillo",
    logo: "/clients/marco-amarillo.png", // ← Aquí va la ruta
    result: "+89% de visitas orgánicas en 45 días",
  },
  // ... más clientes
];
```

Los logos se sirven automáticamente desde `https://tudominio.com/clients/nombre-archivo.png`
