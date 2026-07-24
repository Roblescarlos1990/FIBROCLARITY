# XYLENS Oak Texture Upgrade

The realistic oak material upgrade is integrated into the existing
`app/OakScene.tsx` component.

## Production asset location

```text
public/textures/oak/
  bark_spring_albedo.jpg
  bark_summer_albedo.jpg
  bark_autumn_albedo.jpg
  bark_winter_albedo.jpg
  leaf_spring_albedo.jpg
  leaf_summer_albedo.jpg
  leaf_autumn_albedo.jpg
  leaf_winter_albedo.jpg
  ground_litter_albedo.jpg
```

There are nine textures: four bark maps, four leaf maps, and one ground-litter
map.

## Integration notes

- `OakScene` remains at `app/OakScene.tsx`; no wrapper component is required.
- Existing branch, root, oak-leaf geometry, weather systems, shadows, and
  pointer interaction are preserved.
- Bark maps drive both color and micro-surface relief.
- Leaf photographs provide subtle bump detail on the existing lobed oak-leaf
  geometry. Seasonal color comes from the brighter procedural palette, avoiding
  both visible rectangular cards and dark color multiplication.
- The canopy uses 1,100 GPU-instanced leaves arranged in organic elliptical
  clusters around the modeled twig structure.
- Each leaf has subtle 3D cupping, edge ripple, tip curl, size and width
  variation, sky-facing bias, individual color variation, and independent wind
  response.
- Leaves cast soft canopy shadows without receiving dense self-shadowing. Their
  smaller scale preserves individual lobes and keeps the bark visible while
  producing a substantially fuller silhouette.
- Seasonal maps are loaded once and switched with coordinated material,
  lighting, weather, fog, leaf-density, roughness, and clearcoat transitions.
- Spring receives a subtle wet clearcoat, autumn remains dry and warm, and
  winter receives a restrained icy response.
- The ground-litter texture is repeated beneath the tree and tinted by the
  active season.
- All geometries, materials, and texture resources are disposed when the scene
  unmounts.

## Accepted values

The component accepts either a season:

```tsx
<OakScene season="spring" />
<OakScene season="summer" />
<OakScene season="autumn" />
<OakScene season="winter" />
```

or an editorial lens:

```tsx
<OakScene season="Journal" />  // Summer
<OakScene season="Wellness" /> // Spring
<OakScene season="Medicine" /> // Autumn
<OakScene season="Research" /> // Winter
```

An optional `className` can be supplied. The required `oak-scene` class is
preserved automatically.
