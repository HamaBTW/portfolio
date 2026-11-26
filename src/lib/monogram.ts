/** "Tunisie Telecom" → "TT", "Tache-Lik" → "TL", "Adactim" → "Ad" */
export const monogram = (name: string) => {
  const parts = name.split(/[\s-]+/).filter(Boolean)
  return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2)
}
