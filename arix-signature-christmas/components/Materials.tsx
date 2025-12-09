import React from 'react';
import { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

// Luxurious Emerald Green for Tree
export const TreeMaterial = new MeshPhysicalMaterial({
  color: "#024a2f",
  roughness: 0.35,
  metalness: 0.1,
  clearcoat: 0.2, // Waxy look
  clearcoatRoughness: 0.4,
  flatShading: true, // Stylized low-poly luxury
});

// High Polish Gold
export const GoldMaterial = new MeshStandardMaterial({
  color: "#FFD700",
  roughness: 0.1,
  metalness: 1.0,
  emissive: "#C5A059",
  emissiveIntensity: 0.2,
});

// Deep Red Velvet/Matte
export const RedOrnamentMaterial = new MeshPhysicalMaterial({
  color: "#8a0303",
  roughness: 0.4,
  metalness: 0.3,
  clearcoat: 0.1,
  clearcoatRoughness: 0.4,
  sheen: 1.0,
  sheenColor: "#ff0000"
});

// Silk Ribbon Material (Brighter Red, smoother)
export const RibbonMaterial = new MeshStandardMaterial({
  color: "#b00b1e",
  roughness: 0.3,
  metalness: 0.4,
  emissive: "#500000",
  emissiveIntensity: 0.2,
});

// Gingerbread Cookie Material
export const CookieMaterial = new MeshStandardMaterial({
  color: "#c48856",
  roughness: 0.9,
  metalness: 0.0,
});

// White Gloss (for Candy Canes/Details)
export const WhiteMaterial = new MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.2,
  metalness: 0.1,
});

// Snow Material (Glittery White)
export const SnowMaterial = new MeshStandardMaterial({
  color: "#eeffff",
  roughness: 0.4,
  emissive: "#aaccff",
  emissiveIntensity: 0.2,
});

// Glowing Light Material
export const LightMaterial = new MeshStandardMaterial({
  color: "#fffce8",
  emissive: "#fffce8",
  emissiveIntensity: 2.0,
  toneMapped: false, // Key for bloom
});