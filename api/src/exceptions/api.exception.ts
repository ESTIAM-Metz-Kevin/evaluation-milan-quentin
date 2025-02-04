export interface GenericException {
    error: any
    status: number
  }

/**
 * Classe générique qui sert à créer des erreurs HTTP (ici 400 et 404)
 *
 * On précise que notre classe doit correspondre à l'interface `ApiException`
 *
 * Les mots clés `readonly` servent de raccourci pour `this.propriété = valeur`,
 * ils nous empêchent également de mofifier ces valeurs par la suite.
 *
 * Ici `this.error = error` et `this.status = status`
 */
export abstract class Exception implements GenericException {
  constructor(readonly error: any, readonly status: number) {}
}